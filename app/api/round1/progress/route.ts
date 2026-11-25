
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

    // Загружаем ответы команды за первый тур
    const { data: answers, error } = await supabase
      .from("team_round_answers")
      .select("zone_id, selected_option, is_correct")
      .eq("team_id", user.id)
      .eq("round_number", 1)
      .order("zone_id", { ascending: true });

    if (error) {
      console.error("Round 1 progress DB error:", error);

      return NextResponse.json(
        { error: "Не удалось загрузить игровой прогресс" },
        { status: 500 }
      );
    }

    return NextResponse.json({ answers: answers ?? [] });
  } catch (error) {
    console.error("Round 1 progress API error:", error);

    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
