import React from "react";
import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import StoreIcon from "@mui/icons-material/Store";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";

const Widget = ({ type }) => {
  let data;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        link: "See more users",
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
      break;
    case "product":
      data = {
        title: "PRODUCTS",
        link: "View all products",
        amount: 20,
        icon: (
          <Inventory2OutlinedIcon
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
              borderRadius: "10px",
              fontSize: "3rem",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
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
      break;
    case "profit":
      data = {
        title: "EARNINGS",
        link: "View detail",
        amount: 1000,
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
      break;
    default:
      break;
  }

  const cardStyle = {
    transform: "translateY(0)",
    transition: "all 300ms",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "4px 6px 30px 1px rgba(0,0,0,0.59)",
      transform: "translateY(-5px)",
    },
  };

  return (
    <Card elevation={5} sx={cardStyle}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography
            sx={{ fontSize: "2rem", fontWeight: "400" }}
            color="text.secondary"
            gutterBottom
          >
            {data.title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ArrowUpwardOutlinedIcon color="success" />
            <Typography>20%</Typography>
          </Box>
        </Box>
        <Typography sx={{ fontSize: "3.5rem", fontWeight: "500" }} color="text.primary">
          {data.amount}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button size="small" color="info">
          {data.link}
        </Button>
        {data.icon}
      </CardActions>
    </Card>
  );
};

export default Widget;
