{showStockList && (
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
)}