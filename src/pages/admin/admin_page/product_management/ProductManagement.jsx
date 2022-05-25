import React from "react";
import { SearchField } from "../../../../styles/styled_components/styledComponent";
import { InputAdornment, Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ProductTable from "./ProductTable";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import SearchIcon from "@mui/icons-material/Search";

const product__search = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "2rem",
  marginBottom: "2rem",
};

function ProductManagement() {
  return (
    <>
      <Typography variant="h4" fontWeight={700}>
        Product Management
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
          label="Search by Name..."
          size="small"
          sx={{ minWidth: "10%" }}
          // onChange={handleChange}
        />
        <Link to="add-product">
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<AddBoxRoundedIcon />}
          >
            Add Product
          </Button>
        </Link>
      </Box>

      {/* ProductTable */}
      <div className="product__table">
        <ProductTable />
      </div>
    </>
  );
}

export default ProductManagement;
