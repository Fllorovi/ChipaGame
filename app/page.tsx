
import Image from "next/image";
import Link from "next/link";

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

const features = [
  {
    number: "01",
    title: "Командная работа",
    description:
      "Объединитесь с другими участниками и откройте для себя возможности совместной работы.",
    icon: "✦",
  },
  {
    number: "02",
    title: "Новые впечатления",
    description:
      "Откройте для себя необычный формат взаимодействия, который не даст заскучать.",
    icon: "◈",
  },
  {
    number: "03",
    title: "Азарт соревнования",
    description:
      "Проверьте себя, проявите свои способности и узнайте, на что вы действительно способны.",
    icon: "★",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Шапка */}
      <header className="relative z-30 border-b border-white/10 bg-[#000C3A] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-black tracking-tight">
            Chipa<span className="text-[#55A4FE]">Game</span>
          </Link>

          <nav className="hidden items-center gap-10 text-sm font-medium text-white/75 md:flex">
            <a
              href="#about"
              className="transition-colors hover:text-[#55A4FE]"
            >
              Об игре
            </a>
            <a
              href="#rating"
              className="transition-colors hover:text-[#55A4FE]"
            >
              Рейтинг
            </a>
          </nav>

          <Link
            href="/register"
            className="rounded-xl bg-[#55A4FE] px-6 py-3 text-sm font-bold text-[#000C3A] shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:bg-[#78B7FF]"
          >
            Регистрация
          </Link>
        </div>
      </header>

      <main className="overflow-hidden">
        {/* Главный экран */}
        <section className="relative isolate overflow-hidden bg-[#000C3A] text-white">
          {/* Фоновые свечения */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-40 z-0 h-[600px] w-[600px] rounded-full bg-[#087BFF]/20 blur-[130px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-64 -left-40 z-0 h-[550px] w-[550px] rounded-full bg-[#55A4FE]/10 blur-[120px]"
          />

          {/* Летающие частицы */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
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

          {/* Основное содержимое */}
          <div className="relative z-10 mx-auto grid min-h-[650px] max-w-7xl grid-cols-2 items-center gap-16 px-6 py-24 max-md:grid-cols-1 max-md:gap-16">
            {/* Текстовая часть */}
            <div className="relative z-10 max-w-2xl">
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#55A4FE]/30 bg-[#55A4FE]/10 px-5 py-2 text-sm font-medium text-[#ABD2FB] backdrop-blur-md">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#55A4FE]" />
                Командная игра начинается здесь
              </div>

              <h1 className="text-5xl font-black leading-[1.12] tracking-tight md:text-7xl">
                Игра начинается
                <br />
                с вашей команды
                <span className="text-[#55A4FE]">.</span>
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-relaxed text-blue-100/70 md:text-xl">
                Соберите команду, проверьте свои знания и докажите,
                что именно вы достойны победы в ChipaGame.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Link
                  href="/register"
                  className="group flex items-center gap-3 rounded-xl bg-[#55A4FE] px-8 py-4 font-bold text-[#000C3A] shadow-xl shadow-blue-500/20 transition-all hover:-translate-y-1 hover:bg-[#78B7FF]"
                >
                  Стать участником
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <a
                  href="#about"
                  className="rounded-xl border border-white/20 px-8 py-4 font-semibold text-white/80 transition-all hover:border-[#55A4FE]/60 hover:bg-white/5 hover:text-white"
                >
                  Узнать об игре
                </a>
              </div>

              <div className="mt-14 flex items-center gap-8 border-t border-white/10 pt-8">
                <div>
                  <p className="text-2xl font-black text-white">01</p>
                  <p className="mt-1 text-xs text-blue-100/50">
                    Соберите команду
                  </p>
                </div>

                <div className="h-10 w-px bg-white/10" />

                <div>
                  <p className="text-2xl font-black text-white">02</p>
                  <p className="mt-1 text-xs text-blue-100/50">
                    Пройдите испытания
                  </p>
                </div>

                <div className="h-10 w-px bg-white/10" />

                <div>
                  <p className="text-2xl font-black text-white">03</p>
                  <p className="mt-1 text-xs text-blue-100/50">
                    Станьте победителями
                  </p>
                </div>
              </div>
            </div>

            {/* Область изображения */}
            <div className="relative z-10 mx-auto w-full max-w-xl -translate-y-16">
              {/* Декоративное свечение */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-8 z-0 rounded-full bg-[#087BFF]/20 blur-[100px]"
              />

              {/* Изображение */}
              <div className="relative z-10 aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04] shadow-2xl shadow-black/30">
                <Image
                  src="/images/main.jpg"
                  alt="Иллюстрация ChipaGame"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Декоративная рамка */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-3 z-0 rounded-[2rem] border border-[#55A4FE]/20"
              />
            </div>
          </div>

          {/* Нижний декоративный разделитель */}
          <div className="relative z-10 mx-auto flex max-w-7xl items-center gap-4 px-6 pb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#55A4FE]/30 to-transparent" />
            <span className="text-xs tracking-[0.3em] text-[#ABD2FB]/40">
              CHALLENGE YOURSELF
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#55A4FE]/30 to-transparent" />
          </div>
        </section>

        {/* Об игре */}
        <section
          id="about"
          className="relative bg-[#DCE9F6] px-6 py-28 text-[#000C3A]"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#0084FF]">
                О проекте
              </p>

              <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
                Больше, чем просто игра
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-[#4A4A4A]">
                ChipaGame — это возможность проверить свои знания,
                научиться работать сообща и получить удовольствие
                от настоящего командного соревнования.
              </p>
            </div>

            <div className="mt-16 grid gap-7 md:grid-cols-3">
              {features.map((feature) => (
                <article
                  key={feature.number}
                  className="group rounded-3xl border border-white/70 bg-white/70 p-8 shadow-[0_8px_30px_rgba(0,12,58,0.06)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-[0_16px_40px_rgba(0,12,58,0.12)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#000C3A] text-2xl text-[#55A4FE] transition-colors group-hover:bg-[#0084FF] group-hover:text-white">
                      {feature.icon}
                    </div>

                    <span className="text-sm font-bold tracking-widest text-[#0084FF]/50">
                      {feature.number}
                    </span>
                  </div>

                  <h3 className="mt-8 text-xl font-extrabold">
                    {feature.title}
                  </h3>

                  <p className="mt-4 leading-relaxed text-[#4A4A4A]">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
