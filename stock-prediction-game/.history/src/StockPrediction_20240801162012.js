import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import MovingAverageChart from './MovingAverageChart';
import PredictionResult from './PredictionResult';
import GameInstructions from './GameInstructions';
import './StockPrediction.css';

function StockPrediction() {
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState(null);
  const [futureDates, setFutureDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [userPrediction, setUserPrediction] = useState('');
  const [predictionResult, setPredictionResult] = useState(null);
  const [error, setError] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [showPredictionResult, setShowPredictionResult] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [showStockList, setShowStockList] = useState(false);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/stocks');
      setStocks(response.data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
      setError('Error fetching stocks. Please try again.');
    }
  };

  const fetchStockData = useCallback(async () => {
    if (symbol.trim().length < 1) {
      setError('Please enter a valid stock symbol.');
      return;
    }
    try {
      console.log(`Fetching stock data for ${symbol}`);
      const response = await axios.get(`http://localhost:8080/api/stock/${symbol.toUpperCase()}`);
      console.log('Received stock data:', response.data);
      setStockData(response.data);
      if (response.data.futureDates && response.data.futureDates.length > 0) {
        console.log('Future dates:', response.data.futureDates);
        setFutureDates(response.data.futureDates);
        setSelectedDate(response.data.futureDates[0]);
      } else {
        console.warn('No future dates in the response');
        setFutureDates([]);
        setSelectedDate('');
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching stock data:', err.response ? err.response.data : err.message);
      setError(`Error fetching stock data: ${err.response?.data?.error || 'Please try again.'}`);
      setStockData(null);
      setFutureDates([]);
      setSelectedDate('');
    }
  }, [symbol]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symbol || !selectedDate || !userPrediction) {
      setError('Please enter a stock symbol, select a date, and enter your prediction.');
      return;
    }
    const predictionData = {
      symbol: symbol.toUpperCase(),
      date: selectedDate,
      userPrediction: parseFloat(userPrediction)
    };
    console.log('Submitting prediction data:', predictionData);
    try {
      const response = await axios.post('http://localhost:8080/api/predict', predictionData);
      console.log('Prediction response:', response.data);
      setPredictionResult(response.data);
      setTotalScore(prevScore => prevScore + response.data.score);
      setShowPredictionResult(true);
      setError(null);
    } catch (err) {
      console.error('Error submitting prediction:', err);
      if (err.response) {
        console.error('Error response data:', err.response.data);
        setError(`Error submitting prediction: ${err.response.data.error || err.response.statusText}`);
      } else {
        setError(`Error submitting prediction: ${err.message}`);
      }
      setPredictionResult(null);
    }
  };

  const handleBack = () => {
    setShowPredictionResult(false);
    setUserPrediction('');
  };

  if (showPredictionResult) {
    return <PredictionResult result={predictionResult} onBack={handleBack} />;
  }

  return (
    <div className="stock-prediction">
      <header>
        <h1>Stock Prediction Game</h1>
        <div className="total-score">Total Score: {totalScore}</div>
      </header>

      <div className="main-content">
        <div className="left-panel">
          <button onClick={() => setShowInstructions(!showInstructions)}>
            {showInstructions ? 'Hide Instructions' : 'Show Instructions'}
          </button>
          {showInstructions && <GameInstructions />}
          
          <div className="stock-input">
            <input 
              type="text" 
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              placeholder="Enter stock symbol"
            />
            <button onClick={fetchStockData}>Fetch Stock Data</button>
          </div>

          {stockData && (
            <div className="prediction-form">
              <select 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <option value="">Select a date</option>
                {futureDates.map(date => (
                  <option key={date} value={date}>{date}</option>
                ))}
              </select>
              <form onSubmit={handleSubmit}>
                <input 
                  type="number" 
                  value={userPrediction} 
                  onChange={(e) => setUserPrediction(e.target.value)} 
                  placeholder="Enter your prediction" 
                  required 
                />
                <button type="submit">Submit Prediction</button>
              </form>
            </div>
          )}

          {error && <p className="error">{error}</p>}
        </div>

        <div className="right-panel">
          <button onClick={() => setShowStockList(!showStockList)}>
            {showStockList ? 'Hide Stock List' : 'Show Stock List'}
          </button>
          {showStockList && (
            <div className="stock-list">
              <table>
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th>Sector</th>
                    <th>Risk Level</th>
                  </tr>
                </thead>
                <tbody>
                  {stocks.map((stock) => (
                    <tr key={stock.symbol}>
                      <td>{stock.symbol}</td>
                      <td>{stock.name}</td>
                      <td>{stock.sector}</td>
                      <td>{stock.risk_level}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {stockData && (
  <div className="chart-container">
    <MovingAverageChart 
      data={stockData} 
      width={600}  // Adjust  as needed
      height={300} // Adjust  as needed
    />
  </div>
)}
    </div>
  );
}

export default StockPrediction;