// pages/index.js
"use client"
import { useState } from 'react';

const Page = () => {
  const [wheelLabels, setWheelLabels] = useState([
    { name: 'Cash Prize $100', value: 100 },
    { name: 'Penalty -20 Points', value: -20 },
    { name: 'Cash Prize $200', value: 200 },
    { name: 'Penalty -10 Points', value: -10 },
    { name: 'Cash Prize $50', value: 50 },
  ]);
  const [currentUserScore, setCurrentUserScore] = useState(0);
  const [spunLabel, setSpunLabel] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [newLabelName, setNewLabelName] = useState('');
  const [newLabelValue, setNewLabelValue] = useState(0);

  const spinWheel = () => {
    setIsSpinning(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * wheelLabels.length);
      const selectedLabel = wheelLabels[randomIndex];
      setSpunLabel(selectedLabel);
      setCurrentUserScore(currentUserScore + selectedLabel.value);
      setIsSpinning(false);
    }, 3000); // wait for 3 seconds to simulate spinning
  };

  const addNewLabel = () => {
    if (newLabelName && newLabelValue) {
      setWheelLabels([...wheelLabels, { name: newLabelName, value: newLabelValue }]);
      setNewLabelName('');
      setNewLabelValue(0);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <h1 className="text-3xl font-bold text-white">Wheel of Fortune</h1>
      <div className="wheel-container relative w-96 h-96 z-0 md:w-128 md:h-128 lg:w-160 lg:h-160">
        <div className={`wheel absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 ${isSpinning ? 'animate-spin' : ''}`}>
          {wheelLabels.map((label, index) => (
            <div key={index} className="label absolute w-full h-full flex justify-center items-center text-white translate-y-1/2" style={{
              transform: `rotate(${(360 / wheelLabels.length) * index}deg) translate(0, -50%)`
            }}>
              <span className="label-text text-lg font-bold">{label.name}</span>
            </div>
          ))}
        </div>
      </div>
      <button onClick={spinWheel} className="px-4 py-2 z-10 bg-blue-500 mt-20 text-white rounded">
        Spin the Whee11
      </button>
      {spunLabel && (
        <div className="result text-white z-20">
          <h2 className="text-2xl font-bold">You landed on:</h2>
          <p className="text-xl">{spunLabel.name}</p>
          <p className="text-lg">Your new score: {currentUserScore}</p>
        </div>
      )}
      <div className="add-label-form mt-20">
        <input type="text" value={newLabelName} onChange={(e) => setNewLabelName(e.target.value)} placeholder="Label Name" className="px-4 py-2 bg-white text-black rounded" />
        <input type="number" value={newLabelValue} onChange={(e) => setNewLabelValue(parseInt(e.target.value))} placeholder="Points" className="px-4 py-2 bg-white text-black rounded" />
        <button onClick={addNewLabel} className="px-4 py-2 bg-blue-500 text-white rounded">
          Add Label
        </button>
      </div>
    </div>
  );
};

export default Page;