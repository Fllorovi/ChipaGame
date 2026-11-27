import React from "react";

export type TaskInput = {
  id: string;
  placeholder: string;
};

export type ZoneTask = {
  title: string;
  description: React.ReactNode;
  inputs: TaskInput[];
};

export const tasks: Record<number, ZoneTask> = {
  1: {
    title: "Испытание Стража-паразита",
    description: (
      <div className="space-y-6 text-base text-white/90 leading-relaxed">
        <p className="italic text-[#69caff] text-lg border-l-4 border-[#69caff]/40 pl-4 py-2 bg-white/5 rounded-r-lg">
          Паразит скрипит: «Я перегрыз провода, прямых путей почти не осталось. Узел ваш, если разберётесь в моей сети».
        </p>
        <p className="text-white/90">В таблице указана длина канала между узлами в метрах. Прочерк значит, что канала нет.</p>
        
        <div className="overflow-x-auto my-4 rounded-xl border border-white/10">
          <table className="w-full text-center text-base border-collapse">
            <thead>
              <tr className="bg-white/5 text-[#69caff]">
                <th className="border-b border-white/10 p-3 font-semibold"></th>
                <th className="border-b border-white/10 p-3 font-semibold">А</th>
                <th className="border-b border-white/10 p-3 font-semibold">Б</th>
                <th className="border-b border-white/10 p-3 font-semibold">В</th>
                <th className="border-b border-white/10 p-3 font-semibold">Г</th>
                <th className="border-b border-white/10 p-3 font-semibold">Д</th>
                <th className="border-b border-white/10 p-3 font-semibold">Е</th>
                <th className="border-b border-white/10 p-3 font-semibold">Ж</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr><td className="p-3 font-bold text-white">А</td><td className="p-3 text-white/50">–</td><td className="p-3">3</td><td className="p-3">5</td><td className="p-3">7</td><td className="p-3 text-white/50">–</td><td className="p-3 text-white/50">–</td><td className="p-3 text-white/50">–</td></tr>
              <tr><td className="p-3 font-bold text-white">Б</td><td className="p-3">3</td><td className="p-3 text-white/50">–</td><td className="p-3">1</td><td className="p-3 text-white/50">–</td><td className="p-3">6</td><td className="p-3 text-white/50">–</td><td className="p-3 text-white/50">–</td></tr>
              <tr><td className="p-3 font-bold text-white">В</td><td className="p-3">5</td><td className="p-3">1</td><td className="p-3 text-white/50">–</td><td className="p-3">2</td><td className="p-3">3</td><td className="p-3">5</td><td className="p-3 text-white/50">–</td></tr>
              <tr><td className="p-3 font-bold text-white">Г</td><td className="p-3">7</td><td className="p-3 text-white/50">–</td><td className="p-3">2</td><td className="p-3 text-white/50">–</td><td className="p-3 text-white/50">–</td><td className="p-3">4</td><td className="p-3">8</td></tr>
              <tr><td className="p-3 font-bold text-white">Д</td><td className="p-3 text-white/50">–</td><td className="p-3">6</td><td className="p-3">3</td><td className="p-3 text-white/50">–</td><td className="p-3 text-white/50">–</td><td className="p-3">1</td><td className="p-3">4</td></tr>
              <tr><td className="p-3 font-bold text-white">Е</td><td className="p-3 text-white/50">–</td><td className="p-3 text-white/50">–</td><td className="p-3">5</td><td className="p-3">4</td><td className="p-3">1</td><td className="p-3 text-white/50">–</td><td className="p-3">2</td></tr>
              <tr><td className="p-3 font-bold text-white">Ж</td><td className="p-3 text-white/50">–</td><td className="p-3 text-white/50">–</td><td className="p-3 text-white/50">–</td><td className="p-3">8</td><td className="p-3">4</td><td className="p-3">2</td><td className="p-3 text-white/50">–</td></tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg">а) Сколько всего каналов в сети?</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg">б) Найдите длину кратчайшего маршрута из А в Ж.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg">в) Канал В–Д перегорел. Какова теперь длина кратчайшего маршрута из А в Ж?</p>
          </div>
        </div>
      </div>
    ),
    inputs: [
      { id: "a", placeholder: "Ответ на пункт а" },
      { id: "b", placeholder: "Ответ на пункт б" },
      { id: "c", placeholder: "Ответ на пункт в" },
    ],
  },
  2: {
    title: "Испытание Стража-пружинника",
    description: (
      <div className="space-y-6 text-base text-white/90 leading-relaxed">
        <p className="italic text-[#69caff] text-lg border-l-4 border-[#69caff]/40 pl-4 py-2 bg-white/5 rounded-r-lg">
          Пружинник шипит: «На моей платформе мало свободных ячеек. Пружины разные: каждая занимает место и даёт силу. Выбирайте с умом».
        </p>
        
        <div className="overflow-x-auto my-4 rounded-xl border border-white/10">
          <table className="w-full text-center text-base border-collapse">
            <thead>
              <tr className="bg-white/5 text-[#69caff]">
                <th className="border-b border-white/10 p-3 font-semibold">Пружина</th>
                <th className="border-b border-white/10 p-3 font-semibold">Место (ячеек)</th>
                <th className="border-b border-white/10 p-3 font-semibold">Сила</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr><td className="p-3 font-mono text-[#69caff] font-bold">А</td><td className="p-3">2</td><td className="p-3">3</td></tr>
              <tr><td className="p-3 font-mono text-[#69caff] font-bold">Б</td><td className="p-3">3</td><td className="p-3">4</td></tr>
              <tr><td className="p-3 font-mono text-[#69caff] font-bold">В</td><td className="p-3">4</td><td className="p-3">5</td></tr>
              <tr><td className="p-3 font-mono text-[#69caff] font-bold">Г</td><td className="p-3">5</td><td className="p-3">6</td></tr>
              <tr><td className="p-3 font-mono text-[#69caff] font-bold">Д</td><td className="p-3">6</td><td className="p-3">7</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#69caff]/80 bg-[#69caff]/10 border border-[#69caff]/20 rounded-lg p-3">
          <span className="font-semibold">Примечание:</span> Каждую пружину можно взять не более одного раза.
        </p>

        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg">а) Сколькими способами можно выбрать ровно две пружины из пяти?</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg">б) На платформе 10 свободных ячеек. Какую наибольшую суммарную силу можно получить?</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg">в) Платформу расширили до 12 ячеек. Какую наибольшую суммарную силу можно получить теперь?</p>
          </div>
        </div>
      </div>
    ),
    inputs: [
      { id: "a", placeholder: "Ответ на пункт а" },
      { id: "b", placeholder: "Ответ на пункт б"},
      { id: "c", placeholder: "Ответ на пункт в" },
    ],
  },
  3: {
    title: "Испытание Стража-конвейерщика",
    description: (
      <div className="space-y-6 text-base text-white/90 leading-relaxed">
        <p className="italic text-[#69caff] text-lg border-l-4 border-[#69caff]/40 pl-4 py-2 bg-white/5 rounded-r-lg">
          Конвейерщик трещит: «Мои ленты передают груз одна другой. Лента с номером n работает так: если n больше 20, она выдаёт n; иначе умножает n на то, что выдаст лента n + 1».
        </p>
        <div className="bg-black/20 p-4 rounded-xl border border-white/10 font-mono text-[#69caff] text-center text-base mb-4">
          F(n) = n, при n &gt; 20<br/>
          F(n) = n · F(n + 1), при n ≤ 20
        </div>

        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg">а) Чему равно <span className="font-mono text-[#69caff]">F(20)</span>?</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg">б) Во сколько раз <span className="font-mono text-[#69caff]">F(18)</span> больше, чем <span className="font-mono text-[#69caff]">F(20)</span>?</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg">в) Границу сдвинули: теперь <span className="font-mono text-[#69caff]">F(n) = n</span> при <span className="font-mono text-[#69caff]">n &gt; 2026</span> и <span className="font-mono text-[#69caff]">F(n) = n · F(n + 1)</span> при <span className="font-mono text-[#69caff]">n ≤ 2026</span>. Найдите значение <span className="font-mono text-[#69caff]">F(2024) / F(2026)</span>.</p>
          </div>
        </div>
      </div>
    ),
    inputs: [
      { id: "a", placeholder: "Ответ на пункт а" },
      { id: "b", placeholder: "Ответ на пункт б" },
      { id: "c", placeholder: "Ответ на пункт в" },
    ],
  },
  4: {
    title: "Испытание Стража-зеркальщика",
    description: (
      <div className="space-y-6 text-base text-white/90 leading-relaxed">
        <p className="italic text-[#69caff] text-lg border-l-4 border-[#69caff]/40 pl-4 py-2 bg-white/5 rounded-r-lg">
          Зеркальщик звенит: «Мои зеркала всё переворачивают: правду в ложь, а ложь в правду. Разберитесь, где что».
        </p>

        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg">а) Найдите значение выражения <span className="font-mono text-[#69caff]">(1 ∨ 0) ∧ ¬(1 ∧ 0)</span>, где <span className="font-mono text-[#69caff]">1</span> — «истина», <span className="font-mono text-[#69caff]">0</span> — «ложь», <span className="font-mono text-[#69caff]">∨</span> — «или», <span className="font-mono text-[#69caff]">∧</span> — «и», <span className="font-mono text-[#69caff]">¬</span> — «не».</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg">б) Сколько существует наборов значений <span className="font-mono text-[#69caff]">(A, B, C)</span>, где каждая переменная равна 0 или 1, при которых выражение <span className="font-mono text-[#69caff]">¬A ∨ (B ∧ C)</span> истинно?</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg">в) Есть три зеркала: А, Б и В. Каждое либо всегда говорит правду, либо всегда лжёт.</p>
            <ul className="mt-3 space-y-2 text-white/90">
              <li>• Зеркало А: «Зеркало Б лжёт».</li>
              <li>• Зеркало Б: «Зеркало В лжёт».</li>
              <li>• Зеркало В: «Зеркала А и Б одного вида (оба правдивые или оба лживые)».</li>
            </ul>
            <p className="mt-3 font-semibold text-[#69caff]">Какое зеркало говорит правду? Ответ — одна буква.</p>
          </div>
        </div>
      </div>
    ),
    inputs: [
      { id: "a", placeholder: "Ответ на пункт а" },
      { id: "b", placeholder: "Ответ на пункт б" },
      { id: "c", placeholder: "Ответ на пункт в (буква)" },
    ],
  },
  5: {
    title: "Испытание Стража-клапанника",
    description: (
      <div className="space-y-6 text-base text-white/90 leading-relaxed">
        <p className="italic text-[#69caff] text-lg border-l-4 border-[#69caff]/40 pl-4 py-2 bg-white/5 rounded-r-lg">
          Клапанник шипит: «Пар идёт по трубам от входа S к выходу T. Каждая труба пропускает не больше, чем на ней написано».
        </p>

        <div className="overflow-x-auto my-4 rounded-xl border border-white/10">
          <table className="w-full text-left text-base border-collapse">
            <thead>
              <tr className="bg-white/5 text-[#69caff]">
                <th className="border-b border-white/10 p-3 font-semibold">Труба</th>
                <th className="border-b border-white/10 p-3 font-semibold">Пропускная способность</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr><td className="p-3 font-mono text-[#69caff]">S → A</td><td className="p-3">6</td></tr>
              <tr><td className="p-3 font-mono text-[#69caff]">S → B</td><td className="p-3">5</td></tr>
              <tr><td className="p-3 font-mono text-[#69caff]">A → C</td><td className="p-3">5</td></tr>
              <tr><td className="p-3 font-mono text-[#69caff]">A → D</td><td className="p-3">5</td></tr>
              <tr><td className="p-3 font-mono text-[#69caff]">B → D</td><td className="p-3">5</td></tr>
              <tr><td className="p-3 font-mono text-[#69caff]">B → E</td><td className="p-3">5</td></tr>
              <tr><td className="p-3 font-mono text-[#69caff]">C → T</td><td className="p-3">4</td></tr>
              <tr><td className="p-3 font-mono text-[#69caff]">D → T</td><td className="p-3">6</td></tr>
              <tr><td className="p-3 font-mono text-[#69caff]">E → T</td><td className="p-3">3</td></tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg">а) Сколько пара в секунду могут вместе пропустить трубы, входящие в T?</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg">б) Сколько пара в секунду могут вместе пропустить трубы, выходящие из S?</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <p className="font-bold text-white text-lg">в) Какое наибольшее количество пара в секунду можно пропустить от S к T?</p>
          </div>
        </div>
      </div>
    ),
    inputs: [
      { id: "a", placeholder: "Ответ на пункт а" },
      { id: "b", placeholder: "Ответ на пункт б"},
      { id: "c", placeholder: "Ответ на пункт в" },
    ],
  },
};