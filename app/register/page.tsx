
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    setMessage("");
    setIsSuccess(false);
    setIsLoading(true);

    const formData = new FormData(form);

    const teamName = String(formData.get("teamName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const supabase = createClient();

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            team_name: teamName,
          },
        },
      });

      if (error) {
        if (error.message.toLowerCase().includes("duplicate")) {
          throw new Error("Команда с таким названием уже существует.");
        }

        throw error;
      }

      if (!data.session) {
        throw new Error(
          "Не удалось создать активную сессию. Попробуйте ещё раз."
        );
      }

      setIsSuccess(true);
      setMessage(
        "Команда успешно зарегистрирована! Теперь можно перейти к следующему этапу."
      );

      form.reset();
    } catch (error) {
      console.error("Registration error:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Не удалось зарегистрировать команду. Попробуйте ещё раз."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header actionLabel="Войти" actionHref="/login" />

      {/* Основная область */}
      <main className="relative isolate flex min-h-[calc(100svh-76px)] items-center overflow-x-clip bg-[#000C3A] px-6 py-12 text-white">

        {/* Атмосферные вспышки */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          {/* Левая вспышка */}
          <div
            className="storm-glow absolute -left-32 top-[5%] h-[430px] w-[520px] rounded-[42%_58%_63%_37%] blur-[65px]"
            style={{
              background:
                "radial-gradient(ellipse, rgba(0,132,255,0.75), rgba(85,164,254,0.35) 45%, transparent 72%)",
              animation: "storm-glow 13s ease-in-out -4s infinite",
            }}
          />

          {/* Правая вспышка */}
          <div
            className="storm-glow absolute -right-32 top-[20%] h-[500px] w-[550px] rounded-[63%_37%_42%_58%] blur-[75px]"
            style={{
              background:
                "radial-gradient(ellipse, rgba(85,164,254,0.70), rgba(0,132,255,0.30) 48%, transparent 72%)",
              animation: "storm-glow 17s ease-in-out -9s infinite",
            }}
          />

          {/* Нижняя вспышка */}
          <div
            className="storm-glow absolute -bottom-64 left-[25%] h-[450px] w-[600px] rounded-[47%_53%_35%_65%] blur-[85px]"
            style={{
              background:
                "radial-gradient(ellipse, rgba(0,100,255,0.65), rgba(85,164,254,0.28) 50%, transparent 72%)",
              animation: "storm-glow 21s ease-in-out -13s infinite",
            }}
          />

          {/* Затемнение для сохранения контраста */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#000C3A]/15 via-transparent to-[#030822]/40" />
        </div>

        {/* Контент */}
        <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-2 items-center gap-16 max-md:grid-cols-1 max-md:gap-8">

          {/* Левая информационная часть */}
          <section className="max-md:text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#55A4FE]">
              CHIPAGAME
            </p>

            <h1 className="mt-5 text-5xl font-black leading-[1.12] tracking-tight lg:text-6xl">
              Всё начинается
              <br />
              с одного
              <br />
              <span className="text-[#55A4FE]">решения.</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-blue-100/60 max-md:mx-auto">
              Зарегистрируйте свою команду и станьте частью
              ChipaGame. Впереди вас ждёт нечто интересное.
            </p>

            <div className="mt-9 flex items-center gap-3 max-md:justify-center">
              <div className="h-px w-12 bg-[#55A4FE]/60" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-blue-100/40">
                Your experience starts here
              </span>
            </div>
          </section>

          {/* Форма */}
          <section className="w-full max-w-[460px] justify-self-end max-md:mx-auto">
            <div className="rounded-3xl border border-white/10 bg-[#071638]/75 p-7 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-8">

              <div className="mb-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#55A4FE]">
                  Регистрация
                </p>

                <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                  Зарегистрировать команду
                </h2>

                <p className="mt-2 text-sm text-blue-100/50">
                  Заполните необходимые данные.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Название команды */}
                <div>
                  <label
                    htmlFor="teamName"
                    className="mb-2 block text-sm font-semibold text-white/90"
                  >
                    Название команды
                  </label>

                  <input
                    id="teamName"
                    name="teamName"
                    type="text"
                    placeholder="Название вашей команды"
                    autoComplete="organization"
                    required
                    minLength={2}
                    maxLength={40}
                    className="w-full rounded-xl border border-white/10 bg-[#030B2B]/80 px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-[#55A4FE] focus:ring-2 focus:ring-[#55A4FE]/15"
                  />
                </div>

                {/* Почта */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-white/90"
                  >
                    Электронная почта
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@mail.com"
                    autoComplete="email"
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#030B2B]/80 px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-[#55A4FE] focus:ring-2 focus:ring-[#55A4FE]/15"
                  />
                </div>

                {/* Пароль */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-white/90"
                  >
                    Пароль
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Придумайте пароль"
                      autoComplete="new-password"
                      required
                      minLength={8}
                      className="w-full rounded-xl border border-white/10 bg-[#030B2B]/80 px-4 py-3.5 pr-20 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-[#55A4FE] focus:ring-2 focus:ring-[#55A4FE]/15"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#55A4FE] transition-colors hover:text-[#ABD2FB]"
                    >
                      {showPassword ? "Скрыть" : "Показать"}
                    </button>
                  </div>

                  <p className="mt-1.5 text-xs text-white/35">
                    Не менее 8 символов.
                  </p>
                </div>

                {/* Сообщение */}
                {message && (
                  <div
                    role={isSuccess ? "status" : "alert"}
                    className={`rounded-xl border p-3 text-xs leading-relaxed ${
                      isSuccess
                        ? "border-green-400/20 bg-green-400/10 text-green-200"
                        : "border-red-400/20 bg-red-400/10 text-red-200"
                    }`}
                  >
                    {message}
                  </div>
                )}

                {/* Кнопка */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#55A4FE] px-6 py-3.5 font-bold text-[#000C3A] shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:bg-[#78B7FF] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {isLoading
                    ? "Регистрируем команду..."
                    : "Зарегистрировать команду"}

                  {!isLoading && (
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  )}
                </button>

                <p className="mt-6 text-center text-sm text-white/60">
                  Уже есть аккаунт?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-[#55A4FE] transition-colors hover:text-[#78B7FF]"
                  >
                    Войти
                  </Link>
                </p>
              </form>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
