import React from "react";
import { Box, Button, InputAdornment, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { SearchField } from "../../../../styles/styled_components/styledComponent";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import SearchIcon from "@mui/icons-material/Search";
import OrderTable from "./OrderTable";
function OrderManagement() {

  const product__search = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "2rem",
    marginBottom: "2rem",
  };

  return (
    <>
      <Typography variant="h4" fontWeight={700}>
        Orders Management
      </Typography>
      <Box className="product__search" sx={product__search}>
        <SearchField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          label="Search by ID..."
          size="small"
          sx={{ minWidth: "10%" }}
        />
        <Link to="add-order">
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<AddBoxRoundedIcon />}
          >
            Add Order
          </Button>
        </Link>
      </Box>

      {/* ProductTable */}
      <div className="">
        <OrderTable/>
      </div>
    </>
  );
}

export default OrderManagement;
