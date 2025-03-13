import React, { useEffect, useState } from "react";
import "./Questions.css";
import questionsData from "./questions.json";

const MonopolyQuestion = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(67);
  const [maxScore, setMaxScore] = useState(75);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState();

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    // In a real app, you might update the score here based on correctness
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
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

  console.log(questions[0]);

  return (
    <section className="container">
      {questions.length ? (
        <div className="question-container">
          {/* <div
            className={``}
            style={{
              width: `${questions.length / currentQuestionIndex}%`,
              backgroundColor: "grey",
              height: "10px",
            }}
          ></div> */}
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
                      questions[currentQuestionIndex].difficulty === "medium" &&
                      i < 2
                        ? "star"
                        : questions[currentQuestionIndex].difficulty ===
                            "hard" && i === 2
                        ? "star"
                        : "filled"
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
            {questions[currentQuestionIndex].answers.map((ans, i) => (
              <button
                key={i}
                className={`answer-button ${
                  selectedAnswer === ans ? "selected" : ""
                }`}
                onClick={() => handleAnswerSelection(ans)}
              >
                {ans}
              </button>
            ))}
          </div>

          <div className="score-section">
            <div className="score-text">
              <span>Score: {score}%</span>
              <span className="max-score">Max Score: {maxScore}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-filled"
                style={{ width: `${score}%` }}
              ></div>
              <div
                className="progress-max"
                style={{ width: `${maxScore - score}%` }}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </section>
  );
};

export default MonopolyQuestion;
