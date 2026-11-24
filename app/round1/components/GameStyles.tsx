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
        font-family: Arial, Helvetica, sans-serif;
      }

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

      @keyframes ocean-drift {
        from { transform: rotate(0deg) translate3d(0, 0, 0); }
        to { transform: rotate(360deg) translate3d(0, 0, 0); }
      }

      @keyframes shimmer {
        from { opacity: 0.1; }
        to { opacity: 0.35; }
      }

      @keyframes wave-move {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }

      @keyframes wind-blow {
        0% { transform: translateX(-24px); }
        100% { transform: translateX(24px); }
      }

      .reef {
        position: absolute;
        width: 200px;
        height: 80px;
        border: 2px solid rgba(76, 201, 220, 0.22);
        border-radius: 50%;
        transform: rotate(-25deg);
      }

      .reef-one { top: 15%; left: 4%; }
      .reef-two { right: 4%; top: 58%; transform: rotate(25deg); }
      .reef-three { bottom: 7%; left: 38%; transform: rotate(-10deg); }

      .island-stage {
        position: absolute;
        width: min(100vw, 150vh);
        aspect-ratio: 1200 / 760;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        filter: drop-shadow(0 25px 35px rgba(0, 0, 0, 0.4));
      }

      .island-art,
      .island-route {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }

      .island-route {
        pointer-events: none;
        filter: drop-shadow(0 0 7px #168fff);
      }

      .zone-marker {
        position: absolute;
        z-index: 5;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 0;
        border: 0;
        background: transparent;
        color: white;
        cursor: pointer;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease, filter 0.3s ease;
      }

      .zone-marker-locked { cursor: not-allowed; }
      .zone-marker-completed { cursor: default; }
      .zone-marker-failed { cursor: default; }

      .zone-marker-lock {
        display: flex;
        width: 38px;
        height: 38px;
        align-items: center;
        justify-content: center;
        border: 2px dashed rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        background: rgba(2, 18, 35, 0.6);
        color: rgba(255, 255, 255, 0.4);
        transition: all 0.25s ease;
      }

      .zone-marker-locked .zone-marker-label {
        opacity: 0.4;
        border-color: transparent;
        background: transparent;
      }

      .zone-marker-completed-icon {
        display: flex;
        width: 42px;
        height: 42px;
        align-items: center;
        justify-content: center;
        border: 2px solid #39E875;
        border-radius: 50%;
        background: rgba(57, 232, 117, 0.2);
        color: #39E875;
        box-shadow: 0 0 15px rgba(57, 232, 117, 0.4);
        transition: all 0.25s ease;
      }

      .zone-marker-completed .zone-marker-label {
        border-color: rgba(57, 232, 117, 0.5);
        color: #39E875;
        opacity: 1;
      }

      .zone-marker-failed-icon {
        display: flex;
        width: 42px;
        height: 42px;
        align-items: center;
        justify-content: center;
        border: 2px solid #FF4C4C;
        border-radius: 50%;
        background: rgba(255, 76, 76, 0.2);
        color: #FF4C4C;
        box-shadow: 0 0 15px rgba(255, 76, 76, 0.4);
        transition: all 0.25s ease;
      }

      .zone-marker-failed .zone-marker-label {
        border-color: rgba(255, 76, 76, 0.5);
        color: #FF4C4C;
        opacity: 1;
      }

      .zone-marker-ring {
        display: flex;
        width: 42px;
        height: 42px;
        align-items: center;
        justify-content: center;
        border: 2px solid rgba(136, 201, 232, 0.7);
        border-radius: 50%;
        background: rgba(5, 28, 49, 0.9);
        box-shadow: 0 0 0 5px rgba(30, 123, 177, 0.13), 0 0 18px rgba(30, 151, 255, 0.3);
        transition: all 0.25s ease;
      }

      .zone-marker:hover:not(:disabled) .zone-marker-ring {
        transform: scale(1.1);
        border-color: #65d5ff;
        box-shadow: 0 0 0 7px rgba(38, 158, 255, 0.16), 0 0 25px rgba(27, 160, 255, 0.8);
      }

      .zone-marker-core {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: #7abce9;
        box-shadow: 0 0 10px #35aaff;
      }

      .zone-marker-label {
        max-width: 160px;
        padding: 5px 9px;
        border: 1px solid rgba(132, 202, 255, 0.2);
        border-radius: 6px;
        background: rgba(2, 18, 35, 0.8);
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.07em;
        text-align: center;
        text-transform: uppercase;
        white-space: nowrap;
        opacity: 0.75;
        backdrop-filter: blur(8px);
      }

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

      @keyframes island-rain-fall {
        from { transform: translateY(-30px); }
        to { transform: translateY(320px); }
      }

      .island-rain {
        animation: island-rain-fall 0.9s linear infinite;
      }

      @keyframes island-bolt-flash {
        0%, 100% { opacity: 0; }
        8% { opacity: 1; }
        18% { opacity: 0.1; }
        28% { opacity: 0.85; }
        40% { opacity: 0; }
      }

      .island-bolt {
        animation: island-bolt-flash 1.4s ease-out forwards;
      }

      /*
        FIX: анимируем stroke-opacity, а НЕ opacity.
        Keyframes на opacity перебивали inline opacity={s.lightning}
        на том же <g>, из-за чего молнии мигали даже в штиль.
        stroke-opacity не конфликтует с inline opacity:
          - штиль  → inline opacity = 0  → молний нет;
          - шторм  → inline opacity > 0  → вспышки рисуются stroke-opacity.
      */
      @keyframes island-bolt-ambient-blink {
        0%, 92%, 100% { stroke-opacity: 0; }
        94% { stroke-opacity: 1; }
        96% { stroke-opacity: 0.15; }
        98% { stroke-opacity: 0.8; }
      }

      .island-bolt-ambient {
        animation: island-bolt-ambient-blink 7s ease-in-out infinite;
      }

      @keyframes island-surge-kf {
        0% { transform: translateY(0); }
        35% { transform: translateY(-12px); }
        70% { transform: translateY(4px); }
        100% { transform: translateY(0); }
      }

      .island-surge {
        animation: island-surge-kf 1.2s ease-out;
      }

      @keyframes island-sunray-kf {
        0% { opacity: 0; }
        25% { opacity: 1; }
        100% { opacity: 0; }
      }
        @keyframes island-react-kf {
        0% { transform: scale(1); filter: brightness(1); }
        25% { transform: scale(1.03); filter: brightness(1.3); }
        50% { transform: scale(0.98); filter: brightness(0.9); }
        75% { transform: scale(1.01); filter: brightness(1.1); }
        100% { transform: scale(1); filter: brightness(1); }
        }

        .island-react {
        animation: island-react-kf 0.8s ease-out;
        }

      .island-sunray {
        animation: island-sunray-kf 1.5s ease-out forwards;
      }

      @media (max-width: 1100px) {
        .island-widget {
          transform: scale(0.72);
          transform-origin: bottom right;
        }
      }

      @media (max-width: 700px) {
        .zone-marker-ring,
        .zone-marker-lock,
        .zone-marker-completed-icon,
        .zone-marker-failed-icon {
          width: 34px;
          height: 34px;
        }
        .zone-marker-label {
          max-width: 115px;
          overflow: hidden;
          font-size: 8px;
          text-overflow: ellipsis;
        }
        .map-footer { display: none; }
        .island-widget {
          transform: scale(0.6);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .ocean-waves,
        .ocean-shimmer {
          animation: none;
        }
      }
    `}</style>
  );
}