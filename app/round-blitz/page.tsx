"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "./questions";
import Stopwatch from "./components/Stopwatch";
import GameStyles from "./GameStyles";

type AnswerStatus = "idle" | "correct" | "wrong";

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function RoundBlitzPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>("idle");
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [finalTime, setFinalTime] = useState(0);

  const handleTick = (seconds: number) => {
    if (!isFinished) setFinalTime(seconds);
  };

  const handleOptionClick = (index: number) => {
    if (answerStatus !== "idle") return;

        setSelectedOption(index);

    const correct = questions[currentQuestion].correctAnswer;
    const isCorrect = index === correct;
    setAnswerStatus(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore((prev) => prev + 1);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOption(null);
        setAnswerStatus("idle");
      } else {
        setIsFinished(true);
      }
    }, 500);
  };

  if (isFinished) {
    const percent = Math.round((score / questions.length) * 100);

    return (
      <main className="blitz-page">
        <div className="blitz-question-container blitz-result">
          <div className="blitz-result-header">
            <span className="blitz-result-label">Результат</span>
          </div>

          <div className="blitz-result-score">
            {score} <span className="blitz-result-of">из {questions.length}</span>
          </div>

          <div className="blitz-result-accuracy">
            {percent}% правильных ответов
          </div>

          <div className="blitz-result-time">
            <span className="blitz-result-time-label">Время прохождения</span>
            <span className="blitz-result-time-value">{formatTime(finalTime)}</span>
          </div>

          <button
            className="blitz-next-btn"
            onClick={() => router.push("/rating")}
          >
            К рейтингу
          </button>
        </div>
        <GameStyles />
      </main>
    );
  }

  const question = questions[currentQuestion];

  return (
    <main className="blitz-page">
      <Stopwatch running={true} onTick={handleTick} />

      <div className="blitz-question-container">
        <div className="blitz-question-number">
          Вопрос {currentQuestion + 1} из {questions.length}
        </div>
        <div className="blitz-question-text">{question.question}</div>

        <div className="blitz-options">
          {question.options.map((option, index) => {
            let className = "blitz-option";
            if (selectedOption === index && answerStatus === "idle") {
              className += " blitz-option-selected";
            }
            if (answerStatus !== "idle") {
              if (index === question.correctAnswer) {
                className += " blitz-option-correct";
              } else if (index === selectedOption && answerStatus === "wrong") {
                className += " blitz-option-wrong";
              }
            }
            return (
              <button
                key={index}
                className={className}
                onClick={() => handleOptionClick(index)}
                disabled={answerStatus !== "idle"}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <GameStyles />
    </main>
  );
}