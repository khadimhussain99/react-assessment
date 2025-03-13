import React, { useEffect, useState } from "react";
import "./Questions.css";
import questionsData from "./questions.json";

const MonopolyQuestion = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(67);
  const [maxScore, setMaxScore] = useState(75);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    // In a real app, you might update the score here based on correctness
  };

  useEffect(() => {
    setQuestions(questionsData);
  }, []);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  console.log(questions[0]);

  return (
    <section className="container">
      <div className="question-container">
        <div className="question-header">
          <div className="question-title">
            <h2>Question 16 of 20</h2>
            <p className="question-category">Entertainment: Board Games</p>
            <div className="star-rating">
              <span className="star filled">★</span>
              <span className="star filled">★</span>
              <span className="star filled">★</span>
            </div>
          </div>
        </div>

        <div className="question-text">
          <p>
            At the start of a standard game of the Monopoly, if you throw a
            double six, which square would you land on?
          </p>
        </div>

        <div className="answer-options">
          <button
            className={`answer-button ${
              selectedAnswer === "electric" ? "selected" : ""
            }`}
            onClick={() => handleAnswerSelection("electric")}
          >
            Electric Company
          </button>

          <button
            className={`answer-button ${
              selectedAnswer === "water" ? "selected" : ""
            }`}
            onClick={() => handleAnswerSelection("water")}
          >
            Water Works
          </button>

          <button
            className={`answer-button ${
              selectedAnswer === "chance" ? "selected" : ""
            }`}
            onClick={() => handleAnswerSelection("chance")}
          >
            Chance
          </button>

          <button
            className={`answer-button ${
              selectedAnswer === "community" ? "selected" : ""
            }`}
            onClick={() => handleAnswerSelection("community")}
          >
            Community Chest
          </button>
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
    </section>
  );
};

export default MonopolyQuestion;
