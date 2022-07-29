import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { handleIncreaseProducts, handleNewItem } from "./logic";
import { style } from "./widgetStyle";

const WidgetProduct = ({ products, month }) => {
  let [data, setData] = useState(() => {
    return {
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
  });

  useEffect(() => {
    const newProducts = handleNewItem(products, month);
    const percentIncrease = handleIncreaseProducts(newProducts);
    setData({ ...data, amount: newProducts, increase: percentIncrease });
  }, [products, month]);

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
        <Link to={"/admin/products"}>
          <Button size="small" color="info">
            {data.link}
          </Button>
        </Link>
        {data.icon}
      </CardActions>
    </Card>
  );
};

export default WidgetProduct;
