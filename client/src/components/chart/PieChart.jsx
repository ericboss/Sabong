import "./piechart.css";
import React from "react";
import {ResponsiveContainer, PieChart, Tooltip, Pie, Sector, Cell } from "recharts";

const data = [
  { name: "Gold Agents", value: 400 },
  { name: "Direct Players", value: 300 },
  
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function PieCharts({title, pieChartData }) {
  return (
      <div className="piechart">
          <h3 className="piechartTitle">{title}</h3>
    
    <PieChart width={400} height={400} className="pie" >
      <Pie
        data={pieChartData}
        cx={120}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
     
        
    </PieChart>
   
    </div>
  );
}
