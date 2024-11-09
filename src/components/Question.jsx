import { useState } from "react";

import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";

import QUESTIONS from "../helpers/questions";

export default function Question({ onSelectAnswer, onSkipAnswer, questionIndex }) {

  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null,
  });

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 800;
  }

  function handleSelectAnswer(answerText) {
    setAnswer({
      selectedAnswer: answerText,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answerText,
        isCorrect: QUESTIONS[questionIndex].answers[0] === answerText,
      });

      setTimeout(() => {
        onSelectAnswer(answerText);
      }, 800)
    }, 1000);
  }

  let answerState = ''
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
    answerState = 'answered';
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        mode={answerState}
        timeout={timer}
        onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
      />
      <h2>{QUESTIONS[questionIndex].text}</h2>
      <Answers
        answers={QUESTIONS[questionIndex].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  )
}
