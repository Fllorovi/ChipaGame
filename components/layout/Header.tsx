
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface HeaderProps {
  actionLabel?: string;
  actionHref?: string;
}

export default function Header({
  actionLabel = "Стать участником",
  actionHref = "/register",
}: HeaderProps) {
  const [teamName, setTeamName] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    let active = true;
    let requestId = 0;

    async function loadTeam(userId: string) {
      const currentRequest = ++requestId;

      const { data, error } = await supabase
        .from("teams")
        .select("name")
        .eq("id", userId)
        .maybeSingle();

      if (!active || currentRequest !== requestId) return;

      if (error) {
        console.error("Team loading error:", error);
        setTeamName(null);
      } else if (data) {
        setTeamName(data.name);
      } else {
        console.error("Team not found for user:", userId);
        setTeamName(null);
      }

      setIsChecking(false);
    }

    async function checkSession() {
      const { data, error } = await supabase.auth.getSession();

      if (!active) return;

      if (error || !data.session) {
        setTeamName(null);
        setIsChecking(false);
        return;
      }

      await loadTeam(data.session.user.id);
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        requestId++;
        setTeamName(null);
        setIsChecking(false);
        return;
      }

      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        setIsChecking(true);

        setTimeout(() => {
          if (active) {
            void loadTeam(session.user.id);
          }
        }, 0);
      }
    });

    void checkSession();

    return () => {
      active = false;
      requestId++;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#55A4FE]/30 bg-[#030822] text-white shadow-[0_4px_20px_rgba(0,12,58,0.25)]">
      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        {/* Логотип */}
        <Link
          href="/"
          className="shrink-0 text-2xl font-black tracking-tight transition-opacity hover:opacity-75"
        >
          Chipa<span className="text-[#55A4FE]">Game</span>
        </Link>

        {/* Навигация для компьютеров */}
        <nav className="hidden items-center gap-10 md:flex">
          <Link
            href="/#about"
            className="text-sm font-semibold text-white/75 transition-colors hover:text-[#55A4FE]"
          >
            Об игре
          </Link>

          <Link
            href="/#rating"
            className="text-sm font-semibold text-white/75 transition-colors hover:text-[#55A4FE]"
          >
            Рейтинг
          </Link>
          {!isChecking && teamName && (
  <Link
    href="/lobby"
    className="text-sm font-semibold text-white/75 transition-colors hover:text-[#55A4FE]"
  >
    Лобби
  </Link>
)}
        </nav>

        {/* Информация о команде или кнопка регистрации */}
        <div className="flex items-center gap-3">
          {!isChecking && teamName ? (
            <div className="flex max-w-[220px] items-center gap-3 sm:max-w-none">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#39E875] shadow-[0_0_7px_#39E875,0_0_16px_rgba(57,232,117,0.65)]"
                aria-label="В сети"
                title="В сети"
              />

              <span className="truncate text-sm font-bold text-[#FFE15A] [text-shadow:0_0_7px_rgba(255,225,90,0.65),0_0_16px_rgba(255,225,90,0.3)] sm:text-base">
                {teamName}
              </span>
            </div>
          ) : (
            !isChecking && (
              <Link
                href={actionHref}
                className="hidden rounded-xl bg-[#0084FF] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:bg-[#006FE0] sm:inline-flex"
              >
                {actionLabel}
                <span className="ml-2">→</span>
              </Link>
            )
          )}

          {/* Мобильное меню */}
          <details className="relative md:hidden">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
              <span className="sr-only">Открыть меню</span>
            </summary>

            <div className="absolute right-0 top-[calc(100%+14px)] z-50 w-64 rounded-2xl border border-white/10 bg-[#030822] p-3 shadow-2xl shadow-black/30">
              <nav className="flex flex-col gap-1">
                <Link
                  href="/#about"
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/5 hover:text-[#55A4FE]"
                >
                  Об игре
                </Link>

                <Link
                  href="/#rating"
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/5 hover:text-[#55A4FE]"
                >
                  Рейтинг
                </Link>

                {!isChecking && !teamName && (
                  <>
                    <div className="my-2 h-px bg-white/10" />

                    <Link
                      href={actionHref}
                      className="rounded-xl bg-[#0084FF] px-4 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[#006FE0]"
                    >
                      {actionLabel}
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
