"use client"
import React, { useState } from 'react';

const Page = () => {
  const [numberToGuess, setNumberToGuess] = useState(Math.floor(Math.random() * 100) + 1);
  const [userGuess, setUserGuess] = useState('');
  const [hint, setHint] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [win, setWin] = useState(false);

  const handleGuess = () => {
    if (userGuess.trim() !== '') {
      const userGuessNum = parseInt(userGuess);
      if (userGuessNum < numberToGuess) {
        setHint('Too low!');
      } else if (userGuessNum > numberToGuess) {
        setHint('Too high!');
      } else {
        setHint(`Congratulations! You guessed the number in ${attempts + 1} attempts.`);
        setWin(true);
      }
      setAttempts(attempts + 1);
      setUserGuess('');
    } else {
      setHint('Please enter a number!');
    }
  };

  const handlePlayAgain = () => {
    setNumberToGuess(Math.floor(Math.random() * 100) + 1);
    setUserGuess('');
    setHint('');
    setAttempts(0);
    setWin(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
        <h1 className="text-3xl font-bold mb-4">Guess My Number</h1>
        <p className="text-lg mb-4">Guess a number between 1 and 100</p>
        <input
          type="number"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          className="p-2 pl-10 text-sm text-white bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
        <button
          onClick={handleGuess}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out mt-2"
        >
          Guess
        </button>
        <p className="text-lg mb-4">{hint}</p>
        <p className="text-lg mb-4">Attempts: {attempts}</p>
        {win && (
  <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
    <div className="flex">
      <div className="w-16 h-16 bg-green-500 rounded-full animate-spin"></div>
      <div className="w-16 h-16 bg-green-500 rounded-full animate-spin"></div>
      <div className="w-16 h-16 bg-green-500 rounded-full animate-spin"></div>
    </div>
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out mt-8"
      onClick={handlePlayAgain}
    >
      Play Again
    </button>
  </div>
)}
      </div>
      
    </div>
  );
};

export default Page;