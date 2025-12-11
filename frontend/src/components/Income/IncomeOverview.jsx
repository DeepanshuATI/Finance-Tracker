import React, { useEffect, useState } from 'react';
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../charts/CustomBarChart";
import { prepareIncomeBarChartData } from '../../utils/helper';
import PropTypes from 'prop-types';

const IncomeOverview = ({ transactions=[], onAddIncome }) => {
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      console.log("Validating transactions:", JSON.stringify(transactions, null, 2));

      if (!Array.isArray(transactions)) {
        throw new Error("Invalid transactions: Expected an array.");
      }

      const result = prepareIncomeBarChartData(transactions);
      console.log("Processed chart data:", result);

      if (!Array.isArray(result)) {
        throw new Error("prepareIncomeBarChartData returned an invalid result.");
      }

      setChartData(result);
      setError(null);
    } catch (err) {
      console.error("Error in IncomeOverview:", err.message, transactions);
      setChartData([]);
      setError(err.message);
    }
  }, [transactions]);

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <div>
          <h5 className='text-lg'>Income Overview</h5>
          <p className='text-xs text-gray-400 mt-0.5'>
            Track earnings over time and analyze your income.
          </p>
        </div>

        <button className='add-btn' onClick={onAddIncome}>
          <LuPlus className='text-lg' />
          Add Income
        </button>
      </div>

      <div className='mt-10'>
        {error ? (
          <div className='text-center text-red-500'>
            {error}
          </div>
        ) : chartData.length === 0 ? (
          <div className='text-center text-gray-400'>
            No income data available to display.
          </div>
        ) : (
          <CustomBarChart data={chartData} />
        )}
      </div>
    </div>
  );
};

IncomeOverview.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired, // Ensure karlena ki date strings valid  ho
      amount: PropTypes.number.isRequired,
      source: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAddIncome: PropTypes.func.isRequired,
};

export default IncomeOverview; 
