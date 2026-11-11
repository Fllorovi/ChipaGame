
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    setMessage("");
    setIsLoading(true);

    const formData = new FormData(form);

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const supabase = createClient();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error("Неверная почта или пароль.");
      }

      if (data.session) {
        router.push("/lobby");
        router.refresh();
      }
    } catch (error) {
      console.error("Login error:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Не удалось войти. Попробуйте ещё раз."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header actionLabel="Регистрация" actionHref="/register" />

      <main className="relative flex h-[calc(100svh-76px-64px)] items-center justify-center overflow-hidden bg-[#030822] px-5 py-2 text-white">
        {/* Анимированные вспышки */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          <div
            className="storm-glow absolute -left-32 top-[5%] h-[430px] w-[520px] rounded-[42%_58%_63%_37%] blur-[65px]"
            style={{
              background:
                "radial-gradient(ellipse, rgba(0,132,255,0.75), rgba(85,164,254,0.35) 45%, transparent 72%)",
              animation: "storm-glow 13s ease-in-out -4s infinite",
            }}
          />

          <div
            className="storm-glow absolute -right-32 top-[20%] h-[500px] w-[550px] rounded-[63%_37%_42%_58%] blur-[75px]"
            style={{
              background:
                "radial-gradient(ellipse, rgba(85,164,254,0.70), rgba(0,132,255,0.30) 48%, transparent 72%)",
              animation: "storm-glow 17s ease-in-out -9s infinite",
            }}
          />

          <div
            className="storm-glow absolute -bottom-64 left-[25%] h-[450px] w-[600px] rounded-[47%_53%_35%_65%] blur-[85px]"
            style={{
              background:
                "radial-gradient(ellipse, rgba(0,100,255,0.65), rgba(85,164,254,0.28) 50%, transparent 72%)",
              animation: "storm-glow 21s ease-in-out -13s infinite",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#000C3A]/15 via-transparent to-[#030822]/40" />
        </div>

        {/* Основной контент */}
        <div className="relative z-10 w-full max-w-[1050px]">

          {/* Контент страницы */}
          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* Левая колонка */}
            <section className="max-w-md">
              <span className="mb-5 inline-flex rounded-full border border-[#55A4FE]/30 bg-[#55A4FE]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ABD2FB]">
                С возвращением
              </span>

              <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
                Ваша команда
                <br />
                <span className="text-[#55A4FE]">
                  снова в игре.
                </span>
              </h1>

              <p className="text-base leading-relaxed text-white/60 sm:text-lg">
                Войдите в аккаунт команды, чтобы вернуться в ChipaGame
                и продолжить участие.
              </p>

              <div className="mt-10 flex items-center gap-4">
                <div className="h-12 w-1 rounded-full bg-[#55A4FE]" />
                <p className="text-sm leading-relaxed text-white/50">
                  Один аккаунт — одна команда.
                  <br />
                  Участники играют вместе.
                </p>
              </div>
            </section>

            {/* Карточка входа */}
            <section className="rounded-[28px] border border-white/10 bg-white/[0.08] p-7 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-10">

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white">
                  Вход в аккаунт
                </h2>

                <p className="mt-2 text-sm text-white/50">
                  Введите данные вашей команды.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Электронная почта */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-white/80"
                  >
                    Электронная почта
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="team@example.com"
                    autoComplete="email"
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#000C3A]/50 px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-[#55A4FE] focus:ring-2 focus:ring-[#55A4FE]/20"
                  />
                </div>

                {/* Пароль */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-white/80"
                    >
                      Пароль
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Введите пароль"
                      autoComplete="current-password"
                      required
                      className="w-full rounded-xl border border-white/10 bg-[#000C3A]/50 px-4 py-3.5 pr-16 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-[#55A4FE] focus:ring-2 focus:ring-[#55A4FE]/20"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#55A4FE] transition-colors hover:text-[#ABD2FB]"
                    >
                      {showPassword ? "Скрыть" : "Показать"}
                    </button>
                  </div>
                </div>

                {/* Сообщение об ошибке */}
                {message && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-xs leading-relaxed text-red-200"
                  >
                    {message}
                  </div>
                )}

                {/* Кнопка входа */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#55A4FE] px-6 py-3.5 font-bold text-[#000C3A] shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:bg-[#78B7FF] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {isLoading ? "Выполняем вход..." : "Войти в аккаунт"}

                  {!isLoading && (
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  )}
                </button>

              </form>

              {/* Переход к регистрации */}
              <p className="mt-7 text-center text-sm text-white/50">
                Ещё нет аккаунта?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-[#55A4FE] transition-colors hover:text-[#78B7FF]"
                >
                  Зарегистрировать команду
                </Link>
              </p>

            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
