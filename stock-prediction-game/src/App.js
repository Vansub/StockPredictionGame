import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StockPrediction from './StockPrediction';
import GamePlay from './GamePlay';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<StockPrediction />} />
          <Route path="/gameplay" element={<GamePlay />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;