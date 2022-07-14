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
import { handleIncreaseItem, handleNewItem } from "./widget/logic";

const Chart = ({ aspect, title, customers }) => {
  const [data, setData] = useState([
    {
      name: "January",
      revenue: 70,
      newCustomer: 1,
    },
    {
      name: "Febuary",
      revenue: 40,
      newCustomer: 12,
    },
    {
      name: "March",
      revenue: 90,
      newCustomer: 5,
    },
    {
      name: "April",
      revenue: 50,
      newCustomer: 7,
    },
    {
      name: "May",
      revenue: 70,
      newCustomer: 2,
    },
    {
      name: "June",
      revenue: 20,
      newCustomer: 3,
    },
  ]);

  useEffect(() => {
    const newCustomers = handleNewItem(customers);
    const percentIncrease = handleIncreaseItem(newCustomers);
    // console.log(percentIncrease);
    // setData([...data, { name: "July", revenue: 160, newCustomer: percentIncrease }]);
    // const currentArray = data.slice(0, 1);
    // setData([...currentArray, { name: "July", revenue: 160, newCustomer: percentIncrease }]);
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
          <Bar dataKey="newCustomer" fill="#133f63" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Chart;
