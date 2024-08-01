// GameInstructions.js
import React from 'react';

const GameInstructions = () => {
  return (
    <div className="game-instructions">
      <h2>How to Play the Stock Prediction Game</h2>
      <ol>
        <li>Select a stock from the dropdown menu.</li>
        <li>View the historical data and chart for the selected stock.</li>
        <li>Choose a future date for your prediction.</li>
        <li>Enter your prediction for the stock price on that date.</li>
        <li>Submit your prediction and see how it compares to the model's prediction.</li>
        <li>Earn points based on the accuracy of your prediction!</li>
      </ol>
      <p>Remember, the more accurate your predictions, the higher your score!</p>
    </div>
  );
};

export default GameInstructions;