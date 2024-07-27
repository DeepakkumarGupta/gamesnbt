"use client"
import React, { useState, useEffect } from 'react';
import { questions } from '../../components/questions';

export default function Page() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [answerStatus, setAnswerStatus] = useState(null);

  useEffect(() => {
    // Shuffle questions
    const shuffled = questions.sort(() => Math.random() - 0.5).map(question => ({
      ...question,
      options: question.options.sort(() => Math.random() - 0.5), // Shuffle options
    }));
    setShuffledQuestions(shuffled);
  }, []);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    if (answer === shuffledQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      setAnswerStatus('correct');
    } else {
      setAnswerStatus('incorrect');
    }
    setTimeout(() => {
      setShowResult(false);
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswerStatus(null);
    }, 1000);
  };

  const getScoreMessage = () => {
    const percentage = (score / 10) * 100;
    if (percentage >= 95) {
      return 'Fabulous! You have great general knowledge!';
    } else if (percentage >= 90) {
      return 'Excellent! You have a good general knowledge!';
    } else if (percentage >= 80) {
      return 'Very good! Can do even better!';
    } else if (percentage >= 60) {
      return 'Good, but you can do better!';
    } else if (percentage >= 35) {
      return 'Very poor! Improve your general knowledge!';
    } else {
      return 'Go back to school idiot, you kindergartener';
    }
  };

  const handlePlayAgain = () => {
    setScore(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setShuffledQuestions(questions.sort(() => Math.random() - 0.5).map(question => ({
      ...question,
      options: question.options.sort(() => Math.random() - 0.5), // Shuffle options again
    })));
  };

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div className="bg-gray-800 p-12 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-8 text-white text-center">Quiz Game</h1>
        {currentQuestion < 10 && shuffledQuestions.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {shuffledQuestions[currentQuestion].question}
            </h2>
            <div className="flex flex-col gap-4">
              {shuffledQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`border-2 border-blue-400 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out ${
                    showResult
                      ? answerStatus === 'correct' && selectedAnswer === option
                        ? 'border-2 border-green-500 bg-green-500'
                        : answerStatus === 'incorrect' && selectedAnswer === option
                        ? 'border-2 border-red-500 bg-red-500'
                        : ''
                      : ''
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
        {currentQuestion >= 10 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Game Over!</h2>
            <p className="text-lg text-white">
              Your score is {score} out of 10
            </p>
            <p className="text-lg text-white">{getScoreMessage()}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
              onClick={handlePlayAgain}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </main>
  );
}