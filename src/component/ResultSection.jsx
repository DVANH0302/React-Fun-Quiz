import { useQuiz } from "../context/QuizContextProvider";

export default function ResultSection() {
  let { score } = useQuiz();
  score = score.current;

  let skippedCount = 0;
  let wrongCount = 0;
  let trueCount = 0;
  let total = score.length;
  for (const s of score) {
    if (s == -1) {
      skippedCount += 1;
    } else if (s == 0) {
      wrongCount += 1;
    } else if (s == 1) {
      trueCount += 1;
    }
  }
  let skippedPercentage = ((skippedCount / total) * 100).toFixed(1);
  let wrongPercentage = ((wrongCount / total) * 100).toFixed(1);
  let truePercentage = ((trueCount / total) * 100).toFixed(1);
  return (
    <div className="my-16 text-shadow-lg/50">
      {" "}
      <div className="flex space-x-8 p-8">
        <div className="flex flex-col text-center  space-y-2  text-yellow-300 ">
          {" "}
          <span className="text-5xl">{skippedPercentage} % </span>
          <span className="text-l uppercase">Skipped</span>
        </div>

        <div className="flex flex-col text-center space-y-2 text-red-300  ">
          {" "}
          <span className="text-5xl ">{wrongPercentage} % </span>
          <span className="text-l uppercase">Answered Incorrectly</span>
        </div>

        <div className="flex flex-col text-center  space-y-2 text-green-300  ">
          {" "}
          <span className="text-5xl">{truePercentage} % </span>
          <span className="text-l uppercase">Answered Correctly</span>
        </div>
      </div>
      <hr className="border-t border-gray-300 w-2/3 m-auto" />
    </div>
  );
}
