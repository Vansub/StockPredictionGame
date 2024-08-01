import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PredictionResult = ({ result, onBack }) => {
  const [showHint, setShowHint] = useState(false);

  const chartData = {
    labels: result.modelPredictions.map((_, index) => `Day ${index + 1}`),
    datasets: [
      {
        label: 'Model Predictions',
        data: result.modelPredictions,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Stock Price Predictions for Next 7 Days',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price ($)',
        },
      },
    },
  };

  const getScoreComment = (score) => {
    if (score === 0) return "Keep trying! Your prediction was off by more than 10%.";
    if (score < 50) return "Not bad, but there's room for improvement!";
    if (score < 80) return "Good job! Your prediction was quite close.";
    return "Excellent! Your prediction was very accurate.";
  };

  return (
    <div>
      <h2>Prediction Result</h2>
      <div>
        <h3>Details:</h3>
        <p>Your Prediction: ${result.userPrediction.toFixed(2)}</p>
        <p>Prediction Score: {result.score}</p>
        <p>{getScoreComment(result.score)}</p>
      </div>
      <button onClick={() => setShowHint(!showHint)}>
        {showHint ? 'Hide Hint' : 'Show Hint'}
      </button>
      {showHint && (
        <div>
          <div style={{ width: '80%', margin: 'auto' }}>
            <Line options={chartOptions} data={chartData} />
          </div>
          <div>
            <h3>Model Predictions:</h3>
            <ul>
              {result.modelPredictions.map((pred, index) => (
                <li key={index}>Day {index + 1}: ${pred.toFixed(2)}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <button onClick={onBack}>Back to Prediction</button>
    </div>
  );
};

export default PredictionResult;