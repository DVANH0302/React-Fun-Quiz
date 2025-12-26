import { useContext, useEffect, useState } from "react";
import QuizSection from "./QuizSection";
import ResultSection from "./ResultSection";
import { useQuiz } from "../context/QuizContextProvider";

export default function QuizArea() {
  const { questionsBank, curIndex } = useQuiz();

  return (
    <div className="h-128 bg-gradient-to-r from-violet-900 to-indigo-900 flex flex-col items-center pt-12 space-y-4 rounded-3xl shadow-xl">
      {curIndex < questionsBank.length ? <QuizSection /> : <ResultSection />}
    </div>
  );
}
