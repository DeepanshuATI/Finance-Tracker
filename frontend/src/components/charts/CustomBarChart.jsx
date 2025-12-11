{/*import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

const CustomBarChart = ({data}) => {

  const getBarColor = (index) => {
      return index%2 === 0 ? "#875cf5" : "#cfbefb";
  };

  const CustomTooltip = ({ active, payload }) => {
    if(active && payload && payload.length){
        return (
            <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
                <p className='text-xs font-semibold text-purple-800 mb-1'>{payload[0].payload.category}</p>
                <p className='text-sm text-gray-600'>
                    Amount: <span className='text-sm font-medium text-gray-900'>₹{payload[0].payload.amount}</span>
                </p>
            </div>
        );
    }
    return null;
  };

  return (
    <div className='bg-white mt-6'>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid stroke="none" />

                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555"}} stroke="none" />
                <YAxis tick={{ fontSize: 12, fill:"#555"}} stroke="none" />

                <Tooltip content={CustomTooltip} />

                <Bar dataKey="amount" fill="#FF8042" radius={[10, 10, 0, 0]} activeDot={{ r:8, fill:"yellow"}} activeStyle={{fill:"green"}} >
                    {data.map((entry, index) => (
                        <Cell key={index} fill={getBarColor(index)} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart */} 

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({ data }) => {
  // Define colors for bars based on index
  const getBarColor = (index) => {
    return index % 2 === 0 ? "#875cf5" : "#cfbefb";
  };

  // Custom tooltip for displaying additional details
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { category, amount } = payload[0].payload;

      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {category || "N/A"}
          </p>
          <p className="text-sm text-gray-600">
            Amount:{" "}
            <span className="text-sm font-medium text-gray-900">₹{amount}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Render chart
  return (
    <div className="bg-white mt-6 p-4 rounded-lg shadow-md">
      {Array.isArray(data) && data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis
              dataKey="category"
              tick={{ fontSize: 12, fill: "#555" }}
              stroke="none"
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#555" }}
              stroke="none"
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(index)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500">No data available</p>
      )}
    </div>
  );
};

export default CustomBarChart;

