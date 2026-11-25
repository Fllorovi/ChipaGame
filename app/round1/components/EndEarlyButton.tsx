"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EndEarlyButton({ onConfirm }: { onConfirm: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleConfirm = () => {
    setIsOpen(false);
    onConfirm(); // сохраняем прогресс (если там есть логика сохранения)
    router.push("/rating"); // перебрасываем на рейтинг
  };

  return (
    <>
      {/* Сама кнопка в углу */}
      <button
        onClick={() => setIsOpen(true)}
        className="group absolute top-8 right-8 z-50 flex items-center gap-2 overflow-hidden rounded-xl border border-red-500/30 bg-black/40 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-red-200/80 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-red-500/60 hover:bg-red-950/60 hover:text-red-100 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
      >
        {/* Иконка выхода */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        Завершить
      </button>

      {/* Модальное окно подтверждения */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-red-500/30 bg-[#0a0e14] text-center text-white shadow-[0_0_50px_rgba(239,68,68,0.15)]">
            {/* Красная полоска сверху для акцента */}
            <div className="h-1 w-full bg-gradient-to-r from-red-600/50 via-red-500 to-red-600/50" />
            
            <div className="p-6">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-500 border border-red-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              
              <h3 className="mb-2 text-xl font-black text-white">Завершить раунд?</h3>
              <p className="mb-6 text-sm leading-relaxed text-white/60">
                Вы уверены, что хотите закончить игру досрочно? Оставшееся время не будет учтено, а текущий прогресс сохранится.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white/70 transition-all hover:bg-white/10 hover:text-white"
                >
                  Отмена
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5 hover:brightness-110"
                >
                  Завершить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}