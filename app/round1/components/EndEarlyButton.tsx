"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EndEarlyButton({ onConfirm }: { onConfirm: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleConfirm = () => {
    setIsOpen(false);
    onConfirm();
    router.push("/rating");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="end-early-btn"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="end-early-icon"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        Завершить
      </button>

      {isOpen && (
        <div className="end-early-modal-overlay">
          <div className="end-early-modal">
            <div className="end-early-modal-accent" />
            <div className="end-early-modal-body">
              <div className="end-early-modal-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              
              <h3 className="end-early-modal-title">Завершить раунд?</h3>
              <p className="end-early-modal-text">
                Вы уверены, что хотите закончить игру досрочно? Оставшееся время не будет учтено, а текущий прогресс сохранится.
              </p>
              
              <div className="end-early-modal-actions">
                <button
                  onClick={() => setIsOpen(false)}
                  className="end-early-btn-action end-early-btn-cancel"
                >
                  Отмена
                </button>
                <button
                  onClick={handleConfirm}
                  className="end-early-btn-action end-early-btn-confirm"
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