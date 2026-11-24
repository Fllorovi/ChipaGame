// Таймер раунда: 1,5 часа
export const ROUND_SECONDS = 90 * 60;

// Количество зон в первом раунде
export const ZONE_COUNT = 5;

// Баланс воды. Старт 34% — остров уже в кризисе (ВОЛНЕНИЕ).
// Провал +6%, успех −6%. Диапазон 18..55 = 5 чётких состояний.
//   старт            → 34%  ВОЛНЕНИЕ
//   1 провал         → 40%  ШТОРМ  (молнии + дождь)
//   2 провала        → 46%  БУРЯ
//   5 провалов       → 55%  БУРЯ (max)
//   1 успех          → 28%  СПОКОЙНОЕ МОРЕ (светлеет)
//   5 успехов        → 18%  ШТИЛЬ
export const WATER_START = 34;
export const WATER_FAIL_DELTA = 6;
export const WATER_SUCCESS_DELTA = 6;
export const WATER_MIN = 18;
export const WATER_MAX = 55;

export function computeWaterLevel(completedCount: number, failedCount: number) {
  return Math.min(
    WATER_MAX,
    Math.max(
      WATER_MIN,
      WATER_START - completedCount * WATER_SUCCESS_DELTA + failedCount * WATER_FAIL_DELTA
    )
  );
}

/* ──────────────────────────── helpers ──────────────────────────── */

export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function rgbToHex(r: number, g: number, b: number) {
  const c = (n: number) =>
    Math.round(clamp(n, 0, 255)).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

export function lerpColor(a: string, b: string, t: number) {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  return rgbToHex(lerp(r1, r2, t), lerp(g1, g2, t), lerp(b1, b2, t));
}

/* ──────────────────────── палитры состояний ─────────────────────── */

const SKY_CALM = { top: "#123a5c", mid: "#1d4f74", horizon: "#3f7fa0" };
const SKY_STORM = { top: "#01040a", mid: "#03080f", horizon: "#07121f" };

const WATER_CALM = { surface: "#2a6a8a", mid: "#1a4a6a", deep: "#0a2a4a" };
const WATER_STORM = { surface: "#0d2438", mid: "#071827", deep: "#030a14" };

/* ────────────────────────── тип состояния ────────────────────────── */

export type IslandTone = "calm" | "ok" | "warn" | "danger" | "critical";

export type IslandState = {
  t: number;
  label: string;
  description: string;
  tone: IslandTone;
  toneColor: string;

  skyTop: string;
  skyMid: string;
  skyHorizon: string;
  darkness: number;
  stars: number;
  cloudCalm: number;
  cloudStorm: number;
  glow: number;

  wind: number;
  rain: number;
  lightning: number;
  treeTilt: number;

  waterSurface: string;
  waterMid: string;
  waterDeep: string;
  waveAmp: number;
  foam: number;
};

/* ──────────────────── главный вычислитель ──────────────────── */

export function getIslandState(waterLevel: number): IslandState {
  const t = clamp((waterLevel - WATER_MIN) / (WATER_MAX - WATER_MIN), 0, 1);

  let label = "ВОЛНЕНИЕ";
  let description = "Вода прибывает, небо затягивает";
  let tone: IslandTone = "warn";
  let toneColor = "#ffd166";

  if (t < 0.15) {
    label = "ШТИЛЬ";
    description = "Идеальная гладь, вода отступает";
    tone = "calm";
    toneColor = "#7ee0a3";
  } else if (t < 0.35) {
    label = "СПОКОЙНОЕ МОРЕ";
    description = "Океан выдыхает, тучи редкие";
    tone = "ok";
    toneColor = "#69caff";
  } else if (t < 0.55) {
    label = "ВОЛНЕНИЕ";
    description = "Вода прибывает, небо затягивает";
    tone = "warn";
    toneColor = "#ffd166";
  } else if (t < 0.75) {
    label = "ШТОРМ";
    description = "Молнии и дождь, остров тонет";
    tone = "danger";
    toneColor = "#ff9a5a";
  } else {
    label = "БУРЯ · ОСТРОВ ТОНЕТ";
    description = "Критическое затопление!";
    tone = "critical";
    toneColor = "#ff5a5a";
  }

  return {
    t,
    label,
    description,
    tone,
    toneColor,

    skyTop: lerpColor(SKY_CALM.top, SKY_STORM.top, t),
    skyMid: lerpColor(SKY_CALM.mid, SKY_STORM.mid, t),
    skyHorizon: lerpColor(SKY_CALM.horizon, SKY_STORM.horizon, t),
    darkness: clamp((t - 0.05) / 0.95, 0, 1),
    stars: clamp(1 - t * 1.3, 0, 1),
    cloudCalm: clamp(1 - t * 1.5, 0, 1),
    cloudStorm: clamp((t - 0.18) / 0.82, 0, 1),
    glow: clamp(1 - t * 1.2, 0, 1),

    wind: clamp((t - 0.18) / 0.82, 0, 1),
    rain: clamp((t - 0.45) / 0.55, 0, 1),
    lightning: clamp((t - 0.4) / 0.6, 0, 1),
    treeTilt: lerp(0, 7, t),

    waterSurface: lerpColor(WATER_CALM.surface, WATER_STORM.surface, t),
    waterMid: lerpColor(WATER_CALM.mid, WATER_STORM.mid, t),
    waterDeep: lerpColor(WATER_CALM.deep, WATER_STORM.deep, t),
    waveAmp: lerp(1, 4, t),
    foam: clamp((t - 0.12) / 0.88, 0, 1),
  };
}

/* ─────────── обратная совместимость (если где-то импортируют) ─────────── */

export function computeDarkness(waterLevel: number) {
  return getIslandState(waterLevel).darkness;
}

export function computeWindStrength(waterLevel: number) {
  return getIslandState(waterLevel).wind;
}