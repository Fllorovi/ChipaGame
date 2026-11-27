
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { zones } from "./zones";
import { tasks } from "./tasks";
import { ROUND_SECONDS, computeWaterLevel } from "./constants";
import Timer from "./components/Timer";
import ProgressBar from "./components/ProgressBar";
import OceanBackground from "./components/OceanBackground";
import IslandWidget from "./components/IslandWidget";
import IslandStage from "./components/IslandStage";
import DialogueModal from "./components/DialogueModal";
import TaskModal from "./components/TaskModal";
import ZoneBackground from "./components/ZoneBackground";
import GameStyles from "./components/GameStyles";
import EndEarlyButton from "./components/EndEarlyButton";

type SavedAnswer = {
  zone_id: number;
  selected_option: string;
  is_correct: boolean;
};

export default function RoundOnePage() {
  const [selectedZone, setSelectedZone] = useState<number | null>(null);
  const [unlockedZones, setUnlockedZones] = useState<number[]>([0]);
  const [completedZones, setCompletedZones] = useState<number[]>([]);
  const [failedZones, setFailedZones] = useState<number[]>([]);

  const [modalState, setModalState] = useState<"none" | "dialogue" | "task">("none");
  const [dialoguePhase, setDialoguePhase] = useState<"intro" | "post">("intro");
  const [dialogueIndex, setDialogueIndex] = useState(0);

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

  useEffect(() => {
    if (timeUp) {
      const supabase = createClient();

      async function signOut() {
        await supabase.auth.signOut();
      }

      void signOut();
    }
  }, [timeUp]);

  const activeZone = selectedZone !== null ? zones[selectedZone] : null;

  // Загружаем сохранённый прогресс
  useEffect(() => {
    async function loadProgress() {
      try {
        const response = await fetch("/api/round1/progress");

        const contentType = response.headers.get("content-type");

        if (!contentType || !contentType.includes("application/json")) {
          console.warn("API вернул не JSON. Игра запущена без загрузки прошлого прогресса.");
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? "Не удалось загрузить прогресс");
        }

        const answers: SavedAnswer[] = data.answers ?? [];

        const completed = answers
          .filter((answer) => answer.is_correct)
          .map((answer) => answer.zone_id - 1);

        const failed = answers
          .filter((answer) => !answer.is_correct)
          .map((answer) => answer.zone_id - 1);

        const unlocked = Array.from(
          new Set([
            0,
            ...answers
              .map((answer) => answer.zone_id)
              .filter((zoneId) => zoneId < zones.length),
          ])
        );

        setCompletedZones(completed);
        setFailedZones(failed);
        setUnlockedZones(unlocked);

        setWaterLevel(
          computeWaterLevel(completed.length, failed.length)
        );
      } catch (error) {
        console.error("Ошибка загрузки прогресса:", error);
      } finally {
        setIsLoadingProgress(false);
      }
    }

    void loadProgress();
  }, []);

  const handleZoneClick = (index: number) => {
    if (
      timeUp ||
      isLoadingProgress ||
      !unlockedZones.includes(index) ||
      completedZones.includes(index) ||
      failedZones.includes(index)
    ) {
      return;
    }

    setSelectedZone(index);
    setDialoguePhase("intro");
    setModalState("dialogue");
    setDialogueIndex(0);
    setAnswerStatus("idle");
    setApiError(null);
  };

  const getDialoguesForPhase = () => {
    if (!activeZone) return [];

    if (dialoguePhase === "intro") {
      return activeZone.dialogues;
    }

    return answerStatus === "correct"
      ? activeZone.successDialogues
      : activeZone.failureDialogues;
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
      setAnswerStatus("idle");
    } else {
      setModalState("none");
      setSelectedZone(null);
      setAnswerStatus("idle");
    }
  };

  // Проверка ответов на сервере
  const handleCheckAnswer = async (
    answers: Record<string, string>
  ) => {
    if (!activeZone || selectedZone === null || isSubmittingAnswer) {
      return;
    }

    setIsSubmittingAnswer(true);
    setApiError(null);

    try {
      const taskDef = tasks[activeZone.id];
      const inputs = taskDef.inputs;

      if (inputs.length !== 3) {
        throw new Error("В задании должно быть ровно три поля");
      }

      const cleanAnswers = {
        a: (answers[inputs[0].id] || "").trim(),
        b: (answers[inputs[1].id] || "").trim(),
        c: (answers[inputs[2].id] || "").trim(),
      };

      if (
        !cleanAnswers.a ||
        !cleanAnswers.b ||
        !cleanAnswers.c
      ) {
        setApiError("Заполни все три поля");
        return;
      }

      const response = await fetch("/api/round1/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          zoneId: activeZone.id,
          answers: cleanAnswers,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Не удалось проверить ответ"
        );
      }

      if (typeof data.is_correct !== "boolean") {
        throw new Error("Сервер вернул некорректный результат");
      }

      const isCorrect = data.is_correct;

      setAnswerStatus(isCorrect ? "correct" : "wrong");

      const nextCompleted = isCorrect
        ? Array.from(new Set([...completedZones, selectedZone]))
        : completedZones;

      const nextFailed = !isCorrect
        ? Array.from(new Set([...failedZones, selectedZone]))
        : failedZones;

      setCompletedZones(nextCompleted);
      setFailedZones(nextFailed);

      setWaterLevel(
        computeWaterLevel(
          nextCompleted.length,
          nextFailed.length
        )
      );

      const nextIndex = selectedZone + 1;

      if (nextIndex < zones.length) {
        setUnlockedZones((prev) =>
          prev.includes(nextIndex)
            ? prev
            : [...prev, nextIndex]
        );
      }
    } catch (error) {
      console.error("Round 1 answer error:", error);

      setApiError(
        error instanceof Error
          ? error.message
          : "Ошибка при проверке ответов"
      );
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
    <main className="island-map">
      <EndEarlyButton onConfirm={handleEndEarly} />

      {isLoadingProgress && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#03172c]">
          <div className="text-center">
            <div className="mb-4 text-lg font-bold text-[#69caff]">
              Загрузка игрового прогресса...
            </div>

            <div className="mx-auto h-2 w-48 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-[#55A4FE]" />
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

      <ProgressBar
        completed={completedZones.length}
        total={zones.length}
      />

      <IslandWidget waterLevel={waterLevel} />
      <OceanBackground />

      <IslandStage
        zones={zones}
        unlockedZones={unlockedZones}
        completedZones={completedZones}
        failedZones={failedZones}
        disabled={isLoadingProgress || timeUp}
        onZoneClick={handleZoneClick}
      />

      <div className="map-footer">
        <span>ОСТРОВНОЙ КОМПЛЕКС</span>
        <span>СИСТЕМА НАВИГАЦИИ / ONLINE</span>
      </div>

      {activeZone && (
        <ZoneBackground taskId={activeZone.id} />
      )}

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
          answerStatus={answerStatus}
          isSubmitting={isSubmittingAnswer}
          apiError={apiError}
          onCheck={handleCheckAnswer}
          onProceed={handleProceedAfterAnswer}
        />
      )}

      <GameStyles />
    </main>
  );
}
