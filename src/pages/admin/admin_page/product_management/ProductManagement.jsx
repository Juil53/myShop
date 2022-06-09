import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, InputAdornment, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { TextFieldCustom } from "../../../../styles/styled_components/styledComponent";
import ProductTable from "./ProductTable";


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
        <TextFieldCustom
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          label="Search by Name"
          size="small"
          sx={{ minWidth: "10%" }}
        />
        <Link to="add">
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<AddBoxRoundedIcon />}
          >
            Add
          </Button>
        </Link>
      </Box>

      {/* ProductTable */}
      <Box>
        <ProductTable />
      </Box>
    </>
  );
}

export default ProductManagement;
