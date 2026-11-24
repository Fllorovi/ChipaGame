"use client";

import { useEffect, useState } from "react";
import { getIslandState } from "../constants";

export type IslandEvent = { type: "correct" | "wrong"; id: number } | null;

export default function IslandWidget({
  waterLevel,
  event,
}: {
  waterLevel: number;
  event?: IslandEvent;
}) {
  const s = getIslandState(waterLevel);
  const [prevWaterLevel, setPrevWaterLevel] = useState(waterLevel);
  const [reacting, setReacting] = useState(false);

  // Реакция на изменение уровня воды
  useEffect(() => {
    if (waterLevel !== prevWaterLevel) {
      setReacting(true);
      const id = setTimeout(() => setReacting(false), 800);
      setPrevWaterLevel(waterLevel);
      return () => clearTimeout(id);
    }
  }, [waterLevel, prevWaterLevel]);

  // Разовая вспышка-реакция на ответ
  const [flash, setFlash] = useState<"correct" | "wrong" | null>(null);
  useEffect(() => {
    if (!event) return;
    setFlash(event.type);
    const id = setTimeout(() => setFlash(null), 1500);
    return () => clearTimeout(id);
  }, [event?.id]);

  return (
    <div className="island-widget absolute bottom-4 right-4 z-40 flex flex-col items-center gap-2">
      <div
        className={`relative h-[202px] w-[275px] overflow-hidden rounded-2xl border-2 border-[#55A4FE]/40 shadow-[0_10px_40px_rgba(0,0,0,0.8)] bg-[#0a1628] ${
          reacting ? "island-react" : ""
        }`}
      >
        {/* КЛЮЧ: при изменении waterLevel SVG полностью перерисовывается с новыми цветами */}
        <svg
          key={waterLevel}
          viewBox="0 0 400 300"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.skyTop} />
              <stop offset="40%" stopColor={s.skyMid} />
              <stop offset="72%" stopColor={s.skyHorizon} />
              <stop offset="100%" stopColor={s.skyHorizon} />
            </linearGradient>

            <linearGradient id="darkSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#01040c" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#01040c" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#01040c" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="mountFar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2c5138" />
              <stop offset="100%" stopColor="#182f20" />
            </linearGradient>
            <linearGradient id="mountMid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#35603f" />
              <stop offset="100%" stopColor="#1f3c26" />
            </linearGradient>
            <linearGradient id="mountNear" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3f6f45" />
              <stop offset="100%" stopColor="#264a2e" />
            </linearGradient>
            <linearGradient id="rockGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6a7a6a" />
              <stop offset="50%" stopColor="#4a5a4a" />
              <stop offset="100%" stopColor="#2a3a2a" />
            </linearGradient>
            <linearGradient id="grassGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5f9a3f" />
              <stop offset="100%" stopColor="#2c5a2c" />
            </linearGradient>
            <linearGradient id="sandGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c8b888" />
              <stop offset="100%" stopColor="#987a5a" />
            </linearGradient>
            <linearGradient id="ruinGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8a8a7a" />
              <stop offset="100%" stopColor="#5a5a4a" />
            </linearGradient>

            <linearGradient id="waterTopGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.waterSurface} stopOpacity="0.7" />
              <stop offset="100%" stopColor={s.waterMid} stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="waterMidGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.waterMid} stopOpacity="0.8" />
              <stop offset="100%" stopColor={s.waterDeep} stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="waterDeepGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.waterDeep} stopOpacity="0.9" />
              <stop offset="100%" stopColor="#020810" stopOpacity="0.98" />
            </linearGradient>

            <radialGradient id="underwaterGlow" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#4ac8e8" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0a2a4a" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="runeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#55a4fe" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#55a4fe" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="skyGlow" cx="78%" cy="18%" r="45%">
              <stop offset="0%" stopColor="#bfe3ff" stopOpacity="0.5" />
              <stop offset="40%" stopColor="#7fb8e8" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#7fb8e8" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="mistGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b8dde8" stopOpacity="0" />
              <stop offset="50%" stopColor="#b8dde8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#b8dde8" stopOpacity="0" />
            </linearGradient>

            <filter id="shadow">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
            </filter>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="blur">
              <feGaussianBlur stdDeviation="4" />
            </filter>
            <filter id="boltGlow">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* НЕБО */}
          <rect width="400" height="300" fill="url(#skyGrad)" />

          <rect
            width="400"
            height="300"
            fill="url(#skyGlow)"
            style={{ opacity: s.glow }}
          />

          {/* Звёзды */}
          <g style={{ opacity: s.stars }}>
            <circle cx="45" cy="18" r="1" fill="white" />
            <circle cx="120" cy="12" r="0.8" fill="white" />
            <circle cx="200" cy="22" r="1.2" fill="white" />
            <circle cx="280" cy="15" r="0.7" fill="white" />
            <circle cx="340" cy="25" r="1" fill="white" />
            <circle cx="75" cy="30" r="0.6" fill="white" />
            <circle cx="310" cy="8" r="0.9" fill="white" />
            <circle cx="160" cy="35" r="0.7" fill="white" />
            <circle cx="380" cy="18" r="0.8" fill="white" />
            <circle cx="240" cy="6" r="0.8" fill="white" />
            <circle cx="20" cy="40" r="0.7" fill="white" />
          </g>

          {/* Лёгкие облака */}
          <g opacity={0.22 * s.cloudCalm} filter="url(#blur)">
            <ellipse cx="90" cy="42" rx="55" ry="7" fill="#7fa8c0" />
            <ellipse cx="260" cy="34" rx="60" ry="6" fill="#7fa8c0" />
            <ellipse cx="350" cy="52" rx="40" ry="6" fill="#6f98b0" />
          </g>

          {/* Тяжёлые тучи */}
          <g style={{ opacity: s.cloudStorm }} filter="url(#blur)">
            <ellipse cx="70" cy="30" rx="80" ry="16" fill="#0a1420" />
            <ellipse cx="180" cy="22" rx="90" ry="14" fill="#0c1826" />
            <ellipse cx="300" cy="34" rx="85" ry="17" fill="#0a1420" />
            <ellipse cx="380" cy="24" rx="60" ry="13" fill="#0c1826" />
            <ellipse cx="130" cy="46" rx="70" ry="12" fill="#08101c" opacity="0.8" />
          </g>

          {/* ГОРЫ */}
          <g>
            <path d="M60 178 L98 118 L128 150 L168 96 L208 142 L246 92 L286 138 L318 112 L348 178 Z" fill="url(#mountFar)" />
            <path d="M75 180 L112 138 L148 158 L188 122 L226 152 L262 126 L300 154 L336 140 L352 180 Z" fill="url(#mountMid)" />
            <path d="M88 182 L126 152 L162 168 L204 146 L248 164 L288 150 L330 166 L356 182 Z" fill="url(#mountNear)" />
            <g stroke="#16301f" strokeWidth="1" fill="none" opacity="0.35">
              <path d="M168 96 L176 120 M168 96 L160 118" />
              <path d="M246 92 L254 116 M246 92 L238 114" />
              <path d="M98 118 L106 138 M98 118 L92 136" />
            </g>
            <g fill="#4f8a4a" opacity="0.25">
              <ellipse cx="150" cy="140" rx="16" ry="7" />
              <ellipse cx="270" cy="135" rx="14" ry="6" />
              <ellipse cx="210" cy="150" rx="12" ry="5" />
            </g>
          </g>

          <rect x="0" y="150" width="400" height="34" fill="url(#mistGrad)" opacity={0.45 * (1 - s.t * 0.5)} />

          {/* ОСТРОВ */}
          <g filter="url(#shadow)">
            <path d="M62 194 Q78 178 104 184 Q136 172 170 178 Q204 170 238 176 Q276 170 306 180 Q332 184 340 194 Q334 202 302 206 Q252 211 200 209 Q142 211 100 206 Q68 202 62 194 Z" fill="url(#rockGrad)" />
            <path d="M72 198 Q120 206 200 204 Q280 207 330 199 Q320 206 270 209 Q210 212 150 209 Q95 206 72 198 Z" fill="url(#sandGrad)" opacity="0.85" />
            <path d="M88 184 Q124 170 168 176 Q206 168 244 174 Q282 168 314 182 Q300 190 258 188 Q214 192 172 188 Q122 192 88 184 Z" fill="url(#grassGrad)" />

            <g fill="#6fae4a" opacity="0.5">
              <ellipse cx="140" cy="182" rx="22" ry="5" />
              <ellipse cx="230" cy="180" rx="26" ry="5" />
              <ellipse cx="290" cy="184" rx="18" ry="4" />
            </g>

            {/* Руины */}
            <g fill="url(#ruinGrad)" stroke="#2f4a34" strokeWidth="0.5">
              <rect x="186" y="150" width="6" height="26" rx="1" />
              <rect x="184" y="148" width="10" height="3" rx="1" />
              <rect x="184" y="174" width="10" height="3" rx="1" />
              <rect x="212" y="158" width="6" height="18" rx="1" />
              <path d="M212 158 L215 154 L218 157 Z" fill="#6a6a5a" />
              <rect x="240" y="152" width="6" height="24" rx="1" transform="rotate(8 243 164)" />
              <rect x="238" y="150" width="10" height="3" rx="1" transform="rotate(8 243 151)" />
              <path d="M256 164 L272 160 L274 172 L259 174 Z" opacity="0.8" />
              <path d="M196 154 Q202 146 208 154" fill="none" stroke="#7a7a6a" strokeWidth="2" opacity="0.6" />
            </g>
            <g fill="#3f7a3f" opacity="0.75">
              <ellipse cx="189" cy="168" rx="3" ry="4" />
              <ellipse cx="215" cy="170" rx="2.5" ry="3" />
              <ellipse cx="243" cy="168" rx="3" ry="3.5" />
            </g>
            <path d="M186 150 q3 5 0 10 M241 154 q3 5 0 10" stroke="#4f8a4a" strokeWidth="1.5" fill="none" opacity="0.8" />

            {/* ЛЕС — наклоняется с ветром */}
            <g
              style={{
                transform: `rotate(${s.treeTilt}deg)`,
                transformOrigin: "200px 192px",
              }}
            >
              <path d="M98 188 Q96 174 99 162" stroke="#5a4a32" strokeWidth="2.5" fill="none" />
              <ellipse cx="99" cy="156" rx="13" ry="10" fill="#3f7a3f" />
              <ellipse cx="92" cy="160" rx="8" ry="6" fill="#4f8a4a" opacity="0.85" />
              <ellipse cx="106" cy="159" rx="7" ry="5" fill="#356a35" opacity="0.9" />

              <path d="M124 190 Q123 180 125 171" stroke="#5a4a32" strokeWidth="2" fill="none" />
              <ellipse cx="125" cy="166" rx="10" ry="8" fill="#458045" />
              <ellipse cx="119" cy="169" rx="6" ry="5" fill="#55955a" opacity="0.8" />

              <path d="M78 192 Q77 182 80 173" stroke="#5a4a32" strokeWidth="2" fill="none" />
              <ellipse cx="80" cy="168" rx="9" ry="7" fill="#3a7038" />

              <path d="M178 182 Q177 168 179 157" stroke="#5a4a32" strokeWidth="2" fill="none" />
              <ellipse cx="179" cy="152" rx="10" ry="8" fill="#458045" />
              <ellipse cx="174" cy="155" rx="6" ry="5" fill="#55955a" opacity="0.8" />

              <path d="M232 181 Q233 166 231 153" stroke="#5a4a32" strokeWidth="2.5" fill="none" />
              <ellipse cx="231" cy="148" rx="11" ry="9" fill="#3a7038" />
              <ellipse cx="237" cy="151" rx="7" ry="6" fill="#4f8a4a" opacity="0.85" />

              <path d="M278 188 Q277 177 279 168" stroke="#5a4a32" strokeWidth="2" fill="none" />
              <ellipse cx="279" cy="164" rx="9" ry="7" fill="#356a35" />

              <path d="M300 187 Q302 173 299 161" stroke="#5a4a32" strokeWidth="2.5" fill="none" />
              <ellipse cx="299" cy="156" rx="12" ry="9" fill="#3f7a3f" />
              <ellipse cx="305" cy="159" rx="7" ry="6" fill="#4f8a4a" opacity="0.85" />

              <path d="M322 190 Q323 180 321 171" stroke="#5a4a32" strokeWidth="2" fill="none" />
              <ellipse cx="321" cy="166" rx="10" ry="8" fill="#458045" />
            </g>

            {/* Кусты */}
            <g fill="#2f5f30">
              <ellipse cx="110" cy="188" rx="11" ry="5" />
              <ellipse cx="146" cy="190" rx="9" ry="4" />
              <ellipse cx="206" cy="191" rx="10" ry="4" />
              <ellipse cx="258" cy="190" rx="11" ry="5" />
              <ellipse cx="292" cy="188" rx="8" ry="4" />
              <ellipse cx="334" cy="192" rx="7" ry="3.5" />
            </g>
            <g stroke="#4f8a4a" strokeWidth="1.2" fill="none" opacity="0.9">
              <path d="M132 188 Q130 180 134 174 M132 188 Q136 182 134 176 M132 188 Q128 183 127 177" />
              <path d="M222 190 Q220 182 224 176 M222 190 Q226 184 224 178" />
              <path d="M270 189 Q268 181 272 175 M270 189 Q274 183 272 177" />
            </g>
            <g stroke="#6fae4a" strokeWidth="1" fill="none" opacity="0.7">
              <path d="M96 194 q2 -6 4 -8 M104 194 q0 -5 2 -8 M160 192 q2 -5 4 -7 M196 194 q0 -5 2 -7 M248 193 q2 -5 4 -7 M310 193 q0 -5 2 -7" />
            </g>
            <g fill="#e8d36a" opacity={0.8 * s.glow}>
              <circle cx="152" cy="186" r="1.4" />
              <circle cx="214" cy="188" r="1.4" />
              <circle cx="268" cy="186" r="1.4" />
            </g>

            {/* Руна */}
            <g filter="url(#glow)">
              <circle cx="200" cy="176" r="5" fill="url(#runeGlow)" />
              <circle cx="200" cy="176" r="2.5" fill="#55a4fe" opacity="0.95" />
            </g>
          </g>

          {/* ВЕТЕР */}
          <g
            style={{ opacity: s.wind }}
            stroke="#d6ecf7"
            fill="none"
            strokeWidth="1.2"
            strokeLinecap="round"
          >
            <g className="animate-[wind-blow_5s_ease-in-out_infinite]">
              <path d="M28 52 Q58 46 88 52 Q102 55 112 50" opacity="0.5" />
              <path d="M140 38 Q172 33 204 38" opacity="0.4" />
            </g>
            <g className="animate-[wind-blow_8s_ease-in-out_infinite_reverse]">
              <path d="M236 60 Q272 54 308 60 Q324 63 336 58" opacity="0.45" />
              <path d="M56 74 Q90 68 124 74" opacity="0.35" />
            </g>
          </g>

          {/* МОЛНИИ */}
          <g style={{ opacity: s.lightning }}>
            <g
              filter="url(#boltGlow)"
              stroke="#cfe8ff"
              fill="none"
              strokeWidth="1.6"
              strokeLinecap="round"
              className="island-bolt-ambient"
              style={{ animationDuration: `${Math.max(2.5, 9 - s.lightning * 6.5)}s` }}
            >
              <path d="M110 8 L102 34 L114 36 L104 66" />
              <path d="M290 12 L284 30 L294 32 L286 54" />
            </g>
          </g>

          {/* Разовая молния при провале */}
          {flash === "wrong" && (
            <g key={event?.id} filter="url(#boltGlow)" stroke="#eaf6ff" fill="none" strokeWidth="2" className="island-bolt">
              <path d="M200 0 L188 40 L204 44 L186 92" />
              <path d="M200 0 L212 34 L198 38 L214 78" opacity="0.7" />
            </g>
          )}

          {/* ВОДА */}
          <rect x="0" y="190" width="400" height="110" fill="url(#waterTopGrad)" />

          {/* Подводный мир */}
          <g opacity={0.5 + s.t * 0.3}>
            <rect x="186" y="190" width="6" height="30" fill="url(#ruinGrad)" opacity="0.4" />
            <rect x="240" y="190" width="6" height="25" fill="url(#ruinGrad)" opacity="0.35" transform="rotate(8 243 200)" />
            <path d="M120 200 L165 195 L170 212 L126 216 Z" fill="#5a5a4a" opacity="0.3" />
            <path d="M255 198 L300 195 L306 212 L262 216 Z" fill="#5a5a4a" opacity="0.3" />
            <g stroke="#3a2a1a" fill="none" strokeWidth="2" opacity="0.35">
              <path d="M90 195 L88 228 L85 244" />
              <path d="M88 212 L80 202" />
              <path d="M88 222 L96 214" />
              <path d="M330 198 L332 232 L330 248" />
              <path d="M332 216 L340 206" />
              <path d="M331 226 L324 219" />
            </g>
            <ellipse cx="130" cy="230" rx="12" ry="6" fill="#4a5a4a" opacity="0.3" />
            <ellipse cx="280" cy="240" rx="15" ry="7" fill="#4a5a4a" opacity="0.3" />
            <ellipse cx="200" cy="250" rx="10" ry="5" fill="#4a5a4a" opacity="0.25" />
            <g stroke="#2a6a3a" fill="none" strokeWidth="1.5" opacity="0.4">
              <path d="M110 260 Q115 245 110 230 Q105 220 110 210" />
              <path d="M115 265 Q120 250 115 235" />
              <path d="M300 255 Q305 240 300 225 Q295 215 300 205" />
              <path d="M305 260 Q310 245 305 230" />
              <path d="M200 270 Q205 255 200 240" />
              <path d="M210 268 Q215 252 210 238" />
            </g>
            <g opacity="0.35">
              <ellipse cx="145" cy="225" rx="5" ry="2.5" fill="#ff8a6a" />
              <polygon points="150,225 154,222 154,228" fill="#ff8a6a" />
              <ellipse cx="260" cy="235" rx="4" ry="2" fill="#ffd93d" />
              <polygon points="264,235 268,233 268,237" fill="#ffd93d" />
              <ellipse cx="180" cy="248" rx="4" ry="2" fill="#6bcb77" />
              <polygon points="184,248 187,246 187,250" fill="#6bcb77" />
              <ellipse cx="310" cy="220" rx="3.5" ry="1.8" fill="#8ab4ff" />
              <polygon points="313,220 316,218 316,222" fill="#8ab4ff" />
            </g>
            <g fill="none" stroke="#8ad4ff" strokeWidth="0.5" opacity={0.3 + s.foam * 0.5}>
              <circle cx="160" cy="215" r="2" />
              <circle cx="162" cy="208" r="1.5" />
              <circle cx="250" cy="220" r="2.5" />
              <circle cx="252" cy="212" r="1.5" />
              <circle cx="190" cy="230" r="1.8" />
              <circle cx="120" cy="222" r="1.6" />
              <circle cx="290" cy="228" r="2.2" />
            </g>
            <g fill="#5a5a4a" opacity="0.25">
              <rect x="220" y="200" width="20" height="3" />
              <rect x="222" y="204" width="18" height="3" />
              <rect x="224" y="208" width="16" height="3" />
              <rect x="226" y="212" width="14" height="3" />
            </g>
          </g>

          <rect x="0" y="190" width="400" height="110" fill="url(#underwaterGlow)" />
          <rect x="0" y="240" width="400" height="60" fill="url(#waterMidGrad)" />
          <rect x="0" y="265" width="400" height="35" fill="url(#waterDeepGrad)" />

          {/* Волны */}
          <g className="animate-[wave-move_8s_linear_infinite]">
            <path
              d="M0,192 Q20,188 40,192 T80,192 T120,192 T160,192 T200,192 T240,192 T280,192 T320,192 T360,192 T400,192"
              fill="none"
              stroke="#b8dde8"
              strokeWidth={1 + s.waveAmp * 0.5}
              opacity={0.5 + s.foam * 0.3}
            />
            <path
              d="M0,196 Q25,192 50,196 T100,196 T150,196 T200,196 T250,196 T300,196 T350,196 T400,196"
              fill="none"
              stroke="#8ac8e0"
              strokeWidth="1"
              opacity="0.35"
            />
          </g>

          {/* Пена */}
          <g style={{ opacity: s.foam }}>
            <ellipse cx="90" cy="200" rx="18" ry="2.5" fill="white" opacity="0.5" />
            <ellipse cx="310" cy="205" rx="22" ry="3" fill="white" opacity="0.5" />
            <ellipse cx="200" cy="210" rx="12" ry="2" fill="white" opacity="0.4" />
            <ellipse cx="150" cy="198" rx="10" ry="1.5" fill="white" opacity="0.4" />
            <ellipse cx="250" cy="199" rx="9" ry="1.5" fill="white" opacity="0.35" />
          </g>

          {/* ДОЖДЬ */}
          <g
            className="island-rain"
            stroke="#9fc4dc"
            strokeWidth="0.8"
            strokeLinecap="round"
            style={{ opacity: s.rain * 0.5 }}
          >
            {Array.from({ length: 22 }).map((_, i) => {
              const x = 8 + i * 18;
              const y = (i % 5) * 14;
              return <line key={i} x1={x} y1={y} x2={x - 3} y2={y + 10} />;
            })}
          </g>

          {/* Луч при успехе */}
          {flash === "correct" && (
            <g key={event?.id} className="island-sunray">
              <rect width="400" height="300" fill="url(#skyGlow)" opacity="0.9" />
              <polygon points="312,0 340,0 240,190 200,190" fill="#cfe8ff" opacity="0.12" />
            </g>
          )}
        </svg>

        {/* Уровень воды */}
        <div
          className={`absolute bottom-0 left-0 w-full transition-all duration-1000 ease-in-out z-20 ${
            flash === "wrong" ? "island-surge" : ""
          }`}
          style={{
            height: `${waterLevel}%`,
            background: `linear-gradient(to top, ${s.waterDeep}f2, ${s.waterMid}b3 55%, ${s.waterSurface}66)`,
          }}
        >
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[200%] h-8 animate-[wave-move_8s_linear_infinite]">
              <path d="M0,60 C150,120 300,0 450,60 C600,120 750,0 900,60 C1050,120 1200,0 1200,60 L1200,120 L0,120 Z" fill="#ffffff" opacity={0.2 + s.foam * 0.2} />
            </svg>
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[200%] h-8 absolute top-1 animate-[wave-move_12s_linear_infinite_reverse]">
              <path d="M0,60 C150,120 300,0 450,60 C600,120 750,0 900,60 C1050,120 1200,0 1200,60 L1200,120 L0,120 Z" fill="#b8dde8" opacity={0.25 + s.foam * 0.25} />
            </svg>
          </div>
        </div>

        {/* Индикатор состояния */}
        <div
          className="absolute top-2 left-2 rounded-lg border px-2.5 py-1.5 backdrop-blur-md z-30 shadow-lg"
          style={{
            background: "rgba(0,0,0,0.72)",
            borderColor: `${s.toneColor}55`,
          }}
        >
          <div className="flex items-center gap-1.5">
            <span
              className={`inline-block h-1.5 w-1.5 rounded-full ${s.tone === "critical" ? "animate-pulse" : ""}`}
              style={{ background: s.toneColor, boxShadow: `0 0 6px ${s.toneColor}` }}
            />
            <span
              className="text-[10px] font-bold tracking-wider"
              style={{ color: s.toneColor }}
            >
              {s.label}
            </span>
          </div>
          <span className="mt-0.5 block text-[8px] leading-tight text-white/50">
            {s.description}
          </span>
        </div>
      </div>
    </div>
  );
}