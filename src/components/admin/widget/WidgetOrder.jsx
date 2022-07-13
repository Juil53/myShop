import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import StoreIcon from "@mui/icons-material/Store";
import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";

const WidgetOrder = () => {
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

export default WidgetOrder;
