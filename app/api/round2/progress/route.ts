
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Получаем ответы второго раунда
    const { data: answers, error: answersError } = await supabase
      .from("team_round_answers")
      .select("zone_id, selected_option, is_correct")
      .eq("team_id", user.id)
      .eq("round_number", 2)
      .order("zone_id");

    if (answersError) {
      console.error("Round two answers error:", answersError);

      return NextResponse.json(
        { error: "Failed to load answers" },
        { status: 500 }
      );
    }

    // Получаем результат второго раунда
    const { data: result, error: resultError } = await supabase
      .from("team_round_results")
      .select("correct_answers, total_questions")
      .eq("team_id", user.id)
      .eq("round_number", 2)
      .maybeSingle();

    if (resultError) {
      console.error("Round two result error:", resultError);

      return NextResponse.json(
        { error: "Failed to load result" },
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
    console.error("Round two progress API error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
