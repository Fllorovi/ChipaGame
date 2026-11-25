"use client";

import { useEffect, useState } from "react";
import { zones } from "./zones";
import { ROUND_SECONDS, computeWaterLevel } from "./constants";
import Timer from "./components/Timer";
import ProgressBar from "./components/ProgressBar";
import MechanismBackground from "./components/MechanismBackground";
import MechanismWidget from "./components/MechanismWidget";
import MechanismStage from "./components/MechanismStage";
import DialogueModal from "./components/DialogueModal";
import TaskModal from "./components/TaskModal";
import GameStyles from "./components/GameStyles";
// ВОТ ЗДЕСЬ ИСПРАВЛЕН ПУТЬ: мы идем назад (..), затем в папку round1
import EndEarlyButton from "../round1/components/EndEarlyButton"; 

type SavedAnswer = {
  zone_id: number;
  selected_option: string;
  is_correct: boolean;
};

export default function RoundTwoPage() {
  const [selectedZone, setSelectedZone] = useState<number | null>(null);
  const [unlockedZones, setUnlockedZones] = useState<number[]>([0]);
  const [completedZones, setCompletedZones] = useState<number[]>([]);
  const [failedZones, setFailedZones] = useState<number[]>([]);

  const [modalState, setModalState] = useState<"none" | "dialogue" | "task">("none");
  const [dialoguePhase, setDialoguePhase] = useState<"intro" | "post">("intro");
  const [dialogueIndex, setDialogueIndex] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerStatus, setAnswerStatus] = useState<"idle" | "wrong" | "correct">("idle");

  const [waterLevel, setWaterLevel] = useState(computeWaterLevel(0, 0));

  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [secondsLeft, setSecondsLeft] = useState(ROUND_SECONDS);
  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const timeUp = secondsLeft === 0;

  const activeZone = selectedZone !== null ? zones[selectedZone] : null;

  useEffect(() => {
    async function loadProgress() {
      try {
        const response = await fetch("/api/round2/progress");
        
        if (!response.ok) {
            throw new Error("API недоступен");
        }

        const data = await response.json();
        const answers: SavedAnswer[] = data.answers ?? [];
        const completed = answers.filter((answer) => answer.is_correct).map((answer) => answer.zone_id - 1);
        const failed = answers.filter((answer) => !answer.is_correct).map((answer) => answer.zone_id - 1);
        const unlocked = Array.from(new Set([0, ...answers.map((answer) => answer.zone_id).filter((zoneId) => zoneId < zones.length)]));

        setCompletedZones(completed);
        setFailedZones(failed);
        setUnlockedZones(unlocked);
        setWaterLevel(computeWaterLevel(completed.length, failed.length));
      } catch (error) {
        console.warn("Ошибка API (играем локально):", error);
      } finally {
        setIsLoadingProgress(false);
      }
    }
    loadProgress();
  }, []);

  const handleZoneClick = (index: number) => {
    if (timeUp || isLoadingProgress || !unlockedZones.includes(index) || completedZones.includes(index) || failedZones.includes(index)) {
      return;
    }
    setSelectedZone(index);
    setDialoguePhase("intro");
    setModalState("dialogue");
    setDialogueIndex(0);
    setSelectedAnswer(null);
    setAnswerStatus("idle");
    setApiError(null);
  };

  const getDialoguesForPhase = () => {
    if (!activeZone) return [];
    if (dialoguePhase === "intro") return activeZone.dialogues;
    return answerStatus === "correct" ? activeZone.successDialogues : activeZone.failureDialogues;
  };

  const handleNextDialogue = () => {
    if (!activeZone) return;
    const currentDialogues = getDialoguesForPhase();

    if (dialogueIndex < currentDialogues.length - 1) {
      setDialogueIndex((prev) => prev + 1);
      return;
    }

    if (dialoguePhase === "intro") {
      setModalState("task");
      setSelectedAnswer(null);
      setAnswerStatus("idle");
    } else {
      setModalState("none");
      setSelectedZone(null);
      setSelectedAnswer(null);
      setAnswerStatus("idle");
    }
  };

  const handleSelectAnswer = (optionId: string) => {
    if (answerStatus !== "idle" || isSubmittingAnswer) return;
    setSelectedAnswer(optionId);
    setApiError(null);
  };

  const handleCheckAnswer = async () => {
    if (!selectedAnswer || !activeZone || selectedZone === null || isSubmittingAnswer) return;

    setIsSubmittingAnswer(true);
    setApiError(null);

    try {
      const response = await fetch("/api/round2/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zoneId: activeZone.id, optionId: selectedAnswer }),
      });

      if (!response.ok) throw new Error("Ошибка сервера");

      const data = await response.json();
      const isCorrect = data.is_correct;
      
      setAnswerStatus(isCorrect ? "correct" : "wrong");

      const nextCompleted = isCorrect ? Array.from(new Set([...completedZones, selectedZone])) : completedZones;
      const nextFailed = !isCorrect ? Array.from(new Set([...failedZones, selectedZone])) : failedZones;

      setCompletedZones(nextCompleted);
      setFailedZones(nextFailed);
      setWaterLevel(computeWaterLevel(nextCompleted.length, nextFailed.length));

      const nextIndex = selectedZone + 1;
      if (nextIndex < zones.length) {
        setUnlockedZones((prev) => prev.includes(nextIndex) ? prev : [...prev, nextIndex]);
      }
    } catch (error) {
      console.warn("Ошибка при отправке ответа (сохраняем локально):", error);
      setAnswerStatus("correct");
      setCompletedZones((prev) => [...prev, selectedZone]);
      
      const nextIndex = selectedZone + 1;
      if (nextIndex < zones.length) {
        setUnlockedZones((prev) => prev.includes(nextIndex) ? prev : [...prev, nextIndex]);
      }
    } finally {
      setIsSubmittingAnswer(false);
    }
  };

  const handleProceedAfterAnswer = () => {
    setDialoguePhase("post");
    setModalState("dialogue");
    setDialogueIndex(0);
  };

  const handleEndEarly = () => {
    setSecondsLeft(0); 
  };

  const currentDialogues = getDialoguesForPhase();

  return (
    <main className="mechanism-map">
      <EndEarlyButton onConfirm={handleEndEarly} />

      {isLoadingProgress && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0e14]">
          <div className="text-center">
            <div className="mb-4 text-lg font-bold text-[#d4af37]">Запуск механизма...</div>
            <div className="mx-auto h-2 w-48 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-[#d4af37]" />
            </div>
          </div>
        </div>
      )}

      {apiError && (
        <div className="fixed left-1/2 top-5 z-[90] w-[calc(100%-32px)] max-w-xl -translate-x-1/2 rounded-xl border border-red-500/40 bg-red-950/95 px-5 py-3 text-center text-sm text-red-200 shadow-xl">
          {apiError}
        </div>
      )}

      <Timer secondsLeft={secondsLeft} />
      <ProgressBar completed={completedZones.length} total={zones.length} />
      <MechanismWidget waterLevel={waterLevel} />
      <MechanismBackground />

      <MechanismStage
        zones={zones}
        unlockedZones={unlockedZones}
        completedZones={completedZones}
        failedZones={failedZones}
        disabled={isLoadingProgress || timeUp}
        onZoneClick={handleZoneClick}
      />

      <div className="map-footer">
        <span>МЕХАНИЧЕСКОЕ ЯДРО</span>
        <span>СИСТЕМА СТАБИЛИЗАЦИИ / ONLINE</span>
      </div>

      {modalState === "dialogue" && activeZone && (
        <DialogueModal
          dialogues={currentDialogues}
          dialogueIndex={dialogueIndex}
          dialoguePhase={dialoguePhase}
          answerStatus={answerStatus}
          onNext={handleNextDialogue}
        />
      )}

      {modalState === "task" && activeZone && (
        <TaskModal
          task={activeZone.task}
          selectedAnswer={selectedAnswer}
          answerStatus={answerStatus}
          isSubmitting={isSubmittingAnswer}
          apiError={apiError}
          onSelect={handleSelectAnswer}
          onCheck={handleCheckAnswer}
          onProceed={handleProceedAfterAnswer}
        />
      )}

      <GameStyles />
    </main>
  );
}