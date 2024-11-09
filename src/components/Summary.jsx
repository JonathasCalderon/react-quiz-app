import quizCompleteImg from '../assets/quiz-complete.png';

import QUESTIONS from '../helpers/questions';

export default function Summary({ userAnswers }) {

  const skippedAnswers =
    userAnswers.filter(answer => answer === null);
  const correctAnswers =
    userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0]);

  const skippedAnswersShare = Math.round((skippedAnswers.length / userAnswers.length) * 100);
  const correctAnswersShare = Math.round((correctAnswers.length / userAnswers.length) * 100);
  const wrongAnswerShare = 100 - skippedAnswersShare - correctAnswersShare;

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Trophy icon" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{`${skippedAnswersShare}%`}</span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">{`${correctAnswersShare}%`}</span>
          <span className="text">Answered Correctly</span>
        </p>
        <p>
          <span className="number">{`${wrongAnswerShare}%`}</span>
          <span className="text">Answered Incorrectly</span>
        </p>
      </div>
      <ol>
        {
          userAnswers.map((answer, index) => {
            let cssClass =
              `user-answer ${answer ? (answer === QUESTIONS[index].answers[0] ? "correct" : "wrong") : "skipped"}`

            return (
              <li key={index}>
                <h3>{index + 1}</h3>
                <p className="question">{QUESTIONS[index].text}</p>
                <p className={cssClass}>{answer ?? "skipped"}</p>
              </li>
            )
          })
        }
      </ol>
    </div>
  )
}
