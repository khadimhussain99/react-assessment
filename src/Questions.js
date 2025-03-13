import React, { useEffect, useState } from "react";
import "./Questions.css";
import questionsData from "./questions.json";

const Questions = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [minScore, setMinScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    const formatedQuestions = questionsData.map((question) => {
      const correct_answer = decodeURIComponent(question.correct_answer);
      const incorrect_answers = question.incorrect_answers.map((answer) =>
        decodeURIComponent(answer)
      );
      const answerOptions = shuffleArray([
        ...incorrect_answers,
        correct_answer,
      ]);
      return {
        category: decodeURIComponent(question.category),
        type: question.type,
        difficulty: question.difficulty,
        question: decodeURIComponent(question.question),
        correct_answer: correct_answer,
        answers: answerOptions,
      };
    });
    setQuestions(formatedQuestions);
  }, []);

  useEffect(() => {
    const answeredQuestions = currentQuestionIndex + 1;
    const currentScore = (correctAnswers / answeredQuestions) * 100;
    const remainingQuestions = questions.length - answeredQuestions;
    const max =
      ((correctAnswers + remainingQuestions) / questions.length) * 100;
    const min = (correctAnswers / questions.length) * 100;

    console.log("Calculated Values:");
    console.log("minScore:", min, "score:", currentScore, "maxScore:", max);

    setScore(currentScore);
    setMaxScore(max);
    setMinScore(min);
  }, [currentQuestionIndex, questions.length, correctAnswers]);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRetryQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setQuizCompleted(false);
    setQuestions((prevQuestions) => {
      return prevQuestions.map((q) => ({
        ...q,
        answers: shuffleArray([...q.answers]),
      }));
    });
  };

  return (
    <section className="container">
      {questions.length && !quizCompleted ? (
        <div className="question-container">
          <div
            className={``}
            style={{
              width: `${(currentQuestionIndex / questions.length) * 100}%`,
              backgroundColor: "grey",
              height: "10px",
              marginBottom: "40px",
            }}
          />
          <div className="question-header">
            <div className="question-title">
              <h2>
                Question {currentQuestionIndex + 1} of {questions.length}
              </h2>
              <p className="question-category">
                {questions[currentQuestionIndex].category}
              </p>
              <div className="star-rating">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span
                    key={i}
                    className={` ${
                      questions[currentQuestionIndex].difficulty === "easy" &&
                      i === 0
                        ? "filled"
                        : questions[currentQuestionIndex].difficulty ===
                            "medium" && i <= 1
                        ? "filled"
                        : questions[currentQuestionIndex].difficulty ===
                            "hard" && i <= 3
                        ? "filled"
                        : "star"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="question-text">
            <p>{questions[currentQuestionIndex].question}</p>
          </div>

          <div className="answer-options">
            {questions[currentQuestionIndex].answers.map((ans, i) => {
              const isCorrect =
                ans === questions[currentQuestionIndex].correct_answer;

              const showCorrect =
                selectedAnswer && isCorrect && selectedAnswer !== ans;

              const showIncorrect = selectedAnswer === ans && !isCorrect;

              const correctSelected = selectedAnswer === ans && isCorrect;

              return (
                <button
                  key={i}
                  className={`answer-button ${
                    showCorrect
                      ? "highlight-correct"
                      : showIncorrect
                      ? "incorrect"
                      : correctSelected
                      ? "correct"
                      : selectedAnswer === ans
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleAnswerSelection(ans)}
                  disabled={selectedAnswer !== null}
                >
                  {ans}
                </button>
              );
            })}
          </div>

          <div className="action-buttons">
            {selectedAnswer && (
              <>
                <div
                  className={`result-message ${
                    selectedAnswer ===
                    questions[currentQuestionIndex].correct_answer
                      ? "correct"
                      : "incorrect"
                  }`}
                >
                  {selectedAnswer ===
                  questions[currentQuestionIndex].correct_answer
                    ? "Correct!"
                    : "Sorry!"}
                </div>
                <button
                  className="next-question-button"
                  disabled={selectedAnswer === null}
                  onClick={handleNextQuestion}
                >
                  {currentQuestionIndex < questions.length - 1
                    ? "Next Question"
                    : "See Results"}
                </button>
              </>
            )}
          </div>

          <div className="score-section">
            <div className="score-text">
              <span>Score: {score}%</span>
              <span className="max-score">Max Score: {maxScore}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-min" style={{ width: `${minScore}%` }} />
              <div className="progress-score" style={{ width: `${score}%` }} />
              <div className="progress-max" style={{ width: `${maxScore}%` }} />
            </div>
          </div>
        </div>
      ) : (
        <div className="quiz-completed">
          <h2>Quiz Completed!</h2>
          <div className="score-display">
            <p>
              Your Score: <span className="final-score">{score}</span> /{" "}
              {questions.length}
            </p>
            <p>Percentage: {(correctAnswers / questions.length) * 100}%</p>
          </div>
          <button className="retry-button" onClick={handleRetryQuiz}>
            Retry Quiz
          </button>
        </div>
      )}
    </section>
  );
};

export default Questions;
