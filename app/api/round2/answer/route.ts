
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const validOptions = ["a", "b", "c", "d"];

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
    const optionId = body.optionId;

    if (!Number.isInteger(zoneId) || zoneId < 1 || zoneId > 5) {
      return NextResponse.json(
        { error: "Invalid question ID" },
        { status: 400 }
      );
    }

    if (
      typeof optionId !== "string" ||
      !validOptions.includes(optionId)
    ) {
      return NextResponse.json(
        { error: "Invalid option ID" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.rpc(
      "submit_round2_answer",
      {
        p_zone_id: zoneId,
        p_option_id: optionId,
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
