
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

const particles = Array.from({ length: 90 }, (_, index) => ({
    x: `${(index * 37 + 8) % 100}%`,
    y: `${(index * 61 + 13) % 100}%`,
    size: index % 7 === 0 ? 4 : index % 3 === 0 ? 3 : 2,
    duration: `${6 + ((index * 7) % 10)}s`,
    delay: `${-((index * 5) % 16)}s`,
    opacity: 0.25 + (index % 5) * 0.12,
}));

const leaderStyles = {
    1: {
        height: "h-64",
        color: "from-[#55A4FE]/30 to-[#55A4FE]/5",
        border: "border-[#55A4FE]/50",
        medal: "text-4xl sm:text-6xl text-[#ABD2FB]",
        position: "text-sm sm:text-base text-[#55A4FE]",
        name: "text-base sm:text-xl",
        score: "text-2xl sm:text-3xl",
        spacing: "mb-4",
    },
    2: {
        height: "h-44",
        color: "from-slate-300/20 to-slate-300/5",
        border: "border-white/20",
        medal: "text-2xl sm:text-4xl text-slate-300",
        position: "text-xs sm:text-sm text-slate-300",
        name: "text-sm sm:text-base",
        score: "text-lg sm:text-xl",
        spacing: "mb-2",
    },
    3: {
        height: "h-32",
        color: "from-orange-400/20 to-orange-400/5",
        border: "border-orange-300/30",
        medal: "text-xl sm:text-3xl text-orange-300",
        position: "text-[10px] sm:text-xs text-orange-300",
        name: "text-xs sm:text-sm",
        score: "text-base sm:text-lg",
        spacing: "mb-1",
    },
};

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

            setRating(data.rating ?? []);
        } catch {
            setError("Не удалось загрузить рейтинг. Попробуйте ещё раз.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadRating();
    }, []);

    // Проверяем, появились ли у команд набранные очки.
    const hasResults = rating.some(
        (team) => team.correctAnswers > 0
    );

    // Второе место слева, первое по центру, третье справа.
    const podiumTeams = [
        rating.find((team) => team.place === 2),
        rating.find((team) => team.place === 1),
        rating.find((team) => team.place === 3),
    ];

    return (
        <>
            <Header />

            <main className="relative min-h-screen overflow-hidden bg-[#000C3A] text-white">
                {/* Фоновые свечения */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#087BFF]/20 blur-[130px]"
                />

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-40 -left-40 h-[550px] w-[550px] rounded-full bg-[#55A4FE]/10 blur-[120px]"
                />

                {/* Анимация частиц */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 overflow-hidden"
                >
                    {particles.map((particle, index) => (
                        <span
                            key={index}
                            className="absolute rounded-full bg-[#ABD2FB] shadow-[0_0_12px_#55A4FE]"
                            style={{
                                left: particle.x,
                                top: particle.y,
                                width: particle.size,
                                height: particle.size,
                                opacity: particle.opacity,
                                animation: `particle-float ${particle.duration} ease-in-out ${particle.delay} infinite`,
                            }}
                        />
                    ))}
                </div>

                {/* Турнирная таблица */}
                <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
                    {/* Заголовок и обновление */}
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#55A4FE]">
                                ChipaGame
                            </p>

                            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                                Турнирная таблица
                            </h1>

                            <p className="mt-3 text-sm text-blue-100/50 sm:text-base">
                                Результаты команд по итогам игровых туров
                            </p>
                        </div>

                        <button
                            onClick={loadRating}
                            disabled={loading}
                            className="flex items-center gap-3 rounded-xl border border-[#55A4FE]/40 bg-[#55A4FE]/10 px-5 py-3 text-sm font-bold text-[#ABD2FB] transition hover:-translate-y-1 hover:bg-[#55A4FE]/20 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <span className={loading ? "animate-spin" : ""}>
                                ↻
                            </span>
                            Обновить
                        </button>
                    </div>

                    {/* Пьедестал лидеров */}
                    {!loading &&
                        !error &&
                        rating.length > 0 &&
                        hasResults && (
                            <div className="mb-12 grid grid-cols-3 items-end gap-3 sm:gap-6">
                                {podiumTeams.map((team, index) => {
                                    if (!team) {
                                        return (
                                            <div
                                                key={`empty-${index}`}
                                                aria-hidden="true"
                                            />
                                        );
                                    }

                                    const style =
                                        leaderStyles[
                                            team.place as keyof typeof leaderStyles
                                        ];

                                    if (!style) {
                                        return null;
                                    }

                                    return (
                                        <article
                                            key={team.teamId}
                                            className={`relative flex min-w-0 flex-col items-center justify-center overflow-hidden rounded-2xl border bg-gradient-to-b ${style.color} ${style.border} ${style.height} px-2 py-3 text-center shadow-[0_10px_40px_rgba(0,0,0,0.15)] backdrop-blur-md sm:rounded-3xl sm:px-5 sm:py-5`}
                                        >
                                            <span
                                                className={`block max-w-full leading-none font-black ${style.medal} ${style.spacing}`}
                                            >
                                                {team.place === 1
                                                    ? "★"
                                                    : team.place === 2
                                                      ? "◆"
                                                      : "✦"}
                                            </span>

                                            <p
                                                className={`mb-1 font-bold uppercase tracking-wider ${style.position}`}
                                            >
                                                {team.place} место
                                            </p>

                                            <h3
                                                className={`w-full break-words font-extrabold leading-tight text-white ${style.name}`}
                                            >
                                                {team.teamName}
                                            </h3>

                                            <p
                                                className={`mt-2 font-black leading-none text-white ${style.score}`}
                                            >
                                                {team.correctAnswers}/
                                                {team.totalQuestions}
                                            </p>
                                        </article>
                                    );
                                })}
                            </div>
                        )}

                    {/* Состояние загрузки */}
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
                            {/* Сообщение до начала игры */}
                            {!hasResults && (
                                <div className="mb-8 rounded-3xl border border-[#55A4FE]/20 bg-[#55A4FE]/[0.06] px-6 py-10 text-center backdrop-blur-md">
                                    <p className="text-xl font-bold text-white">
                                        Здесь появятся лидеры после первых
                                        набранных очков.
                                    </p>
                                </div>
                            )}

                            {/* Таблица */}
                            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#030822]/80 shadow-2xl shadow-black/20 backdrop-blur-xl">
                                <div className="overflow-x-auto">
                                    <div className="min-w-[620px]">
                                        {/* Заголовки колонок */}
                                        <div className="grid grid-cols-[75px_minmax(0,1fr)_130px_130px] items-center gap-4 border-b border-white/10 bg-white/[0.04] px-6 py-5 text-xs font-bold uppercase tracking-wider text-[#ABD2FB]/60 sm:px-8">
                                            <span>Место</span>
                                            <span>Команда</span>
                                            <span className="text-center">
                                                Первый тур
                                            </span>
                                            <span className="text-center">
                                                Второй тур
                                            </span>
                                        </div>

                                        {/* Команды */}
                                        <div className="divide-y divide-white/[0.07]">
                                            {rating.map((team, index) => {
                                                // До появления очков показываем обычную нумерацию.
                                                const displayPlace = hasResults
                                                    ? team.place
                                                    : index + 1;

                                                return (
                                                    <article
                                                        key={team.teamId}
                                                        className="grid grid-cols-[75px_minmax(0,1fr)_130px_130px] items-center gap-4 px-6 py-5 transition hover:bg-[#55A4FE]/[0.06] sm:px-8"
                                                    >
                                                        {/* Место */}
                                                        <div>
                                                            <span
                                                                className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black ${
                                                                    displayPlace === 1
                                                                        ? "border border-[#55A4FE]/40 bg-[#55A4FE]/20 text-[#55A4FE]"
                                                                        : displayPlace === 2
                                                                          ? "border border-white/20 bg-white/10 text-slate-200"
                                                                          : displayPlace === 3
                                                                            ? "border border-orange-300/30 bg-orange-400/10 text-orange-300"
                                                                            : "bg-white/[0.06] text-blue-100/70"
                                                                }`}
                                                            >
                                                                {displayPlace}
                                                            </span>
                                                        </div>

                                                        {/* Название команды */}
                                                        <div className="min-w-0">
                                                            <p className="truncate font-bold text-white sm:text-lg">
                                                                {team.teamName}
                                                            </p>
                                                        </div>

                                                        {/* Первый тур */}
                                                        <div className="text-center">
                                                            <p className="text-xl font-black text-[#ABD2FB]">
                                                                {team.correctAnswers}
                                                                <span className="text-sm font-medium text-blue-100/40">
                                                                    /
                                                                    {
                                                                        team.totalQuestions
                                                                    }
                                                                </span>
                                                            </p>

                                                            <p className="mt-1 text-xs text-blue-100/40">
                                                                баллов
                                                            </p>
                                                        </div>

                                                        {/* Второй тур */}
                                                        <div className="text-center">
                                                            <p className="text-xl font-bold text-blue-100/30">
                                                                —
                                                            </p>

                                                            <p className="mt-1 text-xs text-blue-100/30">
                                                                Ожидается
                                                            </p>
                                                        </div>
                                                    </article>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Информация под таблицей */}
                            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-blue-100/40">
                                <p>Всего команд: {rating.length}</p>

                                <p>
                                    Места определяются по результатам первого
                                    тура
                                </p>
                            </div>
                        </>
                    )}
                </section>
            </main>

            <Footer />
        </>
    );
}
