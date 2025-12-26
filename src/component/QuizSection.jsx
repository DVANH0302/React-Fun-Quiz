import { useState, useEffect, useRef } from "react";
import { useQuiz } from "../context/QuizContextProvider";
export default function QuizSection() {
  const { questionsBank, score, curIndex, setCurIndex, timeOut } = useQuiz();
  const [timeLeft, setTimeLeft] = useState(timeOut);
  const [selectedOption, setSelectedOption] = useState(null);
  const hasAnswered = useRef(false);

  useEffect(() => {
    setTimeLeft(timeOut);
    setSelectedOption(null);
    hasAnswered.current = false;
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    const timer = setTimeout(() => {
      if (!hasAnswered.current) {
        score.current.push(-1);
      }
      if (curIndex < questionsBank.length) {
        setCurIndex((prev) => prev + 1);
      }
    }, timeOut * 1000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [curIndex]);

  const handleOptionClicked = (optionIndex, rightIndex) => {
    if (selectedOption === null) {
      setSelectedOption(optionIndex);
      hasAnswered.current = true;
      if (optionIndex === rightIndex) {
        score.current.push(1);
      } else {
        score.current.push(0);
      }
    } else {
      console.log("Already selected ", selectedOption);
    }
  };
  console.log(score);
  return (
    <>
      <progress
        value={timeLeft}
        max={timeOut}
        className="w-3/4 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-violet-400 [&::-webkit-progress-value]:transition-all [&::-webkit-progress-value]:duration-300 [&::-webkit-progress-value]:ease-linear [&::-moz-progress-bar]:bg-violet-400 [&::-moz-progress-bar]:transition-all [&::-moz-progress-bar]:duration-1000 [&::-moz-progress-bar]:ease-linear"
      ></progress>
      <h2 className="text-3xl font-bold"> {questionsBank[curIndex].q}</h2>
      <ul className="flex flex-col space-y-2 w-3/4">
        {questionsBank[curIndex].o.map((option, index) => {
          let rightIndex = questionsBank[curIndex].a;
          let bgColor;
          if (selectedOption !== null) {
            if (index !== rightIndex && index !== selectedOption) {
              bgColor = "bg-sky-300/50";
            }
            if (index === selectedOption) {
              bgColor = "bg-yellow-300/50";
            }
            if (index === rightIndex) {
              bgColor = "bg-green-300/50";
            }
            if (index === rightIndex && index === selectedOption) {
              bgColor = "bg-green-300/50";
            }
          } else {
            bgColor = "bg-sky-300/50";
          }

          return (
            <li
              key={index}
              className={`text-xl ${bgColor} p-6 rounded-2xl text-center transition duration-300 ease-in-out transform hover:scale-105`}
              onClick={() => handleOptionClicked(index, rightIndex)}
            >
              {option}
            </li>
          );
        })}
      </ul>
    </>
  );
}
