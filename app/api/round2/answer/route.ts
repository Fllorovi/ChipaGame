
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
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const zoneId = Number(body.zoneId);
    const answers = body.answers;

    if (!Number.isInteger(zoneId) || zoneId < 1 || zoneId > 5) {
      return NextResponse.json(
        { error: "Invalid question ID" },
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
        { error: "Please provide all three answers" },
        { status: 400 }
      );
    }

    const cleanAnswers = {
      a: answers.a.trim(),
      b: answers.b.trim(),
      c: answers.c.trim(),
    };

    const { data, error } = await supabase.rpc(
      "submit_round2_answer",
      {
        p_zone_id: zoneId,
        p_answers: cleanAnswers,
      }
    );

    if (error) {
      console.error("Round two answer error:", error);

      return NextResponse.json(
        { error: "Failed to submit answer" },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "No answer result returned" },
        { status: 500 }
      );
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Round two answer API error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
