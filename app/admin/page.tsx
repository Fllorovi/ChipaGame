
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

      <main className="relative min-h-[calc(100svh-76px)] overflow-hidden bg-[#030822] px-5 py-10 text-white sm:px-8">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-10">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-10 bg-[#55A4FE]" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#55A4FE]">
                ChipaGame / Admin
              </span>
            </div>

            <h1 className="text-3xl font-black sm:text-4xl">
              Панель <span className="text-[#55A4FE]">администратора</span>
            </h1>
            <p className="mt-2 text-sm text-white/45 sm:text-base">
              Управление игровым процессом.
            </p>
          </div>

          <section className="mb-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#55A4FE]/20 bg-[#0B1B4D]/80 p-6">
              <p className="text-sm text-white/50">Всего команд</p>
              <p className="mt-2 text-4xl font-black">{teams.length}</p>
            </div>

            <div className="rounded-2xl border border-[#39E875]/20 bg-[#0B1B4D]/80 p-6">
              <p className="text-sm text-white/50">Статус игры</p>
              <p
                className={`mt-2 text-2xl font-black ${
                  isGameStarting ? "text-[#55A4FE]" : "text-[#39E875]"
                }`}
              >
                {isGameStarting ? "Запускается" : "Ожидание"}
              </p>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
            <div className="border-b border-white/10 px-6 py-5">
              <h2 className="text-xl font-bold">
                Зарегистрированные команды
              </h2>
            </div>

            {error && (
              <p className="border-b border-white/10 px-6 py-4 text-sm text-red-400">
                {error}
              </p>
            )}

            {teams.length === 0 ? (
              <p className="px-6 py-8 text-sm text-white/40">
                Пока нет зарегистрированных команд.
              </p>
            ) : (
              <div className="divide-y divide-white/[0.06]">
                {teams.map((team, index) => (
                  <div
                    key={team.id}
                    className="flex items-center gap-4 px-6 py-4"
                  >
                    <span className="text-sm font-bold text-[#55A4FE]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-semibold">{team.name}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="mt-8 rounded-2xl border border-[#55A4FE]/20 bg-[#0B1B4D]/80 p-6 sm:p-8">
            <h2 className="text-xl font-bold">Управление игрой</h2>
            <p className="mt-2 text-sm text-white/45">
              Запуск игры для всех зарегистрированных команд.
            </p>

            <button
              type="button"
              onClick={handleLaunchGame}
              disabled={isLaunching || isGameStarting || !gameState}
              className="mt-6 flex items-center gap-3 rounded-xl bg-[#0084FF] px-7 py-4 font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:bg-[#006FE0] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {isLaunching
                ? "Запуск..."
                : isGameStarting
                  ? "Игра запускается"
                  : "Запустить игру"}
            </button>

            <p className="mt-3 text-xs text-white/30">
              {isGameStarting
                ? "Запуск игры уже начат. Повторное нажатие недоступно."
                : "После запуска все участники получат уведомление."}
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
