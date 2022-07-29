import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import StoreIcon from "@mui/icons-material/Store";
import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { handleIncreaseOrders, handleNewOrders } from "./logic";
import { style } from "./widgetStyle";

const WidgetOrder = ({ orders, month }) => {
  let [data, setData] = useState(() => {
    return {
      title: "ORDERS",
      link: "View all orders",
      amount: 11,
      icon: (
        <StoreIcon
          style={{
            backgroundColor: "#539ec633",
            color: "blue",
            borderRadius: "10px",
            fontSize: "3rem",
          }}
        />
      ),
    };
  });

  useEffect(() => {
    const newOrders = handleNewOrders(orders, month);
    const percentIncrease = handleIncreaseOrders(newOrders);
    setData({ ...data, amount: newOrders, increase: percentIncrease });
  }, [orders, month]);

  return (
    <Card elevation={5} sx={style.cardStyle}>
      <CardContent>
        <Box sx={style.container}>
          <Typography sx={style.text} gutterBottom>
            {data.title}
          </Typography>

          <Box sx={style.container}>
            <ArrowUpwardOutlinedIcon color="success" />
            <Typography>{data.increase}</Typography>
          </Box>
        </Box>
        <Typography sx={style.numberText}>{data.amount}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
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

export default WidgetOrder;
