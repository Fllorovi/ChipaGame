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

    // Валидация zoneId: целое число в диапазоне существующих зон.
    const MAX_ZONES = 5;
    if (!Number.isInteger(zoneId) || zoneId < 1 || zoneId > MAX_ZONES) {
      return NextResponse.json(
        { error: `Неверный zoneId: ${zoneId}. Ожидается целое число от 1 до ${MAX_ZONES}.` },
        { status: 400 }
      );
    }

    // Валидация optionId: просто непустая строка.
    if (typeof optionId !== "string" || optionId.length === 0) {
      return NextResponse.json(
        { error: "optionId должен быть непустой строкой" },
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

    // 🔧 УСТОЙЧИВАЯ ОБРАБОТКА: если RPC упал или вернул пустоту — 
    // считаем ответ неправильным, но НЕ ломаем игру 500-й ошибкой.
    if (error) {
      console.error("Round 1 answer DB error:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        zoneId,
        optionId,
      });

      // Возвращаем "неправильный ответ" вместо 500-й ошибки
      return NextResponse.json({ is_correct: false });
    }

    // Если база вернула пустой массив или null — тоже считаем неправильным
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.warn("Round 1 answer: RPC вернул пустой результат", { zoneId, optionId });
      return NextResponse.json({ is_correct: false });
    }

    // Возвращаем результат RPC: { is_correct: boolean, ... }
    return NextResponse.json(data[0]);

  } catch (error) {
    console.error("Round 1 API error:", error);

    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}