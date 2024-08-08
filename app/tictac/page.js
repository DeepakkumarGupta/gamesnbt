// pages/index.js
"use client"
import { useState } from 'react';

const Page = () => {
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleCellClick = (index) => {
    if (winner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'X' : 'O';
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
    checkWinner(newBoard);
  };

  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const combination of winningCombinations) {
      if (
        board[combination[0]] &&
        board[combination[0]] === board[combination[1]] &&
        board[combination[0]] === board[combination[2]]
      ) {
        setWinner(board[combination[0]]);
        return;
      }
    }
    if (!board.includes('')) {
      setWinner('Tie');
    }
  };

  const handlePlayAgain = () => {
    setBoard(['', '', '', '', '', '', '', '', '']);
    setIsXTurn(true);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-zinc-800 to-zinc-600">
      <h1 className="text-4xl font-bold text-orange-400">Tic-Tac-Toe</h1>
      <div className="grid grid-cols-3 grid-rows-3 gap-2 mt-10">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`w-20 h-20 flex justify-center items-center border border-gray-500 cursor-pointer ${
              cell === 'X' ? 'bg-orange-400 text-white' : cell === 'O' ? 'bg-blue-400 text-white' : ''
            }`}
            onClick={() => handleCellClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner && (
        <div className="mt-10 text-green-800">
          {winner === 'Tie' ? 'It\'s a tie!' : `Player ${winner} wins!`}
          <button
            className="px-4 py-2 bg-orange-800 text-white rounded mt-5 hover:bg-orange-600 transition duration-300"
            onClick={handlePlayAgain}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;