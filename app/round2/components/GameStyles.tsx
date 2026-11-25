"use client";

export default function GameStyles() {
  return (
    <style jsx global>{`
      * { box-sizing: border-box; }
      html, body { margin: 0; overflow: hidden; background: #050505; }

      .mechanism-map {
        position: fixed; inset: 0; overflow: hidden; isolation: isolate;
        color: white; background: #050505; font-family: Arial, Helvetica, sans-serif;
      }

      .mech-bg {
        position: absolute; inset: 0;
        background: radial-gradient(circle at center, #1a1a1a 0%, #000 100%);
      }

      .steam {
        position: absolute; width: 400px; height: 400px; border-radius: 50%;
        background: radial-gradient(circle, rgba(200,200,200,0.05) 0%, transparent 70%);
        filter: blur(20px); animation: float 15s infinite ease-in-out; pointer-events: none;
      }
      .steam-1 { bottom: -100px; left: -100px; }
      .steam-2 { bottom: -50px; right: 10%; animation-delay: -5s; width: 600px; height: 600px; }
      .steam-3 { top: 20%; left: 30%; animation-delay: -10s; }

      @keyframes float {
        0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
        50% { transform: translateY(-50px) scale(1.1); opacity: 0.6; }
      }

      .mechanism-stage {
        position: absolute;
        width: min(100vw, 150vh);
        aspect-ratio: 1200 / 760;
        left: 50%; top: 50%; transform: translate(-50%, -50%);
      }

      .mech-art {
        width: 100%; height: 100%;
        filter: drop-shadow(0 20px 30px rgba(0,0,0,0.8));
      }

      .mech-marker {
        position: absolute; transform: translate(-50%, -50%);
        display: flex; flex-direction: column; align-items: center; gap: 8px;
        background: none; border: none; cursor: pointer; z-index: 5;
        transition: opacity 0.3s ease, filter 0.3s ease;
      }
      .mech-marker-inner {
        display: flex; align-items: center; justify-content: center;
        width: 45px; height: 45px; border-radius: 50%;
        border: 2px solid #d4af37; background: #111;
        color: #d4af37; font-weight: bold; font-size: 20px;
        box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
        transition: all 0.3s;
      }
      .mech-marker:hover:not(:disabled) .mech-marker-inner {
        transform: scale(1.2); box-shadow: 0 0 25px #d4af37;
      }
      .mech-marker-label {
        background: rgba(0,0,0,0.8); border: 1px solid #333;
        padding: 4px 8px; border-radius: 4px; font-size: 11px; text-transform: uppercase;
      }

      .mech-marker.locked { cursor: not-allowed; }
      .mech-marker.locked .mech-marker-inner { border-color: #444; color: #444; box-shadow: none; }
      .mech-marker.locked .mech-marker-label { opacity: 0.5; }
      
      .mech-marker.completed { cursor: default; }
      .mech-marker.completed .mech-marker-inner { border-color: #39E875; color: #39E875; box-shadow: 0 0 15px rgba(57, 232, 117, 0.4); }
      .mech-marker.completed .mech-marker-label { border-color: rgba(57, 232, 117, 0.5); color: #39E875; opacity: 1; }
      
      .mech-marker.failed { cursor: default; }
      .mech-marker.failed .mech-marker-inner { border-color: #ff4c4c; color: #ff4c4c; box-shadow: 0 0 15px rgba(255, 76, 76, 0.4); }
      .mech-marker.failed .mech-marker-label { border-color: rgba(255, 76, 76, 0.5); color: #ff4c4c; opacity: 1; }

      .map-footer {
        position: absolute; right: 38px; bottom: 38px;
        display: flex; flex-direction: column; gap: 7px;
        color: rgba(212, 175, 55, 0.4); font-size: 10px; font-weight: bold;
        text-align: right; z-index: 10;
        letter-spacing: 0.15em;
      }

      @media (max-width: 700px) {
        .mech-marker-inner { width: 34px; height: 34px; font-size: 14px; }
        .mech-marker-label { max-width: 115px; overflow: hidden; font-size: 8px; text-overflow: ellipsis; }
        .map-footer { display: none; }
      }
    `}</style>
  );
}