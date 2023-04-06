import React, { useState, useEffect } from 'react';

const SummaryStats = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    
  }, []);

  const totalItems = data.length;
  const totalMarketableItems = data.filter(item => item.security_type_desc === 'Marketable').length;
  const totalNonMarketableItems = data.filter(item => item.security_type_desc === 'Non-Marketable').length;
  const avgInterestRate = data.reduce((total, item) => total + parseFloat(item.avg_interest_rate_amt), 0) / data.length;

  return (
    <div>
      <h2>Summary Statistics {props.searchTerm}</h2>
      <ul>
        <li>Total Items: {totalItems}</li>
        <li>Total Marketable Items: {totalMarketableItems}</li>
        <li>Total Non-Marketable Items: {totalNonMarketableItems}</li>
        <li>Average Interest Rate: {avgInterestRate.toFixed(2)}%</li>
      </ul>
    </div>
  );
};

export default SummaryStats;