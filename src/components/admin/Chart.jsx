import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  handleIncreaseItem,
  handleIncreaseRevenue,
  handleNewItem,
  handleRevenue,
  handleSixMonthData,
} from "./widget/logic";

const Chart = ({ aspect, title, customers, orders, month }) => {
  const [data, setData] = useState([
    {
      name: "January",
      revenue: 700,
      customer: 100,
    },
    {
      name: "Febuary",
      revenue: 400,
      customer: 120,
    },
    {
      name: "March",
      revenue: 350,
      customer: 500,
    },
    {
      name: "April",
      revenue: 750,
      customer: 100,
    },
    {
      name: "May",
      revenue: 970,
      customer: 100,
    },
    {
      name: "June",
      revenue: 700,
      customer: 100,
    },
  ]);

  useEffect(() => {
    const newCustomers = handleNewItem(customers, month);
    const percentIncrease = handleIncreaseItem(newCustomers);
    const monthlyRevenue = handleRevenue(orders, month);
    const percentIncreaseRevenue = handleIncreaseRevenue(monthlyRevenue.month);
    const newData = handleSixMonthData(data, {
      name: "July",
      revenue: percentIncreaseRevenue,
      customer: percentIncrease,
    });
    setData(newData);
  }, [month]);

  return (
    <Box component={Paper} elevation={8} padding={2}>
      <Typography sx={{ fontSize: "2rem", fontWeight: "400" }} color="text.secondary">
        {title}
      </Typography>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <BarChart
          data={data}
          margin={{
            top: 20,
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
          <Bar dataKey="revenue" fill="orange" />
          <Bar dataKey="customer" fill="#133f63" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Chart;
