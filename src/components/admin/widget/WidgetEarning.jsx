import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatter } from "../../../utils/index";
import { handleIncreaseRevenue, handleRevenue } from "./logic";
import { style } from "./widgetStyle";

const WidgetEarning = ({ orders, month }) => {
  let [data, setData] = useState(() => {
    return {
      title: "REVENUE",
      link: "View detail",
      amount: 2400000,
      icon: (
        <MonetizationOnOutlinedIcon
          style={{
            backgroundColor: "rgba(0, 128, 0, 0.2)",
            color: "green",
            borderRadius: "10px",
            fontSize: "3rem",
          }}
        />
      ),
    };
  });

  useEffect(() => {
    const revenue = handleRevenue(orders, month);
    const percentIncrease = handleIncreaseRevenue(revenue.month);
    setData({
      ...data,
      revenueMonth: revenue.month,
      revenueDay: revenue.day,
      increase: percentIncrease,
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);

  return (
    <Card elevation={5} sx={style.cardStyle}>
      <CardContent>
        <Box sx={style.container}>
          <Typography sx={style.text} gutterBottom>
            {data.title}
          </Typography>

          <Box sx={style.container}>
            <ArrowUpwardOutlinedIcon color="success" />
            <Typography>{data?.increase}%</Typography>
          </Box>
        </Box>
        <Typography sx={style.numberText}>{formatter.format(data.revenueMonth)}</Typography>
      </CardContent>
      <CardActions sx={style.action}>
        <Link to="/admin/orders">
          <Button size="small" color="info">
            {data.link}
          </Button>
        </Link>
        {data.icon}
      </CardActions>
    </Card>
  );
};

export default WidgetEarning;
