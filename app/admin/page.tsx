
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/client";

interface Team {
  id: string;
  name: string;
  created_at: string;
}

interface GameState {
  id: number;
  status: "waiting" | "starting";
  launch_at: string | null;
}

export default function AdminPage() {
  const router = useRouter();

  const [teams, setTeams] = useState<Team[]>([]);
  const [gameState, setGameState] = useState<GameState | null>(null);

  const [isChecking, setIsChecking] = useState(true);
  const [isLaunching, setIsLaunching] = useState(false);
  const [isTeamsExpanded, setIsTeamsExpanded] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    async function loadAdminPanel() {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (!active) return;

      if (sessionError || !session) {
        router.replace("/login");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (!active) return;

      if (profileError || !profile || profile.role !== "admin") {
        router.replace("/lobby");
        return;
      }

      const [teamResult, gameResult] = await Promise.all([
        supabase
          .from("teams")
          .select("id, name, created_at")
          .order("created_at", { ascending: true }),

        supabase
          .from("game_state")
          .select("id, status, launch_at")
          .eq("id", 1)
          .single(),
      ]);

      if (!active) return;

      if (teamResult.error) {
        console.error("Teams loading error:", teamResult.error);
        setError("Не удалось загрузить список команд.");
      } else {
        setTeams(teamResult.data ?? []);
      }

      if (gameResult.error) {
        console.error("Game state loading error:", gameResult.error);
        setError("Не удалось загрузить состояние игры.");
      } else {
        setGameState(gameResult.data);
      }

      setIsChecking(false);
    }

    void loadAdminPanel();

    const channel = supabase
      .channel("admin-game-state")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "game_state",
          filter: "id=eq.1",
        },
        (payload) => {
          if (!active || !payload.new) return;
          setGameState(payload.new as GameState);
        }
      )
      .subscribe();

    return () => {
      active = false;
      void supabase.removeChannel(channel);
    };
  }, [router]);

  async function handleLaunchGame() {
    if (isLaunching || gameState?.status === "starting") return;

    setIsLaunching(true);
    setError("");

    const supabase = createClient();
    const launchAt = new Date(Date.now() + 3000).toISOString();

    const { data, error: launchError } = await supabase
      .from("game_state")
      .update({
        status: "starting",
        launch_at: launchAt,
      })
      .eq("id", 1)
      .eq("status", "waiting")
      .select("id, status, launch_at")
      .maybeSingle();

    if (launchError) {
      console.error("Game launch error:", launchError);
      setError("Не удалось запустить первый тур.");
      setIsLaunching(false);
      return;
    }

    if (!data) {
      setError("Первый тур уже запускается или его состояние изменилось.");
      setIsLaunching(false);
      return;
    }

    setGameState(data);
    setIsLaunching(false);
  }

  if (isChecking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#020619] text-white">
        Проверка доступа...
      </main>
    );
  }

  const isGameStarting = gameState?.status === "starting";

  return (
    <>
      <Header />

      <main className="relative min-h-[calc(100svh-76px)] overflow-hidden bg-[#000456] px-5 py-8 text-white sm:px-8">
        {/* Фоновые свечения */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,#123968_0%,#091E40_45%,#020619_100%)]" />

          <div className="absolute -left-32 top-[10%] h-80 w-80 animate-pulse rounded-full bg-[#A51E50]/25 blur-[100px]" />
          <div className="absolute right-[-100px] top-[25%] h-96 w-96 animate-pulse rounded-full bg-[#C52B62]/30 blur-[110px]" />
          <div className="absolute left-[35%] top-[60%] h-80 w-80 animate-pulse rounded-full bg-[#8F1748]/30 blur-[100px]" />
          <div className="absolute bottom-[-120px] right-[10%] h-96 w-96 animate-pulse rounded-full bg-[#D43A70]/25 blur-[110px]" />
          <div className="absolute bottom-[5%] left-[5%] h-72 w-72 animate-pulse rounded-full bg-[#A51E50]/25 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Заголовок */}
          <div className="mb-7">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-[2px] w-9 bg-[#55A4FE]" />

              <span className="text-xs font-black uppercase tracking-[0.3em] text-[#55A4FE]">
                ChipaGame / Administration
              </span>
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              Панель администратора
            </h1>

            <p className="mt-2 text-sm text-white/45 sm:text-base">
              Управление игровым процессом и настройками.
            </p>
          </div>

          {/* Навигация */}
          <nav className="mb-7 flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
            <span className="rounded-lg bg-[#234C70] px-4 py-2 text-sm font-bold text-white shadow-md">
              Управление игрой
            </span>

            <Link
              href="/admin/teams"
              className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/60 transition-colors hover:border-[#55A4FE]/30 hover:bg-[#55A4FE]/10 hover:text-white"
            >
              Управление командами
            </Link>

            <span className="cursor-not-allowed rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/30">
              Настройка туров · Скоро
            </span>

            <Link
              href="/admin/devtools"
              className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/60 transition-colors hover:border-[#55A4FE]/30 hover:bg-[#55A4FE]/10 hover:text-white"
            >
              DevTools
            </Link>
          </nav>

          {/* Блоки управления турами */}
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
            {/* Первый тур */}
            <section className="flex flex-col overflow-hidden rounded-3xl border border-[#55A4FE]/20 bg-[#0B1B4D]/80 shadow-[0_15px_50px_rgba(0,0,0,0.2)] backdrop-blur-xl">
              <div className="border-b border-white/10 px-6 py-5 sm:px-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-[#55A4FE]">
                      First round
                    </p>

                    <h2 className="mt-1 text-2xl font-black">
                      Первый тур
                    </h2>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#55A4FE]/10 text-[#55A4FE]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-6 w-6"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col space-y-5 p-6 sm:p-7">
                {/* Состояние первого тура */}
                <div className="rounded-2xl border border-[#55A4FE]/15 bg-[#10295A]/80 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">
                    Состояние первого тура
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <span
                      className={`h-3 w-3 rounded-full ${
                        isGameStarting
                          ? "animate-pulse bg-[#55A4FE]"
                          : "bg-[#39E875]"
                      }`}
                    />

                    <p
                      className={`text-2xl font-black ${
                        isGameStarting
                          ? "text-[#55A4FE]"
                          : "text-[#39E875]"
                      }`}
                    >
                      {isGameStarting ? "Запускается" : "Ожидание"}
                    </p>
                  </div>

                  <p className="mt-2 text-sm text-white/50">
                    {isGameStarting
                      ? "Запуск первого тура уже начат."
                      : "Первый тур ожидает команды администратора."}
                  </p>
                </div>

                {/* Список команд */}
                <div className="overflow-hidden rounded-2xl border border-[#55A4FE]/15 bg-[#10295A]/70">
                  <button
                    type="button"
                    onClick={() => setIsTeamsExpanded(!isTeamsExpanded)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-[#55A4FE]/10"
                  >
                    <div>
                      <p className="font-bold text-white">
                        Список команд
                      </p>

                      <p className="mt-1 text-xs text-white/45">
                        Зарегистрировано: {teams.length}
                      </p>
                    </div>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`h-5 w-5 text-[#55A4FE] transition-transform duration-300 ${
                        isTeamsExpanded ? "rotate-180" : ""
                      }`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  {isTeamsExpanded && (
                    <div className="max-h-72 overflow-y-auto border-t border-white/10">
                      {teams.length === 0 ? (
                        <p className="px-5 py-6 text-sm text-white/40">
                          Пока нет зарегистрированных команд.
                        </p>
                      ) : (
                        <div className="divide-y divide-white/[0.06]">
                          {teams.map((team, index) => (
                            <div
                              key={team.id}
                              className="flex items-center gap-4 px-5 py-3"
                            >
                              <span className="text-xs font-black text-[#55A4FE]">
                                {String(index + 1).padStart(2, "0")}
                              </span>

                              <span className="font-semibold text-white">
                                {team.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {error && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400">
                    {error}
                  </div>
                )}

                {/* Запуск первого тура */}
                <div className="mt-auto border-t border-white/10 pt-5">
                  <button
                    type="button"
                    onClick={handleLaunchGame}
                    disabled={isLaunching || isGameStarting || !gameState}
                    className="w-full rounded-xl bg-[#0084FF] px-7 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:bg-[#006FE0] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    {isLaunching
                      ? "Запуск..."
                      : isGameStarting
                        ? "Первый тур запускается"
                        : "ЗАПУСТИТЬ ПЕРВЫЙ ТУР"}
                  </button>

                  <p className="mt-3 text-center text-xs text-white/35">
                    {isGameStarting
                      ? "Повторный запуск недоступен."
                      : "После запуска участники получат уведомление."}
                  </p>
                </div>
              </div>
            </section>

            {/* Второй тур */}
            <section className="flex flex-col overflow-hidden rounded-3xl border border-[#55A4FE]/20 bg-[#0B1B4D]/80 shadow-[0_15px_50px_rgba(0,0,0,0.2)] backdrop-blur-xl">
              <div className="border-b border-white/10 px-6 py-5 sm:px-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-[#55A4FE]">
                      Second round
                    </p>

                    <h2 className="mt-1 text-2xl font-black">
                      Второй тур
                    </h2>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#55A4FE]/10 text-[#55A4FE]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-6 w-6"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col space-y-5 p-6 sm:p-7">
                {/* Состояние второго тура */}
                <div className="rounded-2xl border border-[#55A4FE]/15 bg-[#10295A]/80 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">
                    Состояние второго тура
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-white/30" />

                    <p className="text-2xl font-black text-white/60">
                      Ожидание допуска
                    </p>
                  </div>

                  <p className="mt-2 text-sm text-white/50">
                    Запуск станет доступен после завершения первого тура и формирования списка допущенных команд.
                  </p>
                </div>

                {/* Допуск команд */}
                <div className="rounded-2xl border border-[#55A4FE]/15 bg-[#10295A]/70 p-5">
                  <p className="font-bold text-white">
                    Допущенные команды
                  </p>

                  <p className="mt-2 text-sm text-white/45">
                    Список и количество участников второго тура будут доступны после настройки отбора команд.
                  </p>

                  <Link
                    href="/admin/teams"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#55A4FE] transition-colors hover:text-white"
                  >
                    Перейти к управлению командами
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>

                {/* Запуск второго тура */}
                <div className="mt-auto border-t border-white/10 pt-5">
                  <button
                    type="button"
                    disabled
                    className="w-full cursor-not-allowed rounded-xl bg-[#0084FF]/40 px-7 py-4 text-base font-bold text-white/50"
                  >
                    ЗАПУСТИТЬ ВТОРОЙ ТУР
                  </button>

                  <p className="mt-3 text-center text-xs text-white/35">
                    Сначала завершите первый тур и определите список участников второго тура.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Нижняя подпись */}
          <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5 text-xs text-white/30">
            <span>ChipaGame Administration</span>
            <span>Control Center</span>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
