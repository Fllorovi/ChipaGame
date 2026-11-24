
"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type RatingTeam = {
    teamId: string;
    teamName: string;
    correctAnswers: number;
    totalQuestions: number;
    place: number;
};

const particles = [
    { x: "8%", y: "18%", size: 3, duration: "9s", delay: "-2s" },
    { x: "17%", y: "72%", size: 5, duration: "12s", delay: "-7s" },
    { x: "26%", y: "38%", size: 2, duration: "8s", delay: "-3s" },
    { x: "35%", y: "85%", size: 4, duration: "11s", delay: "-5s" },
    { x: "43%", y: "15%", size: 3, duration: "10s", delay: "-1s" },
    { x: "52%", y: "58%", size: 5, duration: "13s", delay: "-8s" },
    { x: "61%", y: "28%", size: 2, duration: "9s", delay: "-4s" },
    { x: "70%", y: "78%", size: 4, duration: "12s", delay: "-6s" },
    { x: "78%", y: "12%", size: 3, duration: "10s", delay: "-2s" },
    { x: "86%", y: "48%", size: 5, duration: "14s", delay: "-9s" },
    { x: "93%", y: "82%", size: 2, duration: "8s", delay: "-3s" },
    { x: "47%", y: "92%", size: 3, duration: "11s", delay: "-6s" },
];

