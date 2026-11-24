
import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // Проверяем авторизацию
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Необходимо авторизоваться" },
        { status: 401 }
      );
    }

    // Загружаем ответы команды
    const { data: answers, error: answersError } = await supabase
      .from("team_round_answers")
      .select("zone_id, selected_option, is_correct")
      .order("zone_id");

    if (answersError) {
      console.error("Round 1 answers error:", answersError);

      return NextResponse.json(
        { error: "Не удалось загрузить ответы" },
        { status: 500 }
      );
    }

    // Загружаем результат первого раунда
    const { data: result, error: resultError } = await supabase
      .from("team_round_results")
      .select("correct_answers, total_questions")
      .eq("round_number", 1)
      .maybeSingle();

    if (resultError) {
      console.error("Round 1 result error:", resultError);

      return NextResponse.json(
        { error: "Не удалось загрузить результаты" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      answers: answers ?? [],
      result: result ?? {
        correct_answers: 0,
        total_questions: 5,
      },
    });
  } catch (error) {
    console.error("Round 1 progress error:", error);

    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
