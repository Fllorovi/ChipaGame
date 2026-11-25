
"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function DisqualificationGuard() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/disqualified") return;

    const supabase = createClient();

    let active = true;
    let checking = false;
    let teamId: string | null = null;

    async function checkDisqualification() {
      if (!active || checking) return;

      checking = true;

      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user || !active) return;

        const { data: team, error: teamError } = await supabase
          .from("teams")
          .select("id, is_disqualified")
          .eq("id", user.id)
          .maybeSingle();

        if (!active || teamError || !team) return;

        teamId = team.id;

        if (team.is_disqualified) {
          router.replace("/disqualified");
          await supabase.auth.signOut();
        }
      } catch (error) {
        console.error("Disqualification check error:", error);
      } finally {
        checking = false;
      }
    }

    void checkDisqualification();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void checkDisqualification();
    });

    const channel = supabase
      .channel("disqualification-check")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "teams",
        },
        (payload) => {
          if (teamId && payload.new.id === teamId) {
            void checkDisqualification();
          }
        }
      )
      .subscribe();

    return () => {
      active = false;
      subscription.unsubscribe();
      void supabase.removeChannel(channel);
    };
  }, [pathname, router]);

  return null;
}
