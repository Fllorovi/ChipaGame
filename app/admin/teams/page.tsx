"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/client";

type AccessStatus = "pending" | "denied" | "approved";

interface Team {
  id: string;
  name: string;
  correctAnswers: number;
  accessStatus: AccessStatus;
  isDisqualified: boolean;
}

export default function AdminTeamsPage() {
  const router = useRouter();

  const [teams, setTeams] = useState<Team[]>([]);
  const [teamLimit, setTeamLimit] = useState("");

  const [isChecking, setIsChecking] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [processingTeamId, setProcessingTeamId] = useState<string | null>(
    null
  );

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    async function loadTeams() {
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

      const [teamResult, resultsResult] = await Promise.all([
        supabase
          .from("teams")
          .select("id, name, access_status, is_disqualified"),

        supabase
          .from("team_round_results")
          .select("team_id, correct_answers")
          .eq("round_number", 1),
      ]);

      if (!active) return;

      if (teamResult.error) {
        console.error("Teams loading error:", teamResult.error);
        setError("Не удалось загрузить список команд.");
        setIsChecking(false);
        return;
      }

      if (resultsResult.error) {
        console.error("Round results loading error:", resultsResult.error);
        setError("Не удалось загрузить порядок команд.");
        setIsChecking(false);
        return;
      }

      const resultsMap = new Map(
        (resultsResult.data ?? []).map((result) => [
          result.team_id,
          result.correct_answers,
        ])
      );

      const sortedTeams = (teamResult.data ?? [])
        .map((team) => ({
          id: team.id,
          name: team.name,
          correctAnswers: resultsMap.get(team.id) ?? 0,
          accessStatus: team.access_status as AccessStatus,
          isDisqualified: team.is_disqualified,
        }))
        .sort((a, b) => b.correctAnswers - a.correctAnswers);

      setTeams(sortedTeams);
      setIsChecking(false);
    }

    void loadTeams();

    return () => {
      active = false;
    };
  }, [router]);

  async function handleApplyAccess() {
    if (isApplying || processingTeamId) return;

    setError("");
    setSuccess("");

    const count = Number(teamLimit);

    if (
      teamLimit.trim() === "" ||
      !Number.isInteger(count) ||
      count < 0 ||
      count > teams.length
    ) {
      setError("Введите целое число от 0 до количества команд.");
      return;
    }

    setIsApplying(true);

    const supabase = createClient();

    const approvedIds = teams.slice(0, count).map((team) => team.id);
    const deniedIds = teams.slice(count).map((team) => team.id);

    const updates = [];

    if (approvedIds.length > 0) {
      updates.push(
        supabase
          .from("teams")
          .update({ access_status: "approved" })
          .in("id", approvedIds)
      );
    }

    if (deniedIds.length > 0) {
      updates.push(
        supabase
          .from("teams")
          .update({ access_status: "denied" })
          .in("id", deniedIds)
      );
    }

    const results = await Promise.all(updates);
    const failedUpdate = results.find((result) => result.error);

    if (failedUpdate?.error) {
      console.error("Access update error:", failedUpdate.error);
      setError("Не удалось применить отбор команд.");
      setIsApplying(false);
      return;
    }

    setTeams((currentTeams) =>
      currentTeams.map((team, index) => ({
        ...team,
        accessStatus: index < count ? "approved" : "denied",
      }))
    );

    setSuccess("Отбор команд успешно применён.");
    setIsApplying(false);
  }

  async function handleToggleDisqualification(team: Team) {
    if (processingTeamId || isApplying) return;

    setError("");
    setSuccess("");
    setProcessingTeamId(team.id);

    const newValue = !team.isDisqualified;
    const supabase = createClient();

    try {
      const { data, error: updateError } = await supabase
        .from("teams")
        .update({ is_disqualified: newValue })
        .eq("id", team.id)
        .select("id, is_disqualified")
        .single();

      if (updateError || !data) {
        console.error("Disqualification update error:", updateError);
        setError("Не удалось изменить статус дисквалификации.");
        return;
      }

      setTeams((currentTeams) =>
        currentTeams.map((item) =>
          item.id === team.id
            ? { ...item, isDisqualified: data.is_disqualified }
            : item
        )
      );

      setSuccess(
        data.is_disqualified
          ? `Команда «${team.name}» дисквалифицирована.`
          : `Команда «${team.name}» восстановлена.`
      );
    } catch (error) {
      console.error("Disqualification error:", error);
      setError("Произошла ошибка при изменении статуса дисквалификации.");
    } finally {
      setProcessingTeamId(null);
    }
  }

  if (isChecking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#020619] text-white">
        Проверка доступа...
      </main>
    );
  }

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
              Управление командами
            </h1>

            <p className="mt-2 text-sm text-white/45 sm:text-base">
              Отбор и дисквалификация команд.
            </p>
          </div>

          {/* Навигация */}
          <nav className="mb-7 flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
            <Link
              href="/admin"
              className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/60 transition-colors hover:border-[#55A4FE]/30 hover:bg-[#55A4FE]/10 hover:text-white"
            >
              Управление игрой
            </Link>

            <span className="rounded-lg bg-[#234C70] px-4 py-2 text-sm font-bold text-white shadow-md">
              Управление командами
            </span>

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

          {/* Общие сообщения */}
          {(error || success) && (
            <div className="mb-6">
              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm font-medium text-green-400">
                  {success}
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            {/* Список команд */}
            <section className="overflow-hidden rounded-3xl border border-[#55A4FE]/20 bg-[#0B1B4D]/80 shadow-[0_15px_50px_rgba(0,0,0,0.2)] backdrop-blur-xl">
              <div className="border-b border-white/10 px-6 py-5 sm:px-7">
                <h2 className="text-2xl font-black">Список команд</h2>
              </div>

              <div className="p-6 sm:p-7">
                {teams.length === 0 ? (
                  <p className="py-8 text-center text-sm text-white/40">
                    Пока нет зарегистрированных команд.
                  </p>
                ) : (
                  <div className="overflow-hidden rounded-2xl border border-[#55A4FE]/15 bg-[#10295A]/70">
                    <div className="divide-y divide-white/[0.06]">
                      {teams.map((team, index) => (
                        <div
                          key={team.id}
                          className="flex items-center gap-4 px-5 py-3 transition-colors hover:bg-[#55A4FE]/[0.06]"
                        >
                          <span className="w-10 shrink-0 text-sm font-black tabular-nums text-[#55A4FE]">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span className="min-w-0 flex-1 break-words font-semibold text-white">
                            {team.name}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              handleToggleDisqualification(team)
                            }
                            disabled={
                              processingTeamId === team.id || isApplying
                            }
                            className={`shrink-0 rounded-lg border px-3 py-2 text-xs font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                              team.isDisqualified
                                ? "border-[#39E875]/20 bg-[#39E875]/10 text-[#39E875] hover:bg-[#39E875]/20"
                                : "border-red-400/20 bg-red-400/10 text-red-300 hover:bg-red-400/20"
                            }`}
                          >
                            {processingTeamId === team.id
                              ? "..."
                              : team.isDisqualified
                                ? "Восстановить"
                                : "Дисквалифицировать"}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Отбор команд */}
            <section className="overflow-hidden rounded-3xl border border-[#55A4FE]/20 bg-[#0B1B4D]/80 shadow-[0_15px_50px_rgba(0,0,0,0.2)] backdrop-blur-xl">
              <div className="border-b border-white/10 px-6 py-5 sm:px-7">
                <h2 className="text-2xl font-black">Отбор команд</h2>
              </div>

              <div className="space-y-5 p-6 sm:p-7">
                <div>
                  <label
                    htmlFor="team-limit"
                    className="mb-2 block text-sm font-bold text-white/70"
                  >
                    Количество команд
                  </label>

                  <input
                    id="team-limit"
                    type="text"
                    inputMode="numeric"
                    value={teamLimit}
                    onChange={(event) => {
                      setTeamLimit(event.target.value);
                      setError("");
                      setSuccess("");
                    }}
                    className="w-full rounded-xl border border-[#55A4FE]/20 bg-[#10295A] px-4 py-4 text-lg font-bold text-white outline-none transition-colors focus:border-[#55A4FE] focus:ring-2 focus:ring-[#55A4FE]/20"
                  />

                  <p className="mt-2 text-xs leading-relaxed text-white/45">
                    После применения отбора останутся первые N команд по
                    результатам первого тура. Остальные не пройдут во второй
                    тур.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleApplyAccess}
                  disabled={isApplying || teams.length === 0}
                  className="w-full rounded-xl bg-[#0084FF] px-7 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:bg-[#006FE0] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {isApplying ? "Применение..." : "ПРИМЕНИТЬ ОТБОР"}
                </button>
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