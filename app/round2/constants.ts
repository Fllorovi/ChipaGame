export const ROUND_SECONDS = 90 * 60;
export const ZONE_COUNT = 5;

// Логика воды (давления). Старт 34%, провал +6%, успех -6%.
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

export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export type MechanismState = {
  t: number;
  label: string;
  description: string;
  tone: "calm" | "ok" | "warn" | "danger" | "critical";
  toneColor: string;
  needleAngle: number;
  steamIntensity: number;
  shakeIntensity: number;
};

export function getMechanismState(waterLevel: number): MechanismState {
  const t = clamp((waterLevel - WATER_MIN) / (WATER_MAX - WATER_MIN), 0, 1);
  
  let label = "СТАБИЛЬНО";
  let description = "Давление в норме";
  let tone: MechanismState["tone"] = "warn";
  let toneColor = "#ffd166";
  let needleAngle = lerp(-70, 70, t);

  if (t < 0.15) {
    label = "ИДЕАЛЬНО";
    description = "Механизм работает ровно";
    tone = "calm";
    toneColor = "#7ee0a3";
  } else if (t < 0.35) {
    label = "НОРМА";
    description = "Допустимый уровень";
    tone = "ok";
    toneColor = "#69caff";
  } else if (t > 0.75) {
    label = "ПЕРЕГРУЗКА";
    description = "Критическое давление!";
    tone = "critical";
    toneColor = "#ff5a5a";
  } else if (t > 0.55) {
    label = "ОПАСНО";
    description = "Котёл перегревается";
    tone = "danger";
    toneColor = "#ff9a5a";
  }

  return {
    t, label, description, tone, toneColor, needleAngle,
    steamIntensity: clamp((t - 0.2) / 0.8, 0, 1),
    shakeIntensity: clamp((t - 0.5) / 0.5, 0, 1),
  };
}