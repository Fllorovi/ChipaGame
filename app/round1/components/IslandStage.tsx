"use client";

import { useEffect } from "react";
import type { Zone } from "../zones";

type Props = {
  zones: Zone[];
  unlockedZones: number[];
  completedZones: number[];
  failedZones: number[];
  disabled: boolean;
  onZoneClick: (index: number) => void;
};

// 5 заданий — слои поверх базовой картинки 0.png
const TASK_LAYERS = [1, 2, 3, 4, 5];

const getLayerSrc = (taskNumber: number, isCompleted: boolean) =>
  `/round1/${taskNumber}_${isCompleted ? 1 : 0}.png`;

export default function IslandStage({
  zones,
  unlockedZones,
  completedZones,
  failedZones,
  disabled,
  onZoneClick,
}: Props) {
  // Подгружаем все варианты картинок заранее,
  // чтобы при смене _0 -> _1 не было мигания/задержки
  useEffect(() => {
    TASK_LAYERS.forEach((n) => {
      [0, 1].forEach((s) => {
        const img = new Image();
        img.src = `/round1/${n}_${s}.png`;
      });
    });
  }, []);

  return (
    <div className="island-stage">
      {/* Стопка фотографий острова */}
      <div className="island-photo-stack">
        <img
          src="/round1/0.png"
          alt="Остров"
          className="island-photo island-photo-base"
          draggable={false}
        />

        {TASK_LAYERS.map((n) => {
          const isCompleted = completedZones.includes(n - 1);
          return (
            <img
              // смена key => перемонтирование => плавное появление новой картинки
              key={`${n}-${isCompleted ? 1 : 0}`}
              src={getLayerSrc(n, isCompleted)}
              alt=""
              className="island-photo"
              draggable={false}
            />
          );
        })}
      </div>

      {/* Маркеры зон — как были */}
      {zones.map((zone, index) => {
        const isLocked = !unlockedZones.includes(index);
        const isCompleted = completedZones.includes(index);
        const isFailed = failedZones.includes(index);

        return (
          <button
            key={zone.id}
            type="button"
            title={isLocked ? "Зона заблокирована" : isCompleted ? "Зона пройдена" : isFailed ? "Зона провалена" : zone.name}
            onClick={() => onZoneClick(index)}
            disabled={disabled || isLocked || isCompleted || isFailed}
            className={`zone-marker ${isLocked ? "zone-marker-locked" : ""} ${isCompleted ? "zone-marker-completed" : ""} ${isFailed ? "zone-marker-failed" : ""}`}
            style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
          >
            {isLocked ? (
              <span className="zone-marker-lock">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              </span>
            ) : isCompleted ? (
              <span className="zone-marker-completed-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M20 6 9 17l-5-5" /></svg>
              </span>
            ) : isFailed ? (
              <span className="zone-marker-failed-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </span>
            ) : (
              <span className="zone-marker-ring">
                <span className="zone-marker-core" />
              </span>
            )}
            <span className="zone-marker-label">{zone.name}</span>
          </button>
        );
      })}
    </div>
  );
}