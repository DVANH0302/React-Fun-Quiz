import QuizLogo from "./assets/quiz-logo.png";
import QuizArea from "./component/QuizArea";
import QuizComplete from "./assets/quiz-complete.png";
import { useQuiz } from "./context/QuizContextProvider";
function App() {
  const { curIndex, questionsBank } = useQuiz();
  return (
    <div className="m-auto  w-1/2 h-screen my-16 flex flex-col space-y-12">
      <section className="flex flex-col items-center space-y-4 font-serif uppercase ">
        <img
          src={curIndex < questionsBank.length ? QuizLogo : QuizComplete}
          alt="quiz-logo"
          className="w-12 h-12"
        />
        <h1 className="text-5xl font-bold bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-transparent bg-clip-text">
          {curIndex < questionsBank.length ? "React Quiz" : "Completed"}
        </h1>
      </section>

      <QuizArea></QuizArea>
    </div>
  );
}

export default App;
