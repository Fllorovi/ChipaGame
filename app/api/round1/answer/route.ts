
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

    // Проверяем номер вопроса
    const MAX_ZONES = 5;

    if (!Number.isInteger(zoneId) || zoneId < 1 || zoneId > MAX_ZONES) {
      return NextResponse.json(
        {
          error: `Неверный zoneId. Ожидается число от 1 до ${MAX_ZONES}.`,
        },
        { status: 400 }
      );
    }

    // Проверяем вариант ответа
    if (
      typeof optionId !== "string" ||
      !["a", "b", "c", "d"].includes(optionId)
    ) {
      return NextResponse.json(
        { error: "Недопустимый вариант ответа" },
        { status: 400 }
      );
    }

    // Проверяем ответ и сохраняем его через Supabase RPC
    const { data, error } = await supabase.rpc(
      "submit_round1_answer",
      {
        p_zone_id: zoneId,
        p_option_id: optionId,
      }
    );

    // Не скрываем ошибки базы данных
    if (error) {
      console.error("Round 1 answer DB error:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        zoneId,
        optionId,
        userId: user.id,
      });

      return NextResponse.json(
        { error: "Не удалось сохранить ответ. Попробуйте ещё раз." },
        { status: 500 }
      );
    }

    // Проверяем результат RPC
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.error("Round 1 answer: RPC returned empty result", {
        zoneId,
        optionId,
        userId: user.id,
      });

      return NextResponse.json(
        { error: "Не удалось получить результат проверки ответа." },
        { status: 500 }
      );
    }

    // Возвращаем результат проверки
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Round 1 API error:", error);

    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
