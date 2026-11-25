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

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pb-8 bg-black/70 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-4xl rounded-2xl border-2 border-[#55A4FE]/40 bg-[#03172c]/95 p-8 shadow-2xl shadow-[#55A4FE]/20 relative">
        <div className="absolute -top-16 left-8 flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0a2342] to-[#10295A] text-6xl shadow-xl border-4 border-[#03172c]">
          {dialogues[dialogueIndex]?.avatar || "👤"}
        </div>

        <div className="mt-6">
          <div className="mb-2 inline-block rounded-md bg-[#55A4FE]/20 px-3 py-1">
            <p className="text-sm font-black uppercase tracking-widest text-[#69caff]">
              {dialogues[dialogueIndex]?.speaker || "Неизвестно"}
            </p>
          </div>
          <p className="text-xl leading-relaxed text-white/90 min-h-[100px]">
            {dialogues[dialogueIndex]?.text || "..."}
          </p>
        </div>

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
  );
}