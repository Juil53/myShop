import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { handleIncreaseItem, handleNewItem } from "./logic";
import { style } from "./widgetStyle";

const WidgetCustomer = ({ customers, month }) => {
  let [data, setData] = useState(() => {
    return {
      title: "CUSTOMERS",
      link: "See all customers",
      amount: 10,
      icon: (
        <PersonOutlinedIcon
          style={{
            color: "crimson",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            borderRadius: "10px",
            fontSize: "3rem",
          }}
        />
      ),
    };
  });

  useEffect(() => {
    const newCustomers = handleNewItem(customers, month);
    const percentIncrease = handleIncreaseItem(newCustomers);
    setData({ ...data, amount: newCustomers, increase: percentIncrease });
  }, [customers, month]);

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
        <Typography sx={style.numberText}>{data.amount}</Typography>
      </CardContent>
      <CardActions sx={style.action}>
        <Link to="/admin/customers">
          <Button size="small" color="info">
            {data.link}
          </Button>
        </Link>
        {data.icon}
      </CardActions>
    </Card>
  );
};

export default WidgetCustomer;
