
"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function RoundTwoPromoPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.play().catch((error) => {
      console.error("Не удалось запустить промо:", error);
    });
  }, []);

  return (
    <main className="fixed inset-0 z-50 h-screen w-screen overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src="/videos/intro.mp4"
        autoPlay
        playsInline
        controls={false}
        onEnded={() => router.replace("/round2")}
      />
    </main>
  );
}
