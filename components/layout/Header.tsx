"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface HeaderProps {
    actionLabel?: string;
    actionHref?: string;
}

const contactHref =
    "https://mail.google.com/mail/?view=cm&fs=1&to=lukianovalexandr2%40mail.ru&su=Обращение%20по%20ChipaGame";

export default function Header({
    actionLabel = "Стать участником",
    actionHref = "/register",
}: HeaderProps) {
    const router = useRouter();
    const profileMenuRef = useRef<HTMLDivElement>(null);

    const [teamName, setTeamName] = useState<string | null>(null);
    const [isChecking, setIsChecking] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        const supabase = createClient();
        let active = true;
        let requestId = 0;

        async function loadTeam(userId: string) {
            const currentRequest = ++requestId;

            const [teamResult, profileResult] = await Promise.all([
                supabase
                    .from("teams")
                    .select("name")
                    .eq("id", userId)
                    .maybeSingle(),

                supabase
                    .from("profiles")
                    .select("role")
                    .eq("id", userId)
                    .maybeSingle(),
            ]);

            if (!active || currentRequest !== requestId) return;

            const admin = profileResult.data?.role === "admin";

            if (profileResult.error) {
                console.error("Profile loading error:", profileResult.error);
            }

            setIsAdmin(admin);

            if (teamResult.error) {
                console.error("Team loading error:", teamResult.error);
                setTeamName(null);
            } else if (teamResult.data) {
                setTeamName(teamResult.data.name);
            } else {
                if (!admin) {
                    console.error("Team not found for user:", userId);
                }

                setTeamName(null);
            }

            setIsChecking(false);
        }

        async function checkSession() {
            const { data, error } = await supabase.auth.getSession();

            if (!active) return;

            if (error || !data.session) {
                setTeamName(null);
                setIsAdmin(false);
                setIsChecking(false);
                return;
            }

            await loadTeam(data.session.user.id);
        }

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_OUT" || !session) {
                requestId++;
                setTeamName(null);
                setIsAdmin(false);
                setIsChecking(false);
                setIsProfileMenuOpen(false);
                return;
            }

            if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
                setIsChecking(true);

                setTimeout(() => {
                    if (active) {
                        void loadTeam(session.user.id);
                    }
                }, 0);
            }
        });

        void checkSession();

        return () => {
            active = false;
            requestId++;
            subscription.unsubscribe();
        };
    }, []);

    // Закрытие меню при клике вне него или нажатии Escape
    useEffect(() => {
        function handleOutsideClick(event: MouseEvent) {
            if (
                profileMenuRef.current &&
                !profileMenuRef.current.contains(event.target as Node)
            ) {
                setIsProfileMenuOpen(false);
            }
        }

        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsProfileMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    async function handleLogout() {
        if (isLoggingOut) return;

        setIsLoggingOut(true);

        const supabase = createClient();
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Logout error:", error);
            setIsLoggingOut(false);
            return;
        }

        setIsProfileMenuOpen(false);
        router.replace("/login");
        router.refresh();
    }

    const profileLabel = teamName || (isAdmin ? "Администратор" : "");

    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#55A4FE]/30 bg-[#030822] text-white shadow-[0_4px_20px_rgba(0,12,58,0.25)]">
            <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
                <Link
                    href="/"
                    className="shrink-0 text-2xl font-black tracking-tight transition-opacity hover:opacity-75"
                >
                    Chipa<span className="text-[#55A4FE]">Game</span>
                </Link>

                <nav className="hidden items-center gap-10 md:flex">
                    <Link
                        href="/#about"
                        className="text-sm font-semibold text-white/75 transition-colors hover:text-[#55A4FE]"
                    >
                        Об игре
                    </Link>

                    <Link
                        href="/rating"
                        className="text-sm font-semibold text-white/75 transition-colors hover:text-[#55A4FE]"
                    >
                        Рейтинг
                    </Link>

                    {!isChecking && teamName && (
                        <Link
                            href="/lobby"
                            className="text-sm font-semibold text-white/75 transition-colors hover:text-[#55A4FE]"
                        >
                            Лобби
                        </Link>
                    )}

                    {!isChecking && isAdmin && (
                        <Link
                            href="/admin"
                            className="text-sm font-semibold text-white/75 transition-colors hover:text-[#55A4FE]"
                        >
                            Админ-панель
                        </Link>
                    )}
                    <a
                        href={contactHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-white/75 transition-colors hover:text-[#55A4FE]"
                    >
                        Связаться
                    </a>
                </nav>

                <div className="flex items-center gap-3">
                    {!isChecking && profileLabel ? (
                        <div ref={profileMenuRef} className="relative">
                            <button
                                type="button"
                                onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                                aria-expanded={isProfileMenuOpen}
                                aria-haspopup="true"
                                className="flex max-w-[220px] items-center gap-3 rounded-lg py-2 text-left transition-opacity hover:opacity-80 sm:max-w-none"
                            >
                                <span
                                    className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#39E875] shadow-[0_0_7px_#39E875,0_0_16px_rgba(57,232,117,0.65)]"
                                    aria-label="В сети"
                                    title="В сети"
                                />

                                <span
                                    className={`truncate text-sm font-bold sm:text-base ${
                                        teamName
                                            ? "text-[#FFE15A] [text-shadow:0_0_7px_rgba(255,225,90,0.65),0_0_16px_rgba(255,225,90,0.3)]"
                                            : "text-[#55A4FE]"
                                    }`}
                                >
                                    {profileLabel}
                                </span>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className={`h-4 w-4 shrink-0 text-white/50 transition-transform duration-200 ${
                                        isProfileMenuOpen ? "rotate-180" : ""
                                    }`}
                                >
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </button>

                            {isProfileMenuOpen && (
                                <div className="absolute right-0 top-[calc(100%+12px)] z-[60] w-48 overflow-hidden rounded-xl border border-[#55A4FE]/20 bg-[#07132F] p-2 shadow-2xl shadow-black/40">
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        disabled={isLoggingOut}
                                        className="w-full rounded-lg px-4 py-3 text-left text-sm font-semibold text-white/80 transition-colors hover:bg-[#55A4FE]/10 hover:text-[#55A4FE] disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {isLoggingOut ? "Выход..." : "Выйти"}
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        !isChecking && (
                            <Link
                                href={actionHref}
                                className="hidden rounded-xl bg-[#0084FF] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:bg-[#006FE0] sm:inline-flex"
                            >
                                {actionLabel}
                                <span className="ml-2">→</span>
                            </Link>
                        )
                    )}

                    <details className="relative md:hidden">
                        <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10">
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                aria-hidden="true"
                            >
                                <path d="M4 7h16M4 12h16M4 17h16" />
                            </svg>
                            <span className="sr-only">Открыть меню</span>
                        </summary>

                        <div className="absolute right-0 top-[calc(100%+14px)] z-50 w-64 rounded-2xl border border-white/10 bg-[#030822] p-3 shadow-2xl shadow-black/30">
                            <nav className="flex flex-col gap-1">
                                <Link
                                    href="/#about"
                                    className="rounded-xl px-4 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/5 hover:text-[#55A4FE]"
                                >
                                    Об игре
                                </Link>

                                <Link
                                    href="/rating"
                                    className="rounded-xl px-4 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/5 hover:text-[#55A4FE]"
                                >
                                    Рейтинг
                                </Link>

                                <a
                                    href={contactHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-xl px-4 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/5 hover:text-[#55A4FE]"
                                >
                                    Связаться с организаторами
                                </a>

                                {!isChecking && teamName && (
                                    <Link
                                        href="/lobby"
                                        className="rounded-xl px-4 py-3 text-sm font-semibold text-[#FFE15A] transition-colors hover:bg-white/5"
                                    >
                                        Игровое лобби
                                    </Link>
                                )}

                                {!isChecking && isAdmin && (
                                    <Link
                                        href="/admin"
                                        className="rounded-xl px-4 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/5 hover:text-[#55A4FE]"
                                    >
                                        Админ-панель
                                    </Link>
                                )}

                                {!isChecking && !teamName && !isAdmin && (
                                    <>
                                        <div className="my-2 h-px bg-white/10" />

                                        <Link
                                            href={actionHref}
                                            className="rounded-xl bg-[#0084FF] px-4 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[#006FE0]"
                                        >
                                            {actionLabel}
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </details>
                </div>
            </div>
        </header>
    );
}
