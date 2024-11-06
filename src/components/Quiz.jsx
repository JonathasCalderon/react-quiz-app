import { useCallback, useState } from "react";

import QUESTIONS from '../helpers/questions.js';

import quizCompletedImg from '../assets/quiz-complete.png';
import QuestionTimer from "./QuestionTimer.jsx";

function Quiz() {

  const [answerState, setAnswerState] = useState("");
  const [ userAnswers, setUserAnswers ] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsCompleted = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback((selectedAnswer) => {
    setAnswerState('answered');
    setUserAnswers(prev => [...prev, selectedAnswer]);

    setTimeout(() => {
      if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
        setAnswerState('correct');
      } else {
        setAnswerState('wrong');
      }
    }, 1000);
  }, [activeQuestionIndex]);

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

  if(quizIsCompleted) {
    return (
      <div id="summary">
        <img src={quizCompletedImg} alt="Trophy Icon" />
      </div>
    )
  }

  const shuffeledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffeledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer 
          key={activeQuestionIndex} 
          timeout={10000} 
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {
            shuffeledAnswers.map(answer => (
              <li key={answer} className="answer">
                <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default Quiz;