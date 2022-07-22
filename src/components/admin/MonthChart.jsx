import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { handleDateOfMonth, handleRevenue } from "./widget/logic";

const MonthChart = ({ aspect, title, orders, month }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    handleDateOfMonth(month);
    const { date } = handleRevenue(orders, month);
    setData(date);
  }, [month,orders]);

  return (
    <Box component={Paper} elevation={8} padding={2}>
      <Typography sx={{ fontSize: "2rem", fontWeight: "400" }} color="text.secondary">
        {title}
      </Typography>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 30,
            right: 40,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis padding={{ top: 30 }} label={{ position: "top", angle: 0, value: "Revenue" }} />
          <Tooltip />
          <Area type="monotone" dataKey="revenue" stroke="crimson" fill="crimson" />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MonthChart;