export default function RatingPage() {
    const [rating, setRating] = useState<RatingTeam[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadRating() {
        try {
            setLoading(true);
            setError("");

            const response = await fetch("/api/rating");

            if (!response.ok) {
                throw new Error("Не удалось загрузить рейтинг");
            }

            const data = await response.json();

            setRating(data.rating);
        } catch {
            setError("Не удалось загрузить рейтинг. Попробуйте ещё раз.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadRating();
    }, []);

    const leaders = rating.filter((team) => team.place <= 3);

    const leaderStyles = [
        {
            height: "h-44",
            color: "from-[#55A4FE]/30 to-[#55A4FE]/5",
            border: "border-[#55A4FE]/50",
            medal: "text-[#ABD2FB]",
            position: "text-[#55A4FE]",
        },
        {
            height: "h-36",
            color: "from-slate-300/20 to-slate-300/5",
            border: "border-white/20",
            medal: "text-slate-300",
            position: "text-slate-300",
        },
        {
            height: "h-32",
            color: "from-orange-400/20 to-orange-400/5",
            border: "border-orange-300/30",
            medal: "text-orange-300",
            position: "text-orange-300",
        },
    ];

    return (
        <>
            <Header />

            <main className="overflow-hidden bg-[#000C3A] text-white">
                {/* Главный экран */}
                <section className="relative isolate overflow-hidden">
                    {/* Фоновые свечения */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#087BFF]/20 blur-[130px]"
                    />

                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-40 -left-40 h-[550px] w-[550px] rounded-full bg-[#55A4FE]/10 blur-[120px]"
                    />

                    {/* Частицы */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 overflow-hidden"
                    >
                        {particles.map((particle, index) => (
                            <span
                                key={index}
                                className="absolute rounded-full bg-[#55A4FE] shadow-[0_0_12px_#55A4FE]"
                                style={{
                                    left: particle.x,
                                    top: particle.y,
                                    width: particle.size,
                                    height: particle.size,
                                    animation: `particle-float ${particle.duration} ease-in-out ${particle.delay} infinite`,
                                }}
                            />
                        ))}
                    </div>

                    <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-20">
                        {/* Заголовок */}
                        <div className="mx-auto max-w-3xl text-center">
                            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[#55A4FE]/30 bg-[#55A4FE]/10 px-5 py-2 text-sm font-medium text-[#ABD2FB] backdrop-blur-md">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-[#55A4FE]" />
                                CHALLENGE YOURSELF
                            </div>

                            <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
                                Рейтинг
                                <span className="block text-[#55A4FE]">
                                    команд
                                </span>
                            </h1>

                            <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg">
                                Каждый правильный ответ приближает команду
                                к победе. Следите за результатами и узнайте,
                                кто занимает лидирующие позиции в ChipaGame.
                            </p>

                            <div className="mt-9 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 backdrop-blur-md">
                                <span className="h-2 w-2 rounded-full bg-[#55A4FE]" />
                                <span className="text-sm text-blue-100/70">
                                    Первый раунд
                                </span>
                                <span className="h-4 w-px bg-white/20" />
                                <span className="text-sm font-bold text-white">
                                    5 заданий
                                </span>
                            </div>
                        </div>

                        {/* Разделитель */}
                        <div className="my-16 flex items-center gap-4">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#55A4FE]/30 to-transparent" />
                            <span className="text-xs tracking-[0.3em] text-[#ABD2FB]/40">
                                LEADERBOARD
                            </span>
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#55A4FE]/30 to-transparent" />
                        </div>

                        {/* Рейтинг */}
                        <section className="mx-auto max-w-5xl">
                            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#55A4FE]">
                                        Турнирная таблица
                                    </p>
                                    <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                                        Положение команд
                                    </h2>
                                </div>

                                <button
                                    onClick={loadRating}
                                    disabled={loading}
                                    className="group flex items-center gap-3 rounded-xl border border-[#55A4FE]/40 bg-[#55A4FE]/10 px-5 py-3 text-sm font-bold text-[#ABD2FB] transition hover:-translate-y-1 hover:bg-[#55A4FE]/20 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <span className={loading ? "animate-spin" : ""}>
                                        ↻
                                    </span>
                                    Обновить рейтинг
                                </button>
                            </div>

                            {loading ? (
                                <div className="rounded-3xl border border-white/10 bg-white/[0.04] py-24 text-center backdrop-blur-md">
                                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#55A4FE]/20 border-t-[#55A4FE]" />
                                    <p className="mt-6 text-blue-100/60">
                                        Загружаем результаты команд...
                                    </p>
                                </div>
                            ) : error ? (
                                <div className="rounded-3xl border border-red-400/20 bg-red-400/5 px-6 py-20 text-center">
                                    <p className="text-lg font-bold text-red-200">
                                        Не удалось загрузить рейтинг
                                    </p>
                                    <p className="mt-3 text-sm text-blue-100/60">
                                        {error}
                                    </p>
                                    <button
                                        onClick={loadRating}
                                        className="mt-6 rounded-xl bg-[#55A4FE] px-6 py-3 font-bold text-[#000C3A] transition hover:bg-[#78B7FF]"
                                    >
                                        Повторить
                                    </button>
                                </div>
                            ) : rating.length === 0 ? (
                                <div className="rounded-3xl border border-white/10 bg-white/[0.04] py-24 text-center">
                                    <p className="text-xl font-bold">
                                        Пока нет зарегистрированных команд
                                    </p>
                                    <p className="mt-3 text-blue-100/60">
                                        Рейтинг появится после регистрации участников.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    {/* Тройка лидеров */}
                                    {leaders.length > 0 && (
                                        <div className="mb-12 grid grid-cols-3 items-end gap-3 sm:gap-6">
                                            {[leaders[1], leaders[0], leaders[2]].map(
                                                (team) => {
                                                    if (!team) return null;

                                                    const style =
                                                        leaderStyles[team.place - 1];

                                                    return (
                                                        <article
                                                            key={team.teamId}
                                                            className={`relative flex min-w-0 flex-col items-center justify-end rounded-2xl border bg-gradient-to-b ${style.color} ${style.border} ${style.height} px-2 pb-5 pt-5 text-center shadow-[0_10px_40px_rgba(0,0,0,0.15)] backdrop-blur-md sm:rounded-3xl sm:px-5`}
                                                        >
                                                            <span
                                                                className={`mb-3 text-2xl font-black sm:text-4xl ${style.medal}`}
                                                            >
                                                                {team.place === 1 ? "★" : team.place === 2 ? "◆" : "✦"}
                                                            </span>

                                                            <p
                                                                className={`mb-2 text-xs font-bold uppercase tracking-widest sm:text-sm ${style.position}`}
                                                            >
                                                                {team.place} место
                                                            </p>

                                                            <h3 className="w-full break-words text-sm font-extrabold text-white sm:text-lg">
                                                                {team.teamName}
                                                            </h3>

                                                            <p className="mt-3 text-lg font-black text-white sm:text-2xl">
                                                                {team.correctAnswers}/{team.totalQuestions}
                                                            </p>

                                                            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                                                                <div
                                                                    className="h-full rounded-full bg-[#55A4FE]"
                                                                    style={{
                                                                        width: `${(team.correctAnswers /
                                                                                team.totalQuestions) *
                                                                            100
                                                                            }%`,
                                                                    }}
                                                                />
                                                            </div>
                                                        </article>
                                                    );
                                                }
                                            )}
                                        </div>
                                    )}

                                    {/* Полный список */}
                                    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#030822]/70 shadow-2xl shadow-black/20 backdrop-blur-xl">
                                        <div className="grid grid-cols-[55px_minmax(0,1fr)_75px] items-center gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-4 text-xs font-bold uppercase tracking-wider text-[#ABD2FB]/60 sm:grid-cols-[80px_minmax(0,1fr)_120px] sm:px-7">
                                            <span>Место</span>
                                            <span>Команда</span>
                                            <span className="text-right">Баллы</span>
                                        </div>

                                        <div className="divide-y divide-white/[0.07]">
                                            {rating.map((team) => (
                                                <article
                                                    key={team.teamId}
                                                    className="grid grid-cols-[55px_minmax(0,1fr)_75px] items-center gap-3 px-4 py-5 transition hover:bg-[#55A4FE]/[0.06] sm:grid-cols-[80px_minmax(0,1fr)_120px] sm:px-7"
                                                >
                                                    <div>
                                                        <span
                                                            className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black ${team.place === 1
                                                                    ? "bg-[#55A4FE]/20 text-[#55A4FE]"
                                                                    : "bg-white/[0.06] text-blue-100/70"
                                                                }`}
                                                        >
                                                            {team.place}
                                                        </span>
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="truncate font-bold text-white sm:text-lg">
                                                            {team.teamName}
                                                        </p>
                                                        <p className="mt-1 text-xs text-blue-100/40 sm:text-sm">
                                                            Результат первого раунда
                                                        </p>
                                                    </div>

                                                    <div className="text-right">
                                                        <p className="text-lg font-black text-[#ABD2FB] sm:text-xl">
                                                            {team.correctAnswers}
                                                            <span className="text-sm font-medium text-blue-100/40">
                                                                /{team.totalQuestions}
                                                            </span>
                                                        </p>
                                                        <p className="text-xs text-blue-100/40">
                                                            баллов
                                                        </p>
                                                    </div>
                                                </article>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-blue-100/40">
                                        <p>
                                            Всего команд: {rating.length}
                                        </p>
                                        <p>
                                            При равном результате команды делят место
                                        </p>
                                    </div>
                                </>
                            )}
                        </section>
                    </div>

                    {/* Нижний разделитель */}
                    <div className="relative z-10 mx-auto flex max-w-7xl items-center gap-4 px-6 pb-8">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#55A4FE]/30 to-transparent" />
                        <span className="text-xs tracking-[0.3em] text-[#ABD2FB]/40">
                            CHALLENGE YOURSELF
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#55A4FE]/30 to-transparent" />
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
