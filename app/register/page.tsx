"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

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
        const captainPhone = String(formData.get("captainPhone") ?? "").trim();
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
                        captain_phone: captainPhone,
                    },
                },
            });

            if (error) {
                if (error.message.toLowerCase().includes("duplicate")) {
                    throw new Error("Команда с таким названием уже существует.");
                }

                throw error;
            }

            if (!data.user) {
                throw new Error(
                    "Не удалось зарегистрировать команду. Попробуйте ещё раз."
                );
            }

            if (!data.session) {
                throw new Error(
                    "Регистрация создана, но не удалось войти в аккаунт. Обратитесь к организаторам."
                );
            }

            setIsSuccess(true);
            setMessage("Команда успешно зарегистрирована!");

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

    function ContactButton() {
        return (
            <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=lukianovalexandr2%40mail.ru&su=Обращение%20по%20ChipaGame"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#55A4FE]/30 bg-[#55A4FE]/5 px-5 py-3.5 text-sm font-semibold text-[#ABD2FB] transition-all hover:-translate-y-0.5 hover:border-[#55A4FE]/60 hover:bg-[#55A4FE]/10"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                </svg>

                Связаться с организаторами

                <span className="transition-transform group-hover:translate-x-1">
                    →
                </span>
            </a>
        );
    }

    return (
        <main className="relative isolate flex min-h-[100svh] items-center overflow-x-clip bg-[#000C3A] px-4 py-8 text-white sm:px-6 sm:py-12">
            {/* Атмосферные вспышки */}
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

            {/* Контент */}
            <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">
                {/* Информационная часть */}
                <section className="order-2 text-center md:order-1 md:text-left">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#55A4FE]">
                        CHIPAGAME
                    </p>

                    <h1 className="mt-5 text-4xl font-black leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
                        Всё начинается
                        <br />
                        с одного
                        <br />
                        <span className="text-[#55A4FE]">решения.</span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-blue-100/60 sm:text-base md:mx-0">
                        Зарегистрируйте свою команду и станьте частью ChipaGame.
                        Впереди вас ждёт нечто интересное.
                    </p>

                    <div className="mt-7 flex items-center justify-center gap-3 md:justify-start">
                        <div className="h-px w-12 bg-[#55A4FE]/60" />
                        <span className="text-xs font-medium uppercase tracking-[0.2em] text-blue-100/40">
                            Your experience starts here
                        </span>
                    </div>
                </section>

                {/* Карточка регистрации */}
                <section className="order-1 w-full max-w-[460px] justify-self-center md:order-2 md:justify-self-end">
                    <div className="rounded-3xl border border-white/10 bg-[#071638]/75 p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-8">
                        {!isSuccess ? (
                            <>
                                <div className="mb-6">
                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#55A4FE]">
                                        Регистрация
                                    </p>

                                    <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                                        Зарегистрировать команду
                                    </h2>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor="teamName"
                                            className="mb-1.5 block text-sm font-semibold text-white/90"
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
                                            className="w-full rounded-xl border border-white/10 bg-[#030B2B]/80 px-4 py-3 text-base text-white outline-none transition-all placeholder:text-white/30 focus:border-[#55A4FE] focus:ring-2 focus:ring-[#55A4FE]/15"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="captainPhone"
                                            className="mb-1.5 block text-sm font-semibold text-white/90"
                                        >
                                            Номер телефона капитана
                                        </label>

                                        <input
                                            id="captainPhone"
                                            name="captainPhone"
                                            type="tel"
                                            placeholder="+7 (900) 000-00-00"
                                            autoComplete="tel"
                                            inputMode="tel"
                                            required
                                            minLength={7}
                                            maxLength={20}
                                            pattern="[0-9+() -]{7,20}"
                                            title="Введите корректный номер телефона"
                                            className="w-full rounded-xl border border-white/10 bg-[#030B2B]/80 px-4 py-3 text-base text-white outline-none transition-all placeholder:text-white/30 focus:border-[#55A4FE] focus:ring-2 focus:ring-[#55A4FE]/15"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="mb-1.5 block text-sm font-semibold text-white/90"
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
                                            className="w-full rounded-xl border border-white/10 bg-[#030B2B]/80 px-4 py-3 text-base text-white outline-none transition-all placeholder:text-white/30 focus:border-[#55A4FE] focus:ring-2 focus:ring-[#55A4FE]/15"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="mb-1.5 block text-sm font-semibold text-white/90"
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
                                                className="w-full rounded-xl border border-white/10 bg-[#030B2B]/80 px-4 py-3 pr-20 text-base text-white outline-none transition-all placeholder:text-white/30 focus:border-[#55A4FE] focus:ring-2 focus:ring-[#55A4FE]/15"
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

                                    {message && (
                                        <div
                                            role="alert"
                                            className="rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-xs leading-relaxed text-red-200"
                                        >
                                            {message}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="group flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#55A4FE] px-5 py-3.5 font-bold text-[#000C3A] shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:bg-[#78B7FF] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
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
                                </form>

                                <div className="mt-5 border-t border-white/10 pt-5">
                                    <ContactButton />
                                </div>
                            </>
                        ) : (
                            <>
                                <div
                                    role="status"
                                    aria-live="polite"
                                    className="flex flex-col items-center py-6 text-center sm:py-10"
                                >
                                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-green-400/20 bg-green-400/10">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="32"
                                            height="32"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#4ADE80"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M20 6 9 17l-5-5" />
                                        </svg>
                                    </div>

                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#55A4FE]">
                                        CHIPAGAME
                                    </p>

                                    <h2 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">
                                        Спасибо за регистрацию!
                                    </h2>

                                    <p className="mt-4 text-sm leading-relaxed text-blue-100/60">
                                        Ваша команда успешно зарегистрирована.
                                        Благодарим за участие в ChipaGame!
                                    </p>

                                    <div className="mt-6 w-full rounded-xl border border-[#55A4FE]/20 bg-[#55A4FE]/5 p-4">
                                        <p className="text-sm font-semibold text-white">
                                            Следите за электронной почтой
                                        </p>

                                        <p className="mt-2 text-xs leading-relaxed text-blue-100/50">
                                            Мы отправим уведомление с дальнейшей информацией
                                            на указанный вами адрес.
                                        </p>
                                    </div>
                                </div>

                                <div className="border-t border-white/10 pt-5">
                                    <ContactButton />
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}
