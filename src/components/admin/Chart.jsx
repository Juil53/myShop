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
  YAxis
} from "recharts";
import { handleIncreaseItem, handleIncreaseRevenue, handleNewItem, handleRevenue, handleSixMonthData } from "./widget/logic";

const Chart = ({ aspect, title, customers,orders,month }) => {
  
  const [data, setData] = useState([
    {
      name: "January",
      revenue: 70,
      customer: 1,
    },
    {
      name: "Febuary",
      revenue: 40,
      customer: 12,
    },
    {
      name: "March",
      revenue: 90,
      customer: 5,
    },
    {
      name: "April",
      revenue: 50,
      customer: 7,
    },
    {
      name: "May",
      revenue: 70,
      customer: 2,
    },
    {
      name: "June",
      revenue: 20,
      customer: 3,
    },
  ]);

  useEffect(() => {
    const newCustomers = handleNewItem(customers,month);
    const percentIncrease = handleIncreaseItem(newCustomers);
    const monthlyRevenue = handleRevenue(orders)
    const percentIncreaseRevenue = handleIncreaseRevenue(monthlyRevenue.month)
    const newData = handleSixMonthData(data, { name: "July", revenue: percentIncreaseRevenue, customer: percentIncrease });
    setData(newData)
  }, []);

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
