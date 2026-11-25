import React from "react";

export type TaskInput = {
  id: string;
  placeholder: string;
  correctAnswer: string;
};

export type ZoneTask = {
  title: string;
  description: React.ReactNode;
  inputs: TaskInput[];
};

export const tasks: Record<number, ZoneTask> = {
  1: {
    title: "Испытание Водяного Стража",
    description: (
      <div className="space-y-6 text-base text-white/90 leading-relaxed">
        <p className="italic text-[#69caff] text-lg border-l-4 border-[#69caff]/40 pl-4 py-2 bg-white/5 rounded-r-lg">
          Страж проскрипел: «Руна ваша, если разберётесь в моих шестерёнках: они считают только нулями и единицами. Каждые восемь цифр — одна латинская буква».
        </p>
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg mb-2">а) Расшифруйте сообщение (кодировка ASCII): <span className="font-mono text-[#69caff]">01000011 01001000 01001001 01010000 01000001</span></p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg mb-2">б) Сколько бит в файле размером 2 Кбайт?</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg mb-2">в) Запишите число 89 в двоичной системе счисления.</p>
          </div>
        </div>
      </div>
    ),
    inputs: [
      { id: "a", placeholder: "Ответ на пункт а", correctAnswer: "CHIPA" },
      { id: "b", placeholder: "Ответ на пункт б", correctAnswer: "16384" },
      { id: "c", placeholder: "Ответ на пункт в", correctAnswer: "1011001" },
    ],
  },
  2: {
    title: "Испытание Каменного Голема",
    description: (
      <div className="space-y-6 text-base text-white/90 leading-relaxed">
        <p className="italic text-[#69caff] text-lg border-l-4 border-[#69caff]/40 pl-4 py-2 bg-white/5 rounded-r-lg">
          Голем загудел: «Моей рукой двигают команды: U — вверх на 1 клетку, D — вниз, L — влево, R — вправо. Рука начинает в точке (0, 0): первое число — сдвиг вправо, второе — вверх».
        </p>
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg mb-2">а) Эхо добавило в последовательность <span className="font-mono text-[#69caff]">RRLLURLRL</span> одну лишнюю команду, и рука не вернулась в начало. Какую команду нужно убрать?</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg mb-2">б) В какой точке окажется рука после команд <span className="font-mono text-[#69caff]">UUURRDLL</span>?</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg mb-2">в) Последовательность <span className="font-mono text-[#69caff]">URDL</span> повторяется без остановки. В какой точке окажется рука после 10 команд подряд?</p>
          </div>
        </div>
      </div>
    ),
    inputs: [
      { id: "a", placeholder: "Ответ на пункт а", correctAnswer: "U4" },
      { id: "b", placeholder: "Ответ на пункт б (x y)", correctAnswer: "0 2" },
      { id: "c", placeholder: "Ответ на пункт в (x y)", correctAnswer: "1 1" },
    ],
  },
  3: {
    title: "Испытание Трясинного Духа",
    description: (
      <div className="space-y-6 text-base text-white/90 leading-relaxed">
        <p className="italic text-[#69caff] text-lg border-l-4 border-[#69caff]/40 pl-4 py-2 bg-white/5 rounded-r-lg">
          Дух пропел: «Выход закрыт кодом. Ответьте на три мои вопроса — и я перестану водить вас кругами».
        </p>
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg mb-2">а) Я загадал число от 1 до 100. Вы задаёте вопросы вида «Оно больше, чем X?», я отвечаю «да» или «нет». Какое наименьшее число вопросов гарантированно хватит, чтобы угадать число?</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg mb-2">б) Сколько существует трёхзначных кодов из цифр 0–9, в которых все три цифры разные? (Код может начинаться с нуля.)</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg mb-2">в) Дух загадал трёхзначный код и ответил на пять попыток. Какой код загадан? Запишите три цифры подряд.</p>
            <div className="mt-3 rounded-xl border border-[#69caff]/30 bg-[#69caff]/5 p-4 overflow-x-auto">
              <table className="w-full text-left text-base">
                <thead>
                  <tr className="border-b border-[#69caff]/30 text-[#69caff]">
                    <th className="pb-3 font-semibold">Попытка</th>
                    <th className="pb-3 font-semibold">Ответ духа</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#69caff]/20">
                  <tr><td className="py-3 font-mono text-[#69caff]">123</td><td className="py-3 text-white/90">одна цифра на своём месте, ещё одна есть, но не там</td></tr>
                  <tr><td className="py-3 font-mono text-[#69caff]">456</td><td className="py-3 text-white/90">ни одной совпадающей цифры</td></tr>
                  <tr><td className="py-3 font-mono text-[#69caff]">178</td><td className="py-3 text-white/90">одна цифра на своём месте, остальных нет</td></tr>
                  <tr><td className="py-3 font-mono text-[#69caff]">023</td><td className="py-3 text-white/90">две цифры есть, но обе не на своих местах</td></tr>
                  <tr><td className="py-3 font-mono text-[#69caff]">120</td><td className="py-3 text-white/90">две цифры на своих местах</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    ),
    inputs: [
      { id: "a", placeholder: "Ответ на пункт а", correctAnswer: "7" },
      { id: "b", placeholder: "Ответ на пункт б", correctAnswer: "720" },
      { id: "c", placeholder: "Ответ на пункт в", correctAnswer: "130" },
    ],
  },
  4: {
    title: "Испытание Песчаного Скорпиона",
    description: (
      <div className="space-y-6 text-base text-white/90 leading-relaxed">
        <p className="italic text-[#69caff] text-lg border-l-4 border-[#69caff]/40 pl-4 py-2 bg-white/5 rounded-r-lg">
          Скорпион проскрежетал: «Мой хвост — цепочка из звеньев, и каждое звено считается в своей системе счисления».
        </p>
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg mb-2">а) Переведите число <span className="font-mono text-[#69caff]">101101₂</span> в десятичную систему.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg mb-2">б) Переведите число <span className="font-mono text-[#69caff]">125</span> в двоичную систему.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg mb-2">в) Вычислите значение выражения. Все действия выполняйте в десятичной системе, ответ запишите числом:</p>
            <p className="font-mono text-[#69caff] text-base bg-black/20 p-3 rounded-lg mb-2 border border-white/10 text-center">((10101₂ − 1101₂) · (24₈ + 1A₁₆)) / 100₂</p>
          </div>
        </div>
      </div>
    ),
    inputs: [
      { id: "a", placeholder: "Ответ на пункт а", correctAnswer: "45" },
      { id: "b", placeholder: "Ответ на пункт б", correctAnswer: "1111101" },
      { id: "c", placeholder: "Ответ на пункт в", correctAnswer: "92" },
    ],
  },
  5: {
    title: "Испытание Хранителя Времени",
    description: (
      <div className="space-y-6 text-base text-white/90 leading-relaxed">
        <p className="italic text-[#69caff] text-lg border-l-4 border-[#69caff]/40 pl-4 py-2 bg-white/5 rounded-r-lg">
          Хранитель загудел: «Время идёт по кругу, а числа в моих часах — по правилам. Найдите правила, и время будет на вашей стороне».
        </p>
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg mb-2">а) Какое число продолжит ряд: <span className="font-mono text-[#69caff]">1, 1, 2, 3, 5, 8, ?</span></p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg mb-2">б) Хранитель показал пары: <span className="font-mono text-[#69caff]">2 → 6, 3 → 12, 4 → 20, 5 → 30</span>. Что получится из числа 6?</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg mb-2">в) Какое число продолжит ряд: <span className="font-mono text-[#69caff]">1, 1, 1, 2, 2, 3, 4, 5, 7, ?</span></p>
          </div>
        </div>
      </div>
    ),
    inputs: [
      { id: "a", placeholder: "Ответ на пункт а", correctAnswer: "13" },
      { id: "b", placeholder: "Ответ на пункт б", correctAnswer: "42" },
      { id: "c", placeholder: "Ответ на пункт в", correctAnswer: "9" },
    ],
  },
};