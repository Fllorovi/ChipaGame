
import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // Проверяем авторизацию пользователя
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

    // Получаем данные ответа
    const body = await request.json();

    const zoneId = Number(body.zoneId);
    const optionId = body.optionId;

    if (
      !Number.isInteger(zoneId) ||
      zoneId < 1 ||
      zoneId > 5 ||
      typeof optionId !== "string" ||
      !["a", "b", "c"].includes(optionId)
    ) {
      return NextResponse.json(
        { error: "Некорректные данные ответа" },
        { status: 400 }
      );
    }

    // Вызываем функцию проверки в базе данных
    const { data, error } = await supabase.rpc(
      "submit_round1_answer",
      {
        p_zone_id: zoneId,
        p_option_id: optionId,
      }
    );

    if (error) {
      console.error("Round 1 answer error:", error);

      return NextResponse.json(
        { error: "Не удалось сохранить ответ" },
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
