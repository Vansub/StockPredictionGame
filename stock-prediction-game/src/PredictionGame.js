import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import MovingAverageChart from './MovingAverageChart';

function PredictionGame() {
  const { symbol } = useParams();
  const location = useLocation();
  const { stockName, prediction } = location.state;

  const [userPrediction, setUserPrediction] = useState('');
  const [modelPrediction, setModelPrediction] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending prediction request for symbol:", symbol);  // Add this line
      const response = await axios.post('http://localhost:5000/predict', {
        symbol: symbol,
        date: new Date().toISOString().split('T')[0] // Current date
      });
      console.log("Received response:", response.data);  // Add this line
      setModelPrediction(response.data.prediction);
      
      // Compare predictions
      const userPredictionFloat = parseFloat(userPrediction);
      const modelPredictionFloat = parseFloat(response.data.prediction);
      const isCorrect = Math.abs(userPredictionFloat - modelPredictionFloat) < 1.0; // Within $1 range
  
      setResult({
        isCorrect,
        userPrediction: userPredictionFloat,
        modelPrediction: modelPredictionFloat
      });
    } catch (err) {
      console.error("Error in prediction request:", err.response ? err.response.data : err);  // Modify this line
      setError('Error fetching prediction. Please try again.');
    }
  };
  return (
    <div>
      <h1>Predict {stockName} ({symbol})</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          step="0.01"
          value={userPrediction}
          onChange={(e) => setUserPrediction(e.target.value)}
          placeholder="Enter your predicted value"
          required
        />
        <button type="submit">Submit Prediction</button>
      </form>
      {error && <p>{error}</p>}
      {result && (
        <div>
          <h2>Result:</h2>
          <p>Your prediction: ${result.userPrediction.toFixed(2)}</p>
          <p>Model prediction: ${result.modelPrediction.toFixed(2)}</p>
          <p>{result.isCorrect ? "Correct! Your prediction matches the model." : "Incorrect. Your prediction doesn't match the model."}</p>
        </div>
      )}
    </div>
  );
}

export default PredictionGame;