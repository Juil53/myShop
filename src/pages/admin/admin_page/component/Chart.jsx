import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Paper, Typography } from "@mui/material";

const Chart = () => {
  const data = [
    {
      name: "January",
      Revenue: 1000,
      Profit: 700,
    },
    {
      name: "Febuary",
      Revenue: 1400,
      Profit: 1000,
    },
    {
      name: "March",
      Revenue: 1900,
      Profit: 1700,
    },
    {
      name: "April",
      Revenue: 2900,
      Profit: 2500,
    },
    {
      name: "May",
      Revenue: 1700,
      Profit: 1400,
    },
    {
      name: "June",
      Revenue: 1200,
      Profit: 900,
    },
  ];

  return (
    <Box component={Paper} elevation={8} padding={2}>
      <Typography
        sx={{ fontSize: "2rem", fontWeight: "400", marginY: "1rem" }}
        color="text.secondary"
      >
        TOTAL REVENUE
      </Typography>
      <ResponsiveContainer width="100%" aspect={2 / 1}>
        <BarChart
          width={500}
          height={500}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Revenue" fill="green" />
          <Bar dataKey="Profit" fill="#133f63" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Chart;
