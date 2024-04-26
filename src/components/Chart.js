'use client'
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


const Chart = ({groupedViews}) => {
    
  return (
    <ResponsiveContainer width='100%' height={200}>

    <LineChart
      width={730}
      height={250}
      data={groupedViews}
      margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
      >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="_id" />
      <YAxis />
      <Tooltip />

      
      <Line type="monotone" dataKey="count" stroke="#09f" strokeWidth='4'/>
    </LineChart>
        </ResponsiveContainer>
  );
};

export default Chart;
