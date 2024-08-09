// pages/index.js
"use client"
import React, { useState, useEffect, useCallback } from 'react';

export default function Game() {
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [obstacles, setObstacles] = useState([]);
  const [dinoY, setDinoY] = useState(350); // Dino's vertical position

  // Function to spawn obstacles with a delay
  const spawnObstacle = (type) => {
    setObstacles((obstacles) => [
      ...obstacles,
      { id: Date.now(), type, position: 800 },
    ]);
  };

  // Effect to increment score every second
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isGameOver) {
        setScore((score) => score + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isGameOver]);

  // Effect to spawn obstacles at different intervals
  useEffect(() => {
    const spawnCactus = setInterval(() => {
      if (!isGameOver) {
        spawnObstacle('cactus');
      }
    }, 3000);

    const spawnBird = setInterval(() => {
      if (!isGameOver) {
        spawnObstacle('bird');
      }
    }, 6000);

    return () => {
      clearInterval(spawnCactus);
      clearInterval(spawnBird);
    };
  }, [isGameOver]);

  const checkCollision = useCallback(() => {
    const dinoRect = { x: 50, y: dinoY, width: 50, height: 50 };

    obstacles.forEach((obstacle) => {
      const obstacleRect = {
        x: obstacle.position,
        y: obstacle.type === 'bird' ? 300 : 350,
        width: 50,
        height: 50,
      };
      if (
        dinoRect.x < obstacleRect.x + obstacleRect.width &&
        dinoRect.x + dinoRect.width > obstacleRect.x &&
        dinoRect.y < obstacleRect.y + obstacleRect.height &&
        dinoRect.y + dinoRect.height > obstacleRect.y
      ) {
        setIsGameOver(true);
      }
    });
  }, [obstacles, dinoY]);

  const handleJump = () => {
    if (!isGameOver && dinoY === 350) {
      setDinoY(200); // Move dino up
      setTimeout(() => setDinoY(350), 2000); // Move dino back down after 500ms
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'ArrowUp') {
        handleJump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleJump]);

  useEffect(() => {
    const updateGame = () => {
      if (!isGameOver) {
        setObstacles((obstacles) =>
          obstacles.map((obs) => ({ ...obs, position: obs.position - 10 }))
        );
        checkCollision();
      }
    };

    const interval = setInterval(updateGame, 100);

    return () => clearInterval(interval);
  }, [checkCollision, isGameOver]);

  return (
    <div className="relative w-[800px] h-[400px] bg-gray-100 border-2 border-gray-300 mx-auto my-20 overflow-hidden">
      <div className="absolute top-2 left-2 text-lg text-gray-800">
        Score: {score}
      </div>
      {isGameOver && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-gray-800">
          Game Over! Final Score: {score}
        </div>
      )}
      <div
        className="absolute bottom-0 left-[50px] w-[50px] h-[40px] bg-green-500"
        style={{ transform: `translateY(${dinoY - 350}px)` }}
      >
        {/* Dino is a green square */}
      </div>
      {obstacles.map((obstacle) => (
        <div
          key={obstacle.id}
          className={`absolute ${
            obstacle.type === 'bird' ? 'bottom-[200px] bg-blue-500' : 'bottom-0 bg-red-500'
          } w-[50px] h-[50px]`}
          style={{ left: obstacle.position }}
        >
          {/* Cactus is a red square, Bird is a blue square */}
        </div>
      ))}
    </div>
  );
}
