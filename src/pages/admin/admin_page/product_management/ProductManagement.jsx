import React from "react";
import ProductTable from "./ProductTable";
import { SearchField } from "../../../../styles/styled_components/styledComponent";
import { InputAdornment, Button, Box } from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import SearchIcon from "@mui/icons-material/Search";

const product__search = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "2rem",
};

function ProductManagement() {
  return (
    <>
      <Box className="product__search" sx={product__search}>
        <SearchField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          label="Search..."
          size="small"
          sx={{ minWidth: "30%" }}
          // onChange={handleChange}
        />
        <Button
          variant="contained"
          color="success"
          size="small"
          startIcon={<AddBoxRoundedIcon />}
        >
          Add
        </Button>
      </Box>

      {/* ProductTable */}
      <div className="product__table">
        <ProductTable />
      </div>
    </>
  );
}

export default ProductManagement;
