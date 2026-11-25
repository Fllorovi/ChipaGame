"use client";

import type { Dialogue } from "../zones";

type Props = {
  dialogues: Dialogue[];
  dialogueIndex: number;
  dialoguePhase: "intro" | "post";
  answerStatus: "idle" | "wrong" | "correct";
  onNext: () => void;
};

export default function DialogueModal({
  dialogues,
  dialogueIndex,
  dialoguePhase,
  answerStatus,
  onNext,
}: Props) {
  const isLast = dialogueIndex === dialogues.length - 1;

  const buttonLabel = !isLast
    ? "Далее →"
    : dialoguePhase === "intro"
      ? "Слушать испытание →"
      : "К карте →";

  const avatar = dialogues[dialogueIndex]?.avatar;
  const speaker = dialogues[dialogueIndex]?.speaker || "Неизвестно";
  const text = dialogues[dialogueIndex]?.text || "...";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4">
      <div className="w-full max-w-5xl rounded-2xl border-2 border-[#55A4FE]/40 bg-[#03172c]/95 p-8 shadow-2xl shadow-[#55A4FE]/20 relative overflow-hidden">
        
        {/* Картинка персонажа слева в рамке */}
        <div className="absolute left-6 top-6 bottom-6 w-44 pointer-events-none">
          <div className="h-full w-full rounded-xl border-2 border-[#55A4FE]/50 bg-[#0a2342]/60 shadow-lg shadow-[#55A4FE]/20 overflow-hidden">
            {avatar ? (
              <img
                src={avatar}
                alt={speaker}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-6xl">
                👤
              </div>
            )}
          </div>
        </div>

        {/* Текст и футер — с отступом слева */}
        <div className="pl-52">
          <div className="mb-3 inline-block rounded-md bg-[#55A4FE]/20 px-3 py-1">
            <p className="text-sm font-black uppercase tracking-widest text-[#69caff]">
              {speaker}
            </p>
          </div>
          <p className="text-xl leading-relaxed text-white/90 min-h-[100px]">
            {text}
          </p>

          <div className="mt-6 flex justify-between items-center border-t border-white/10 pt-4">
            <span className="text-xs text-white/30">
              {dialoguePhase === "intro"
                ? "Вводная часть"
                : answerStatus === "correct"
                  ? "Успешное прохождение"
                  : "Провал испытания"}
            </span>
            <button
              onClick={onNext}
              className="rounded-xl bg-[#55A4FE] px-8 py-3 text-sm font-bold text-[#03172c] transition-colors hover:bg-white"
            >
              {buttonLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}