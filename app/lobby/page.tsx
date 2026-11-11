
"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const demoTeams = [
  { id: 1, name: "Команда 1", status: "В лобби" },
  { id: 2, name: "Команда 2", status: "В лобби" },
  { id: 3, name: "Команда 3", status: "В лобби" },
  { id: 4, name: "Команда 4", status: "В лобби" },
];

export default function LobbyPage() {
  return (
    <>
      <Header />

      <main className="relative min-h-[calc(100svh-76px)] overflow-hidden bg-[#030822] px-5 py-10 text-white sm:px-8">
        {/* Фоновые свечения */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div
            className="storm-glow absolute -left-40 top-0 h-[500px] w-[550px] rounded-full blur-[100px]"
            style={{
              background:
                "radial-gradient(circle, rgba(0,132,255,0.35), transparent 70%)",
            }}
          />

          <div
            className="storm-glow absolute -right-40 top-[30%] h-[550px] w-[600px] rounded-full blur-[110px]"
            style={{
              background:
                "radial-gradient(circle, rgba(85,164,254,0.25), transparent 70%)",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#000C3A]/20 via-transparent to-[#030822]/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Заголовок страницы */}
          <div className="mb-10">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-10 bg-[#55A4FE]" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#55A4FE]">
                ChipaGame / Lobby
              </span>
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              Игровое <span className="text-[#55A4FE]">лобби</span>
            </h1>

            <p className="mt-2 text-sm text-white/45 sm:text-base">
              Все команды собираются здесь перед началом игры.
            </p>
          </div>

          {/* Центральный блок ожидания */}
          <section className="relative mb-8 overflow-hidden rounded-[28px] border border-[#55A4FE]/20 bg-gradient-to-br from-[#0B1B4D]/90 to-[#06102F]/90 p-7 shadow-[0_15px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-10">
            {/* Декоративное свечение */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-[#0084FF]/10 blur-[80px]"
            />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-[#55A4FE]/25 bg-[#55A4FE]/10 shadow-[0_0_40px_rgba(85,164,254,0.12)]">
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#55A4FE"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </div>

              <span className="mb-4 rounded-full border border-[#55A4FE]/25 bg-[#55A4FE]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#ABD2FB]">
                Ожидание участников
              </span>

              <h2 className="text-2xl font-black sm:text-3xl">
                Скоро всё начнётся
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/50 sm:text-base">
                Дождитесь, пока организаторы соберут все команды и объявят
                начало игры. Не закрывайте страницу.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
                <div>
                  <div className="text-3xl font-black text-white">
                    {demoTeams.length}
                  </div>
                  <div className="mt-1 text-xs font-medium text-white/40">
                    Команд в лобби
                  </div>
                </div>

                <div className="h-10 w-px bg-white/10" />

                <div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#39E875] shadow-[0_0_10px_#39E875]" />
                    <span className="text-sm font-bold text-[#39E875]">
                      Ожидание
                    </span>
                  </div>
                  <div className="mt-1 text-xs font-medium text-white/40">
                    Статус игры
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Список команд */}
          <section className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/10 backdrop-blur-xl">
            <div className="flex flex-col justify-between gap-3 border-b border-white/10 px-6 py-6 sm:flex-row sm:items-center sm:px-8">
              <div>
                <h2 className="text-xl font-bold">
                  Участники лобби
                </h2>
                <p className="mt-1 text-sm text-white/40">
                  Команды, зарегистрированные для участия
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-white/40">
                <span className="h-2 w-2 rounded-full bg-[#39E875] shadow-[0_0_8px_#39E875]" />
                Список команд
              </div>
            </div>

            <div className="divide-y divide-white/[0.06]">
              {demoTeams.map((team, index) => (
                <div
                  key={team.id}
                  className="flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-white/[0.03] sm:px-8"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#55A4FE]/15 bg-[#55A4FE]/10 text-sm font-black text-[#55A4FE]">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-bold text-white sm:text-base">
                        {team.name}
                      </h3>
                      <p className="mt-1 text-xs text-white/35">
                        Участник игры
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 rounded-full border border-[#39E875]/15 bg-[#39E875]/[0.06] px-3 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#39E875] shadow-[0_0_7px_#39E875]" />
                    <span className="text-xs font-semibold text-[#39E875]">
                      {team.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 px-6 py-4 text-center sm:px-8">
              <p className="text-xs text-white/30">
                Список будет обновляться автоматически
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
