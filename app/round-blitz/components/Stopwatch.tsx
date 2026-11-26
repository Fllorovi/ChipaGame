"use client";

import { useEffect, useState } from "react";

type Props = {
  running: boolean;
  /** колбэк для передачи времени наверх (для финала) */
  onTick?: (seconds: number) => void;
};

function format(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${String(h).padStart(2, "0")}:${mm}:${ss}` : `${mm}:${ss}`;
}

export default function Stopwatch({ running, onTick }: Props) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setElapsed((e) => {
        const next = e + 1;
        onTick?.(next);
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, onTick]);

  return (
    <div className="blitz-stopwatch">
      <div className="blitz-stopwatch-head">
        <span className={`blitz-stopwatch-dot ${running ? "is-live" : "is-done"}`} />
        <span className="blitz-stopwatch-label">
          {running ? "ХРОНОМЕТР" : "ФИНИШ"}
        </span>
      </div>
      <span className="blitz-stopwatch-time">{format(elapsed)}</span>
    </div>
  );
}