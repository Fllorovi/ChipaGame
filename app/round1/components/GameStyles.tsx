"use client";

export default function GameStyles() {
  return (
    <style jsx global>{`
      * {
        box-sizing: border-box;
      }

      html,
      body {
        margin: 0;
        overflow: hidden;
        background: #03172c;
      }

      .island-map {
        position: fixed;
        inset: 0;
        overflow: hidden;
        isolation: isolate;
        color: white;
        background: #03172c;
        font-family: 'Inter', Arial, Helvetica, sans-serif;
      }

      /* ===== ОКЕАН И ФОН ===== */
      .ocean {
        position: absolute;
        inset: -10%;
        overflow: hidden;
        background:
          radial-gradient(ellipse at 40% 48%, #12647b 0%, transparent 45%),
          radial-gradient(ellipse at 15% 20%, #075078 0%, transparent 40%),
          linear-gradient(145deg, #031a36, #06466b 55%, #03182f);
      }

      .ocean-light {
        position: absolute;
        inset: 0;
        background: radial-gradient(ellipse at 40% 50%, transparent 15%, #00152a 95%);
      }

      .ocean-waves {
        position: absolute;
        inset: -50%;
        width: 200%;
        height: 200%;
        opacity: 0.2;
        background-image: repeating-radial-gradient(ellipse at 40% 50%, transparent 0 34px, rgba(117, 218, 242, 0.45) 35px, transparent 37px, transparent 65px);
        animation: ocean-drift 35s linear infinite;
      }

      .ocean-waves-two {
        opacity: 0.12;
        transform: rotate(35deg) scale(1.2);
        animation-duration: 48s;
        animation-direction: reverse;
      }

      .ocean-shimmer {
        position: absolute;
        inset: 0;
        opacity: 0.3;
        background-image: radial-gradient(ellipse, rgba(119, 223, 255, 0.8) 0 1px, transparent 2px);
        background-size: 95px 73px;
        animation: shimmer 7s ease-in-out infinite alternate;
      }

      /* ===== ФОТО-СТОПКА ОСТРОВА ===== */
      .island-stage {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }

      .island-photo-stack {
        position: absolute;
        inset: 0;
        z-index: 1;
        pointer-events: none;
      }

      /* 7% затемнение поверх всех фото */
      .island-photo-stack::after {
        content: '';
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.07);
        pointer-events: none;
        z-index: 2;
      }

      .island-photo,
      .island-photo-base {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        pointer-events: none;
        user-select: none;
        z-index: 0;
      }

      .island-photo:not(.island-photo-base) {
        animation: island-layer-fade 0.8s ease both;
        z-index: 1;
      }

      @keyframes island-layer-fade {
        from { opacity: 0; }
        to   { opacity: 1; }
      }

     
      /* ===== МАРКЕРЫ ЗОН — изометрические плиты-эллипсы ===== */
      .zone-marker {
        position: absolute;
        z-index: 5;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 0;
        border: 0;
        background: transparent;
        color: white;
        cursor: pointer;
        transform: translate(-50%, -50%);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* ЗАБЛОКИРОВАНО — тот же размер, что у остальных, но тусклее */
      .zone-marker-lock {
        width: 50px;
        height: 30px;
        background: rgba(8, 18, 32, 0.55);
        border: 1.5px solid rgba(170, 185, 200, 0.4);
        box-shadow: 0 0 10px 3px rgba(120, 140, 160, 0.15), 0 3px 8px rgba(0, 0, 0, 0.35);
        color: rgba(203, 213, 224, 0.6);
        opacity: 0.65;
      }
        /* у заблокированных ядро не рисуем — только тусклая плита */
      .zone-marker-locked .zone-marker-core {
        display: none;
      }
      .zone-marker-completed, .zone-marker-failed { cursor: default; }

      /* общая форма плиты: сплюснутый эллипс (шире, чем выше) — как на фото */
      .zone-marker-lock,
      .zone-marker-completed-icon,
      .zone-marker-failed-icon,
      .zone-marker-ring {
        position: relative;
        display: flex;
        width: 50px;
        height: 30px;
        align-items: center;
        justify-content: center;
        border-radius: 50%;            /* эллипс, а не круг */
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* тёмная подложка + светлый каменный бортик = контраст на ярком фоне */
      .zone-marker-lock {
        width: 44px;
        height: 26px;
        background: rgba(8, 18, 32, 0.72);
        border: 1.5px solid rgba(170, 185, 200, 0.55);
        box-shadow: 0 0 12px 4px rgba(120, 140, 160, 0.25), 0 3px 10px rgba(0, 0, 0, 0.45);
        color: rgba(203, 213, 224, 0.85);
      }

      .zone-marker-completed-icon {
        background: rgba(8, 22, 16, 0.74);
        border: 1.5px solid rgba(120, 230, 160, 0.75);
        box-shadow:
          0 0 14px 5px  rgba(56, 200, 120, 0.55),
          0 0 30px 12px rgba(56, 200, 120, 0.28),
          0 3px 10px rgba(0, 0, 0, 0.4);
        color: #b6ffcf;
        animation: completed-pulse 3.2s ease-in-out infinite;
      }
      @keyframes completed-pulse {
        0%, 100% {
          box-shadow:
            0 0 14px 5px  rgba(56, 200, 120, 0.55),
            0 0 30px 12px rgba(56, 200, 120, 0.28),
            0 3px 10px rgba(0, 0, 0, 0.4);
        }
        50% {
          box-shadow:
            0 0 18px 7px  rgba(56, 200, 120, 0.7),
            0 0 38px 16px rgba(56, 200, 120, 0.36),
            0 3px 10px rgba(0, 0, 0, 0.4);
        }
      }

      .zone-marker-failed-icon {
        background: rgba(26, 10, 10, 0.74);
        border: 1.5px solid rgba(255, 130, 130, 0.75);
        box-shadow:
          0 0 14px 5px  rgba(235, 70, 70, 0.55),
          0 0 30px 12px rgba(235, 70, 70, 0.28),
          0 3px 10px rgba(0, 0, 0, 0.4);
        color: #ffc4c4;
      }

      /* АКТИВНО: тёмная плита + светлый бортик + яркое голубое ядро + синий ореол */
      .zone-marker-ring {
        background: rgba(6, 16, 30, 0.7);
        border: 1.5px solid rgba(150, 210, 255, 0.8);
        box-shadow:
          0 0 16px 6px  rgba(56, 150, 255, 0.55),
          0 0 34px 14px rgba(56, 150, 255, 0.3),
          0 3px 10px rgba(0, 0, 0, 0.4);
        animation: active-glow 2.4s ease-in-out infinite;
      }
      @keyframes active-glow {
        0%, 100% {
          box-shadow:
            0 0 16px 6px  rgba(56, 150, 255, 0.55),
            0 0 34px 14px rgba(56, 150, 255, 0.3),
            0 3px 10px rgba(0, 0, 0, 0.4);
          transform: scale(1);
        }
        50% {
          box-shadow:
            0 0 22px 9px  rgba(56, 150, 255, 0.72),
            0 0 46px 20px rgba(56, 150, 255, 0.4),
            0 3px 10px rgba(0, 0, 0, 0.4);
          transform: scale(1.05);
        }
      }

      /* ядро активной зоны — тоже эллипс, яркое, светящееся */
      .zone-marker-core {
        width: 18px;
        height: 11px;
        border-radius: 50%;
        background: radial-gradient(circle, #eaf7ff 0%, #6cc4ff 55%, #2b7fd4 100%);
        box-shadow: 0 0 10px 3px rgba(150, 210, 255, 0.95), 0 0 22px 8px rgba(56, 150, 255, 0.55);
        animation: core-pulse 2.4s ease-in-out infinite;
      }
      @keyframes core-pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50%      { transform: scale(1.2); opacity: 0.9; }
      }

      .zone-marker:hover:not(:disabled):not(.zone-marker-locked):not(.zone-marker-completed):not(.zone-marker-failed) .zone-marker-ring {
        animation: none;
        transform: scale(1.12);
        box-shadow:
          0 0 24px 10px rgba(56, 150, 255, 0.8),
          0 0 50px 22px rgba(56, 150, 255, 0.42),
          0 3px 10px rgba(0, 0, 0, 0.4);
      }

      .zone-marker-label {
        max-width: 180px;
        padding: 6px 12px;
        border: 1px solid rgba(132, 202, 255, 0.32);
        border-radius: 8px;
        background: rgba(6, 16, 30, 0.82);
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-align: center;
        text-transform: uppercase;
        white-space: nowrap;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
        transition: all 0.3s ease;
      }
      .zone-marker-locked .zone-marker-label { opacity: 0.6; }
      .zone-marker-completed .zone-marker-label { border-color: rgba(120, 230, 160, 0.5); color: #b6ffcf; opacity: 1; }
      .zone-marker-failed .zone-marker-label { border-color: rgba(255, 130, 130, 0.5); color: #ffc4c4; opacity: 1; }
      .zone-marker:hover:not(:disabled):not(.zone-marker-locked):not(.zone-marker-completed):not(.zone-marker-failed) .zone-marker-label {
        border-color: rgba(66, 153, 225, 0.6);
        background: rgba(6, 16, 30, 0.94);
        transform: translateY(-2px);
      }

      /* ===== КНОПКА "ЗАВЕРШИТЬ" И МОДАЛКА ===== */
      .end-early-btn {
        position: absolute;
        top: 32px;
        right: 32px;
        z-index: 50;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        background: rgba(10, 15, 25, 0.6);
        border: 1px solid rgba(239, 68, 68, 0.3);
        border-radius: 12px;
        backdrop-filter: blur(12px);
        color: rgba(254, 202, 202, 0.8);
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      }
      .end-early-btn:hover {
        background: rgba(69, 10, 10, 0.5);
        border-color: rgba(239, 68, 68, 0.6);
        color: #fee2e2;
        box-shadow: 0 0 25px rgba(239, 68, 68, 0.3), 0 4px 20px rgba(0, 0, 0, 0.4);
        transform: translateY(-1px);
      }
      .end-early-icon {
        width: 16px;
        height: 16px;
        transition: transform 0.3s ease;
      }
      .end-early-btn:hover .end-early-icon {
        transform: translateX(-4px);
      }

      .end-early-modal-overlay {
        position: fixed;
        inset: 0;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.75);
        backdrop-filter: blur(8px);
        padding: 16px;
        animation: modal-fade-in 0.2s ease-out;
      }
      @keyframes modal-fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .end-early-modal {
        width: 100%;
        max-width: 400px;
        background: #0a0e14;
        border: 1px solid rgba(239, 68, 68, 0.2);
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(239, 68, 68, 0.1);
        color: white;
        text-align: center;
        animation: modal-slide-up 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      @keyframes modal-slide-up {
        from { opacity: 0; transform: translateY(20px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }

      .end-early-modal-accent {
        height: 3px;
        width: 100%;
        background: linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.8), transparent);
      }

      .end-early-modal-body {
        padding: 32px;
      }

      .end-early-modal-icon {
        width: 56px;
        height: 56px;
        margin: 0 auto 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.2);
        color: #ef4444;
      }

      .end-early-modal-title {
        font-size: 20px;
        font-weight: 800;
        margin: 0 0 8px 0;
        color: #ffffff;
      }

      .end-early-modal-text {
        font-size: 14px;
        line-height: 1.6;
        color: rgba(255, 255, 255, 0.6);
        margin: 0 0 24px 0;
      }

      .end-early-modal-actions {
        display: flex;
        gap: 12px;
      }

      .end-early-btn-action {
        flex: 1;
        padding: 12px 16px;
        border-radius: 10px;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s ease;
        border: none;
      }

      .end-early-btn-cancel {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.7);
      }
      .end-early-btn-cancel:hover {
        background: rgba(255, 255, 255, 0.1);
        color: white;
      }

      .end-early-btn-confirm {
        background: linear-gradient(135deg, #dc2626, #b91c1c);
        color: white;
        box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
      }
      .end-early-btn-confirm:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(220, 38, 38, 0.5);
        filter: brightness(1.1);
      }

      /* ===== ПРОЧЕЕ (ФУТЕР, ЭФФЕКТЫ) ===== */
      .map-footer {
        position: absolute;
        left: 38px;
        bottom: 38px;
        display: flex;
        flex-direction: column;
        gap: 7px;
        color: rgba(177, 218, 242, 0.4);
        font-size: 9px;
        font-weight: 700;
        letter-spacing: 0.15em;
        text-align: left;
        z-index: 10;
      }

      @keyframes ocean-drift {
        from { transform: rotate(0deg) translate3d(0, 0, 0); }
        to { transform: rotate(360deg) translate3d(0, 0, 0); }
      }
      @keyframes shimmer {
        from { opacity: 0.1; }
        to { opacity: 0.35; }
      }
      @keyframes island-rain-fall {
        from { transform: translateY(-30px); }
        to { transform: translateY(320px); }
      }
      .island-rain { animation: island-rain-fall 0.9s linear infinite; }

      @keyframes island-bolt-flash {
        0%, 100% { opacity: 0; }
        8% { opacity: 1; }
        18% { opacity: 0.1; }
        28% { opacity: 0.85; }
        40% { opacity: 0; }
      }
      .island-bolt { animation: island-bolt-flash 1.4s ease-out forwards; }

      @keyframes island-bolt-ambient-blink {
        0%, 92%, 100% { stroke-opacity: 0; }
        94% { stroke-opacity: 1; }
        96% { stroke-opacity: 0.15; }
        98% { stroke-opacity: 0.8; }
      }
      .island-bolt-ambient { animation: island-bolt-ambient-blink 7s ease-in-out infinite; }

      @keyframes island-surge-kf {
        0% { transform: translateY(0); }
        35% { transform: translateY(-12px); }
        70% { transform: translateY(4px); }
        100% { transform: translateY(0); }
      }
      .island-surge { animation: island-surge-kf 1.2s ease-out; }

      @keyframes island-sunray-kf {
        0% { opacity: 0; }
        25% { opacity: 1; }
        100% { opacity: 0; }
      }
      .island-sunray { animation: island-sunray-kf 1.5s ease-out forwards; }

      @keyframes island-react-kf {
        0% { transform: scale(1); filter: brightness(1); }
        25% { transform: scale(1.03); filter: brightness(1.3); }
        50% { transform: scale(0.98); filter: brightness(0.9); }
        75% { transform: scale(1.01); filter: brightness(1.1); }
        100% { transform: scale(1); filter: brightness(1); }
      }
      .island-react { animation: island-react-kf 0.8s ease-out; }

      /* ===== АДАПТИВ ===== */
      @media (max-width: 1100px) {
        .island-widget { transform: scale(0.72); transform-origin: bottom right; }
      }
      @media (max-width: 700px) {
        .zone-marker-ring,
        .zone-marker-completed-icon,
        .zone-marker-failed-icon { width: 40px; height: 24px; }
        .zone-marker-lock { width: 34px; height: 20px; }
        .zone-marker-core { width: 14px; height: 9px; }
        .zone-marker-label {
          max-width: 115px;
          overflow: hidden;
          font-size: 8px;
          text-overflow: ellipsis;
          padding: 5px 9px;
        }
        .map-footer { display: none; }
        .island-widget { transform: scale(0.6); }
        .end-early-btn { top: 16px; right: 16px; padding: 8px 14px; font-size: 10px; }
      }
      @media (prefers-reduced-motion: reduce) {
        .ocean-waves, .ocean-shimmer, .zone-marker-ring, .zone-marker-completed-icon, .zone-marker-core {
          animation: none;
        }
      }
    `}</style>
  );
}