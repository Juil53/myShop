import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { handleConvertNumberToMonth } from "./widget/logic";

const MonthChart = ({ aspect, title, customers, orders, month }) => {
  const [data, setData] = useState([
    {
      name: "Month",
      revenue: null,
      customer: null,
      date: [],
    },
  ]);

  console.log(data);

  useEffect(() => {
    const monthData = [
      {
        name: handleConvertNumberToMonth(month),
        revenue: 10,
        date: 5,
      },
      {
        name: handleConvertNumberToMonth(month),
        revenue: 5,
        date: 10,
      },
      {
        name: handleConvertNumberToMonth(month),
        revenue: 20,
        date: 15,
      },
    ];

    setData(monthData);
  }, []);

  return (
    <Box component={Paper} elevation={8} padding={2}>
      <Typography sx={{ fontSize: "2rem", fontWeight: "400" }} color="text.secondary">
        {title}
      </Typography>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="customer" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MonthChart;
