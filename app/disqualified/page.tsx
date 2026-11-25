
"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function DisqualifiedPage() {
  useEffect(() => {
    const supabase = createClient();

    async function signOut() {
      await supabase.auth.signOut();
    }

    void signOut();
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020619] px-5 py-10 text-white">
      {/* Фоновые свечения */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,#123968_0%,#091E40_45%,#020619_100%)]" />

        <div
          className="absolute -left-32 top-[5%] h-96 w-96 rounded-full bg-red-600/30 blur-[110px]"
          style={{ animation: "disqualification-glow 7s ease-in-out infinite" }}
        />

        <div
          className="absolute -right-32 top-[20%] h-[500px] w-[500px] rounded-full bg-red-500/35 blur-[120px]"
          style={{
            animation: "disqualification-glow 9s ease-in-out -3s infinite",
          }}
        />

        <div
          className="absolute bottom-[-180px] left-[25%] h-[500px] w-[600px] rounded-full bg-red-700/25 blur-[120px]"
          style={{
            animation: "disqualification-glow 11s ease-in-out -5s infinite",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#000C3A]/20 via-transparent to-[#020619]/50" />
      </div>

      {/* Основной контент */}
      <div className="relative z-10 w-full max-w-2xl">
        <section className="rounded-[32px] border border-red-400/20 bg-[#0B1B4D]/80 p-8 text-center shadow-[0_20px_80px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:p-12">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-red-400/30 bg-red-500/10 shadow-[0_0_45px_rgba(239,68,68,0.2)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-10 w-10 text-red-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v4m0 4h.01M10.3 3.9 1.8 18.6A1.6 1.6 0 0 0 3.2 21h17.6a1.6 1.6 0 0 0 1.4-2.4L13.7 3.9a1.9 1.9 0 0 0-3.4 0Z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            Вы были{" "}
            <span className="text-red-400">дисквалифицированы</span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/65 sm:text-lg">
            Администраторы сочли ваши действия нарушающими правила игры.
            Доступ к игровому процессу для вашей команды закрыт.
          </p>

          <div className="mx-auto mt-9 h-px max-w-xs bg-gradient-to-r from-transparent via-red-400/40 to-transparent" />

          <p className="mt-7 text-sm leading-relaxed text-white/35">
            Если вы считаете, что решение было принято ошибочно,
            обратитесь к организаторам игры.
          </p>

          <div className="mt-10 text-xs font-semibold uppercase tracking-[0.25em] text-white/25">
            ChipaGame Administration
          </div>
        </section>
      </div>

      <style jsx global>{`
        @keyframes disqualification-glow {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(0.9);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.12);
          }
        }
      `}</style>
    </main>
  );
}
