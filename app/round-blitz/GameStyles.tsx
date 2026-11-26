"use client";

export default function GameStyles() {
  return (
    <style jsx global>{`
      * { box-sizing: border-box; }
      html, body { margin: 0; overflow: hidden; background: #03172c; }

      .blitz-page {
        position: fixed;
        inset: 0;
        overflow: hidden;
        isolation: isolate;
        color: white;
        background: linear-gradient(135deg, #03172c 0%, #0a2540 50%, #03172c 100%);
        font-family: 'Inter', Arial, Helvetica, sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* ===== СЕКУНДОМЕР ===== */
      .blitz-stopwatch {
        position: absolute;
        top: 32px;
        left: 32px;
        z-index: 50;
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 14px 22px;
        background: rgba(3, 23, 44, 0.95);
        border: 2px solid rgba(85, 164, 254, 0.35);
        border-radius: 12px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(12px);
      }

      .blitz-stopwatch-head {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .blitz-stopwatch-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #55A4FE;
        box-shadow: 0 0 8px rgba(85, 164, 254, 0.8);
      }
      .blitz-stopwatch-dot.is-live {
        background: #39E875;
        box-shadow: 0 0 10px rgba(57, 232, 117, 0.9);
        animation: live-pulse 1.2s ease-in-out infinite;
      }
      .blitz-stopwatch-dot.is-done {
        background: #55A4FE;
        animation: none;
      }
      @keyframes live-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(0.8); }
      }

      .blitz-stopwatch-label {
        font-size: 9px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: rgba(105, 202, 255, 0.7);
      }

      .blitz-stopwatch-time {
        font-family: 'Courier New', monospace;
        font-size: 30px;
        font-weight: 900;
        color: white;
        line-height: 1;
        font-variant-numeric: tabular-nums;
      }

      /* ===== ВОПРОС ===== */
      .blitz-question-container {
        width: 100%;
        max-width: 800px;
        padding: 32px;
        background: rgba(3, 23, 44, 0.95);
        border: 2px solid rgba(85, 164, 254, 0.3);
        border-radius: 16px;
        box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(12px);
      }

      .blitz-question-number {
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.15em;
        color: rgba(105, 202, 255, 0.7);
        margin-bottom: 16px;
      }

      .blitz-question-text {
        font-size: 20px;
        font-weight: 600;
        line-height: 1.5;
        margin-bottom: 32px;
        color: white;
      }

      .blitz-options { display: flex; flex-direction: column; gap: 12px; }

      .blitz-option {
        padding: 16px 20px;
        background: rgba(255, 255, 255, 0.05);
        border: 2px solid rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        color: white;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: left;
      }
      .blitz-option:hover {
        background: rgba(85, 164, 254, 0.1);
        border-color: rgba(85, 164, 254, 0.5);
        transform: translateX(4px);
      }
      .blitz-option-selected {
        background: rgba(85, 164, 254, 0.2);
        border-color: #55A4FE;
        color: #69caff;
      }
      .blitz-option-correct {
        background: rgba(57, 232, 117, 0.2);
        border-color: #39E875;
        color: #39E875;
      }
      .blitz-option-wrong {
        background: rgba(255, 76, 76, 0.15);
        border-color: #FF4C4C;
        color: #FF4C4C;
        box-shadow: 0 0 20px rgba(255, 76, 76, 0.3);
        }

      .blitz-submit-btn {
        margin-top: 24px;
        padding: 14px 32px;
        background: linear-gradient(135deg, #55A4FE, #2b6cb0);
        border: none;
        border-radius: 10px;
        color: white;
        font-size: 14px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 4px 15px rgba(85, 164, 254, 0.3);
      }
      .blitz-submit-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(85, 164, 254, 0.5);
      }
      .blitz-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

/* ===== ФИНАЛ ===== */
.blitz-result { 
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.blitz-result-header {
  margin-bottom: 24px;
}

.blitz-result-label {
  font-size: 18px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(105, 202, 255, 0.8);
  margin-bottom: 16px;
}

.blitz-result-score {
  font-size: 64px;
  font-weight: 900;
  color: #55A4FE;
  line-height: 1;
  margin-bottom: 12px;
  text-shadow: 0 0 30px rgba(85, 164, 254, 0.5);
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 12px;
}

.blitz-result-of {
  font-size: 24px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
}

.blitz-result-accuracy {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 32px;
  letter-spacing: 0.05em;
}

.blitz-result-time {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px 32px;
  background: rgba(85, 164, 254, 0.08);
  border: 1px solid rgba(85, 164, 254, 0.2);
  border-radius: 12px;
  margin-bottom: 32px;
  width: 100%;
  max-width: 300px;
}

.blitz-result-time-label {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(105, 202, 255, 0.6);
}

.blitz-result-time-value {
  font-family: 'Courier New', monospace;
  font-size: 36px;
  font-weight: 900;
  color: #39E875;
  text-shadow: 0 0 20px rgba(57, 232, 117, 0.4);
  font-variant-numeric: tabular-nums;
}

.blitz-next-btn {
  padding: 16px 40px;
  background: linear-gradient(135deg, #39E875, #38a169);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 20px rgba(57, 232, 117, 0.4);
  margin-top: 8px;
}

.blitz-next-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(57, 232, 117, 0.6);
}
    `}</style>
  );
}