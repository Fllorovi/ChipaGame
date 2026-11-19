
"use client";

import { useEffect, useState } from "react";
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
  const [skipPromo, setSkipPromo] = useState(false);

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
      setError("Не удалось запустить игру.");
      setIsLaunching(false);
      return;
    }

    if (!data) {
      setError("Игра уже запускается или её состояние изменилось.");
      setIsLaunching(false);
      return;
    }

    setGameState(data);
    setIsLaunching(false);
  }

  if (isChecking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#030822] text-white">
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
          {/* Голубая основа */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,#123968_0%,#091E40_45%,#020619_100%)]" />

          {/* Малиновые вспышки */}
          <div className="absolute -left-32 top-[10%] h-80 w-80 animate-pulse rounded-full bg-[#A51E50]/25 blur-[100px]" />
          <div className="absolute right-[-100px] top-[25%] h-96 w-96 animate-pulse rounded-full bg-[#C52B62]/30 blur-[110px] [animation-delay:500ms]" />
          <div className="absolute left-[35%] top-[60%] h-80 w-80 animate-pulse rounded-full bg-[#8F1748]/30 blur-[100px] [animation-delay:1000ms]" />
          <div className="absolute bottom-[-120px] right-[10%] h-96 w-96 animate-pulse rounded-full bg-[#D43A70]/25 blur-[110px] [animation-delay:700ms]" />
          <div className="absolute bottom-[5%] left-[5%] h-72 w-72 animate-pulse rounded-full bg-[#A51E50]/25 blur-[100px] [animation-delay:1300ms]" />
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

          {/* Дополнительная навигация */}
          <nav className="mb-7 flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
            <span className="rounded-lg bg-[#234C70] px-4 py-2 text-sm font-bold text-white shadow-md">
              Управление игрой
            </span>

            <span className="cursor-not-allowed rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/30">
              Настройка туров · Скоро
            </span>
          </nav>

          {/* Основные блоки */}
          <div className="grid items-start gap-6 lg:grid-cols-2">
            {/* ИГРА */}
            <section className="overflow-hidden rounded-3xl border border-[#55A4FE]/20 bg-[#0B1B4D]/80 shadow-[0_15px_50px_rgba(0,0,0,0.2)] backdrop-blur-xl">
              <div className="border-b border-white/10 px-6 py-5 sm:px-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-[#55A4FE]">
                      Control panel
                    </p>

                    <h2 className="mt-1 text-2xl font-black">Игра</h2>
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

              <div className="space-y-5 p-6 sm:p-7">
                {/* Состояние игры */}
                <div className="rounded-2xl border border-[#55A4FE]/15 bg-[#10295A]/80 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">
                    Состояние игры
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
                      ? "Запуск игры уже начат."
                      : "Игра ожидает команды администратора."}
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

                {/* Ошибка */}
                {error && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400">
                    {error}
                  </div>
                )}

                {/* Запуск игры */}
                <div className="border-t border-white/10 pt-5">
                  <button
                    type="button"
                    onClick={handleLaunchGame}
                    disabled={isLaunching || isGameStarting || !gameState}
                    className="w-full rounded-xl bg-[#0084FF] px-7 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:bg-[#006FE0] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    {isLaunching
                      ? "Запуск..."
                      : isGameStarting
                        ? "Игра запускается"
                        : "ЗАПУСТИТЬ ИГРУ"}
                  </button>

                  <p className="mt-3 text-center text-xs text-white/35">
                    {isGameStarting
                      ? "Повторный запуск недоступен."
                      : "После запуска все участники получат уведомление."}
                  </p>
                </div>
              </div>
            </section>

            {/* DEVTOOLS */}
            <section className="overflow-hidden rounded-3xl border border-[#55A4FE]/20 bg-[#0B1B4D]/80 shadow-[0_15px_50px_rgba(0,0,0,0.2)] backdrop-blur-xl">
              <div className="border-b border-white/10 px-6 py-5 sm:px-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-[#55A4FE]">
                      Advanced controls
                    </p>

                    <h2 className="mt-1 text-2xl font-black">DevTools</h2>
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
                      <path d="m14.7 6.3 3 3M4 20l5.5-1 9.2-9.2a2.1 2.1 0 0 0-3-3L6.5 16 4 20Z" />
                      <path d="m13 8 3 3" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-6 p-6 sm:p-7">
                {/* Пропуск туров */}
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/45">
                    Управление турами
                  </p>

                  <div className="space-y-3">
                    <button
                      type="button"
                      disabled
                      className="flex w-full cursor-not-allowed items-center justify-between rounded-xl border border-[#55A4FE]/10 bg-[#10295A]/60 px-5 py-4 text-left opacity-50"
                    >
                      <div>
                        <p className="font-bold text-white">
                          Пропустить 1 тур
                        </p>

                        <p className="mt-1 text-xs text-white/40">
                          Функция пока не реализована
                        </p>
                      </div>

                      <span className="rounded-lg bg-[#55A4FE]/10 px-3 py-1 text-xs font-bold text-[#55A4FE]">
                        Скоро
                      </span>
                    </button>

                    <button
                      type="button"
                      disabled
                      className="flex w-full cursor-not-allowed items-center justify-between rounded-xl border border-[#55A4FE]/10 bg-[#10295A]/60 px-5 py-4 text-left opacity-50"
                    >
                      <div>
                        <p className="font-bold text-white">
                          Пропустить 2 тур
                        </p>

                        <p className="mt-1 text-xs text-white/40">
                          Функция пока не реализована
                        </p>
                      </div>

                      <span className="rounded-lg bg-[#55A4FE]/10 px-3 py-1 text-xs font-bold text-[#55A4FE]">
                        Скоро
                      </span>
                    </button>
                  </div>
                </div>

                {/* Настройки запуска */}
                <div className="border-t border-white/10 pt-6">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/45">
                    Настройки запуска
                  </p>

                  <div className="flex items-center justify-between gap-4 rounded-xl border border-[#55A4FE]/15 bg-[#10295A]/80 p-5">
                    <div>
                      <p className="font-bold text-white">
                        Пропускать проморолик
                      </p>

                      <p className="mt-1 text-xs text-white/45">
                        Не воспроизводить intro.mp4 при запуске
                      </p>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={skipPromo}
                      onClick={() => setSkipPromo((prev) => !prev)}
                      className={`relative flex h-7 w-12 shrink-0 items-center rounded-full p-1 transition-colors duration-200 ${
                        skipPromo ? "bg-[#0084FF]" : "bg-[#35506F]"
                      }`}
                    >
                      <span
                        className={`h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200 ${
                          skipPromo ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <p className="mt-3 text-xs text-white/35">
                    Настройка пока работает только визуально. Её сохранение и
                    применение при запуске подключим отдельно.
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
