
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type RatingResult = {
  team_id: string;
  team_name: string;
  correct_answers: number;
  total_questions: number;
};

type RatingTeam = {
  teamId: string;
  teamName: string;
  correctAnswers: number;
  totalQuestions: number;
  place: number;
};

export async function GET() {
  const supabase = await createClient();

  // Проверяем авторизацию
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { error: "Необходима авторизация" },
      { status: 401 }
    );
  }

  // Получаем публичный рейтинг через RPC
  const { data, error } = await supabase.rpc(
    "get_public_rating"
  );

  if (error) {
    console.error("Rating error:", error);

    return NextResponse.json(
      { error: "Не удалось получить рейтинг" },
      { status: 500 }
    );
  }

  const results = (data ?? []) as RatingResult[];

  // Преобразуем данные для страницы рейтинга
  const rating = results
    .map((team): Omit<RatingTeam, "place"> => ({
      teamId: team.team_id,
      teamName: team.team_name,
      correctAnswers: team.correct_answers,
      totalQuestions: team.total_questions,
    }))
    .sort(
      (a, b) => b.correctAnswers - a.correctAnswers
    );

  // Определяем места команд
  let currentPlace = 0;
  let previousScore: number | null = null;

  const rankedTeams: RatingTeam[] = rating.map(
    (team, index) => {
      if (team.correctAnswers !== previousScore) {
        currentPlace = index + 1;
        previousScore = team.correctAnswers;
      }

      return {
        ...team,
        place: currentPlace,
      };
    }
  );

  return NextResponse.json({
    rating: rankedTeams,
  });
}
