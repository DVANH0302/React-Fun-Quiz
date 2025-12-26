import { createContext, useContext, useState, useRef } from "react";

const QuizContext = createContext();

export default function QuizContextProvider({ children }) {
  const questionsBank = [
    {
      q: "What's the most useless superpower?",
      o: [
        "Ability to talk to plants but they only complain",
        "Flying but only 2 inches off the ground",
        "Invisibility but only when nobody is looking",
        "Super strength but only for lifting feathers",
      ],
      a: 2,
    },
    {
      q: "If animals could talk, which would be the rudest?",
      o: [
        "Cats - they already judge you silently",
        "Geese - aggressive chaos incarnate",
        "Dolphins - too smart and they know it",
        "Seagulls - literal food thieves",
      ],
      a: 1,
    },
    {
      q: "What's the worst place to realize you forgot your phone?",
      o: [
        "On the toilet after you've already sat down",
        "At the airport security after checking in luggage",
        "During a boring 3-hour meeting",
        "In an elevator that just got stuck",
      ],
      a: 0,
    },
  ];
  const score = useRef([]);
  const [curIndex, setCurIndex] = useState(0);
  const timeOut = 10;
  return (
    <QuizContext.Provider
      value={{ questionsBank, score, curIndex, setCurIndex, timeOut }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  return useContext(QuizContext);
}
