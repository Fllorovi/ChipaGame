
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

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

  const { data: teams, error: teamsError } = await supabase
    .from("teams")
    .select("id, name");

  if (teamsError) {
    return NextResponse.json(
      { error: "Не удалось получить список команд" },
      { status: 500 }
    );
  }

  const { data: results, error: resultsError } = await supabase
    .from("team_round_results")
    .select("team_id, correct_answers, total_questions")
    .eq("round_number", 1);

  if (resultsError) {
    return NextResponse.json(
      { error: "Не удалось получить результаты" },
      { status: 500 }
    );
  }

  const rating = teams
    .map((team) => {
      const result = results.find(
        (item) => item.team_id === team.id
      );

      return {
        teamId: team.id,
        teamName: team.name,
        correctAnswers: result?.correct_answers ?? 0,
        totalQuestions: result?.total_questions ?? 5,
      };
    })
    .sort(
      (a, b) => b.correctAnswers - a.correctAnswers
    );

  let currentPlace = 0;
  let previousScore: number | null = null;

  const rankedTeams = rating.map((team, index) => {
    if (team.correctAnswers !== previousScore) {
      currentPlace = index + 1;
      previousScore = team.correctAnswers;
    }

    return {
      ...team,
      place: currentPlace,
    };
  });

  return NextResponse.json({ rating: rankedTeams });
}
