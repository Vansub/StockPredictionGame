import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StockInput()  {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/predict/${encodeURIComponent(symbol)}`, { state: { stockName } });
  };
  return (
    <div>
      <h1>Stock Prediction Game</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={stockName}
          onChange={(e) => setStockName(e.target.value)}
          placeholder="Enter stock name"
          required
        />
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter stock symbol"
          required
        />
        <button type="submit">Start Prediction</button>
      </form>
    </div>
  );
}

export default StockInput;