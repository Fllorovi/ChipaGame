
"use client";

import { useState } from "react";

const zones = [
  {
    id: 1,
    name: "Береговой лагерь",
    description: "Песчаная бухта и место первой высадки.",
    x: 22,
    y: 57,
  },
  {
    id: 2,
    name: "Радиорелейная",
    description: "Заброшенный коммуникационный комплекс.",
    x: 38,
    y: 30,
  },
  {
    id: 3,
    name: "Энергоузел",
    description: "Центральный технологический комплекс острова.",
    x: 54,
    y: 57,
  },
  {
    id: 4,
    name: "Смотровая башня",
    description: "Высотный наблюдательный пункт.",
    x: 69,
    y: 25,
  },
  {
    id: 5,
    name: "Исследовательский комплекс",
    description: "Главный научный объект полигона.",
    x: 81,
    y: 55,
  },
];

export default function RoundOnePage() {
  const [selectedZone, setSelectedZone] = useState(0);

  const activeZone = zones[selectedZone];

  return (
    <main className="island-map">
      {/* Океан */}
      <div className="ocean">
        <div className="ocean-light" />
        <div className="ocean-waves ocean-waves-one" />
        <div className="ocean-waves ocean-waves-two" />
        <div className="ocean-shimmer" />
      </div>

      {/* Декоративные рифы */}
      <div className="reef reef-one" />
      <div className="reef reef-two" />
      <div className="reef reef-three" />

      {/* Карта острова */}
      <div className="island-stage">
        <svg
          className="island-art"
          viewBox="0 0 1200 760"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#527c43" />
              <stop offset="48%" stopColor="#315b38" />
              <stop offset="100%" stopColor="#173b32" />
            </linearGradient>

            <linearGradient id="sand" x1="0" y1="0" x2="0.8" y2="1">
              <stop offset="0%" stopColor="#e8d3a0" />
              <stop offset="100%" stopColor="#b89a69" />
            </linearGradient>

            <linearGradient id="cliff" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#596b61" />
              <stop offset="100%" stopColor="#263c39" />
            </linearGradient>

            <radialGradient id="jungle">
              <stop offset="0%" stopColor="#6c914b" />
              <stop offset="100%" stopColor="#244a32" />
            </radialGradient>

            <filter id="islandShadow">
              <feGaussianBlur stdDeviation="16" />
            </filter>
          </defs>

          {/* Тень острова */}
          <path
            d="M160 220 L260 115 L470 90 L610 120 L780 80 L1010 180 L1100 360 L1050 560 L900 680 L660 710 L430 670 L220 620 L100 440 Z"
            fill="#001629"
            opacity=".65"
            filter="url(#islandShadow)"
            transform="translate(0 22)"
          />

          {/* Основная суша */}
          <path
            d="M165 235
              L230 150 L350 115 L455 135
              L530 90 L665 105 L745 75
              L865 125 L1000 145 L1080 245
              L1060 340 L1110 420 L1050 535
              L980 600 L875 625 L790 690
              L660 670 L565 705 L435 650
              L320 665 L220 600 L125 515
              L95 405 L135 315 Z"
            fill="url(#land)"
            stroke="#b4a77d"
            strokeWidth="13"
            strokeLinejoin="round"
          />

          {/* Песчаные побережья */}
          <path
            d="M165 235 L230 150 L350 115 L455 135
              L530 90 L665 105 L745 75 L865 125
              L1000 145 L1080 245 L1060 340
              L1020 325 L1010 245 L930 190
              L810 165 L700 145 L570 155
              L455 190 L340 165 L240 215 Z"
            fill="url(#sand)"
            opacity=".95"
          />

          <path
            d="M125 515 L220 600 L320 665 L435 650
              L565 705 L660 670 L790 690
              L875 625 L980 600 L1050 535
              L1020 480 L950 550 L840 585
              L700 625 L565 650 L440 605
              L320 615 L220 550 Z"
            fill="url(#sand)"
            opacity=".9"
          />

          {/* Скальные уступы */}
          <path
            d="M200 270 L320 205 L430 215 L480 275
              L405 315 L280 330 Z"
            fill="url(#cliff)"
            opacity=".8"
          />

          <path
            d="M750 185 L870 165 L980 230 L1020 330
              L930 370 L820 325 Z"
            fill="url(#cliff)"
            opacity=".8"
          />

          <path
            d="M450 500 L550 450 L650 480 L700 570
              L600 620 L485 590 Z"
            fill="url(#cliff)"
            opacity=".75"
          />

          {/* Внутренние джунгли */}
          <path
            d="M270 270 Q370 175 480 250
              Q570 190 650 250
              Q760 160 850 250
              Q960 260 970 370
              Q900 465 790 440
              Q700 510 600 450
              Q500 510 400 440
              Q290 470 230 370 Z"
            fill="url(#jungle)"
          />

          {/* Лагуна */}
          <path
            d="M570 280 Q640 235 710 275
              Q770 320 725 375
              Q670 415 600 375
              Q540 335 570 280 Z"
            fill="#087b83"
            stroke="#6bc5b6"
            strokeWidth="8"
          />

          <path
            d="M590 300 Q650 265 700 300
              Q730 330 690 365"
            fill="none"
            stroke="#8be0d0"
            strokeWidth="5"
            opacity=".6"
          />

          {/* Тропинки */}
          <path
            d="M250 430 Q350 350 420 390
              Q490 430 550 390
              Q640 350 680 400
              Q760 470 840 405
              Q900 365 950 430"
            fill="none"
            stroke="#c9b487"
            strokeWidth="18"
            strokeLinecap="round"
          />

          <path
            d="M250 430 Q350 350 420 390
              Q490 430 550 390
              Q640 350 680 400
              Q760 470 840 405
              Q900 365 950 430"
            fill="none"
            stroke="#e4d0a5"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Площадки технологических объектов */}
          <g fill="#243c45" stroke="#8ba5a0" strokeWidth="5">
            <circle cx="455" cy="250" r="55" />
            <circle cx="610" cy="440" r="65" />
            <circle cx="830" cy="245" r="50" />
            <circle cx="950" cy="450" r="58" />
            <circle cx="265" cy="450" r="45" />
          </g>

          {/* Голубые энергетические ядра */}
          <g fill="#168fff" opacity=".85">
            <circle cx="455" cy="250" r="13" />
            <circle cx="610" cy="440" r="18" />
            <circle cx="830" cy="245" r="12" />
            <circle cx="950" cy="450" r="14" />
            <circle cx="265" cy="450" r="11" />
          </g>

          <g fill="none" stroke="#55caff" strokeWidth="4">
            <circle cx="455" cy="250" r="30" />
            <circle cx="610" cy="440" r="40" />
            <circle cx="830" cy="245" r="28" />
            <circle cx="950" cy="450" r="34" />
            <circle cx="265" cy="450" r="25" />
          </g>

          {/* Пальмовые кроны */}
          {[
            [300, 260], [350, 310], [390, 230],
            [510, 300], [750, 220], [900, 290],
            [960, 350], [390, 510], [720, 530],
            [850, 540], [540, 570], [180, 390],
            [1030, 390], [650, 190], [320, 550],
          ].map(([x, y], index) => (
            <g key={index} transform={`translate(${x} ${y})`}>
              <circle r="22" fill="#173d2d" />
              <circle cx="-8" cy="-7" r="14" fill="#527e3d" />
              <circle cx="9" cy="-8" r="15" fill="#668e48" />
              <circle cx="7" cy="9" r="13" fill="#315e37" />
            </g>
          ))}
        </svg>

        {/* Маршрут между зонами */}
        <svg
          className="island-route"
          viewBox="0 0 1000 620"
          preserveAspectRatio="none"
        >
          <path
            d="M220 350 Q300 180 380 185
              Q465 250 540 350
              Q620 470 690 155
              Q760 200 810 340"
            fill="none"
            stroke="#66caff"
            strokeWidth="3"
            strokeDasharray="8 12"
            strokeLinecap="round"
            opacity=".8"
          />
        </svg>

        {/* Игровые зоны */}
        {zones.map((zone, index) => (
          <button
            key={zone.id}
            type="button"
            title={zone.name}
            onClick={() => setSelectedZone(index)}
            className={`zone-marker ${
              selectedZone === index ? "zone-marker-active" : ""
            }`}
            style={{
              left: `${zone.x}%`,
              top: `${zone.y}%`,
            }}
          >
            <span className="zone-marker-ring">
              <span className="zone-marker-core" />
            </span>
            <span className="zone-marker-label">{zone.name}</span>
          </button>
        ))}
      </div>



      {/* Информация о выбранной зоне */}
      <section className="zone-info">
        <div className="zone-info-eyebrow">ВЫБРАННАЯ ЗОНА</div>
        <h2>{activeZone.name}</h2>
        <p>{activeZone.description}</p>

        <button
          type="button"
          className="zone-action"
          onClick={() => {
            console.log("Selected zone:", activeZone.id);
          }}
        >
          Перейти к зоне
          <span>→</span>
        </button>
      </section>

      {/* Нижняя панель */}
      <div className="map-footer">
        <span>ОСТРОВНОЙ КОМПЛЕКС</span>
        <span>СИСТЕМА НАВИГАЦИИ / ONLINE</span>
      </div>

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
            radial-gradient(ellipse at 50% 48%, #12647b 0%, transparent 45%),
            radial-gradient(ellipse at 15% 20%, #075078 0%, transparent 40%),
            linear-gradient(145deg, #031a36, #06466b 55%, #03182f);
        }

        .ocean-light {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 50% 50%, transparent 15%, #00152a 95%);
        }

        .ocean-waves {
          position: absolute;
          inset: -50%;
          width: 200%;
          height: 200%;
          opacity: 0.2;
          background-image:
            repeating-radial-gradient(
              ellipse at 40% 50%,
              transparent 0 34px,
              rgba(117, 218, 242, 0.45) 35px,
              transparent 37px,
              transparent 65px
            );
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
          background-image: radial-gradient(
            ellipse,
            rgba(119, 223, 255, 0.8) 0 1px,
            transparent 2px
          );
          background-size: 95px 73px;
          animation: shimmer 7s ease-in-out infinite alternate;
        }

        @keyframes ocean-drift {
          from {
            transform: rotate(0deg) translate3d(0, 0, 0);
          }
          to {
            transform: rotate(360deg) translate3d(0, 0, 0);
          }
        }

        @keyframes shimmer {
          from {
            opacity: 0.1;
          }
          to {
            opacity: 0.35;
          }
        }

        .reef {
          position: absolute;
          width: 200px;
          height: 80px;
          border: 2px solid rgba(76, 201, 220, 0.22);
          border-radius: 50%;
          filter: blur(8px);
          transform: rotate(-25deg);
        }

        .reef-one {
          top: 15%;
          left: 4%;
        }

        .reef-two {
          right: 4%;
          top: 58%;
          transform: rotate(25deg);
        }

        .reef-three {
          bottom: 7%;
          left: 42%;
          transform: rotate(-10deg);
        }

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
          gap: 8px;
          padding: 0;
          border: 0;
          background: transparent;
          color: white;
          cursor: pointer;
          transform: translate(-50%, -50%);
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
          box-shadow:
            0 0 0 5px rgba(30, 123, 177, 0.13),
            0 0 18px rgba(30, 151, 255, 0.3);
          transition: all 0.25s ease;
        }

        .zone-marker-core {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #7abce9;
          box-shadow: 0 0 10px #35aaff;
        }

        .zone-marker-active .zone-marker-ring {
          width: 58px;
          height: 58px;
          border: 3px solid #65d5ff;
          box-shadow:
            0 0 0 7px rgba(38, 158, 255, 0.16),
            0 0 25px rgba(27, 160, 255, 0.8);
        }

        .zone-marker-active .zone-marker-core {
          width: 14px;
          height: 14px;
          background: white;
          box-shadow: 0 0 16px 5px #168fff;
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

        .zone-marker-active .zone-marker-label {
          border-color: rgba(85, 190, 255, 0.7);
          color: #a8e3ff;
          opacity: 1;
        }

        .map-header {
          position: absolute;
          z-index: 10;
          top: 0;
          left: 0;
          display: flex;
          width: 100%;
          align-items: flex-start;
          justify-content: space-between;
          padding: 30px 38px;
          background: linear-gradient(
            to bottom,
            rgba(1, 14, 31, 0.75),
            transparent
          );
        }

        .map-eyebrow,
        .zone-info-eyebrow {
          color: #69caff;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.25em;
        }

        .map-header h1 {
          margin: 7px 0 0;
          font-size: 30px;
          font-weight: 900;
          letter-spacing: 0.04em;
          text-shadow: 0 3px 15px rgba(0, 0, 0, 0.4);
        }

        .map-status {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 10px 14px;
          border: 1px solid rgba(101, 190, 255, 0.2);
          border-radius: 8px;
          background: rgba(2, 22, 42, 0.6);
          color: #b8d8eb;
          font-size: 11px;
          letter-spacing: 0.08em;
          backdrop-filter: blur(10px);
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #43e4a0;
          box-shadow: 0 0 10px #43e4a0;
        }

        .zone-info {
          position: absolute;
          z-index: 10;
          bottom: 38px;
          left: 38px;
          width: min(340px, calc(100vw - 40px));
          padding: 22px;
          border: 1px solid rgba(96, 182, 255, 0.25);
          border-radius: 16px;
          background: rgba(3, 20, 40, 0.82);
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(16px);
        }

        .zone-info h2 {
          margin: 10px 0 7px;
          font-size: 21px;
          font-weight: 800;
        }

        .zone-info p {
          margin: 0;
          color: rgba(220, 237, 255, 0.58);
          font-size: 12px;
          line-height: 1.6;
        }

        .zone-action {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
          margin-top: 19px;
          padding: 12px 15px;
          border: 1px solid rgba(103, 195, 255, 0.4);
          border-radius: 8px;
          background: linear-gradient(100deg, #0876c7, #07549a);
          color: white;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
          transition: filter 0.2s ease;
        }

        .zone-action:hover {
          filter: brightness(1.2);
        }

        .zone-action span {
          font-size: 18px;
        }

        .map-footer {
          position: absolute;
          right: 38px;
          bottom: 38px;
          display: flex;
          flex-direction: column;
          gap: 7px;
          color: rgba(177, 218, 242, 0.4);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-align: right;
        }

        @media (max-width: 700px) {
          .island-stage {
            width: 145vw;
            max-width: none;
            top: 43%;
          }

          .map-header {
            padding: 20px;
          }

          .map-header h1 {
            font-size: 23px;
          }

          .map-status {
            padding: 8px;
            font-size: 9px;
          }

          .zone-marker-ring {
            width: 34px;
            height: 34px;
          }

          .zone-marker-active .zone-marker-ring {
            width: 46px;
            height: 46px;
          }

          .zone-marker-label {
            max-width: 115px;
            overflow: hidden;
            font-size: 8px;
            text-overflow: ellipsis;
          }

          .zone-info {
            bottom: 18px;
            left: 18px;
            padding: 17px;
          }

          .map-footer {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ocean-waves,
          .ocean-shimmer {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}
