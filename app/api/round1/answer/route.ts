
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

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

    const body = await request.json();

    const zoneId = Number(body.zoneId);
    const answers = body.answers;

    if (!Number.isInteger(zoneId) || zoneId < 1 || zoneId > 5) {
      return NextResponse.json(
        { error: "Неверный номер зоны" },
        { status: 400 }
      );
    }

    if (
      !answers ||
      typeof answers !== "object" ||
      Array.isArray(answers) ||
      !["a", "b", "c"].every(
        (key) =>
          typeof answers[key] === "string" &&
          answers[key].trim().length > 0
      )
    ) {
      return NextResponse.json(
        { error: "Необходимо заполнить все три ответа" },
        { status: 400 }
      );
    }

    const cleanAnswers = {
      a: answers.a.trim(),
      b: answers.b.trim(),
      c: answers.c.trim(),
    };

    const { data, error } = await supabase.rpc(
      "submit_round1_text_answer",
      {
        p_zone_id: zoneId,
        p_answers: cleanAnswers,
      }
    );

    if (error) {
  console.error("Round 1 answer DB error:", error);

  return NextResponse.json(
    {
      error: "Ошибка базы данных: " + error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    },
    { status: 500 }
  );
}

    if (!data || !Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { error: "Не удалось получить результат проверки" },
        { status: 500 }
      );
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Round 1 API error:", error);

    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
