import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import SearchIcon from "@mui/icons-material/Search";
import ProductTable from "./ProductTable";
import { Autocomplete, Box, Button, InputAdornment, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { TextFieldCustom } from "../../../../styles/styled_components/styledComponent";
import { selectCategories } from "../../../../store/admin_product/selector";
import { getCategoriesRequest } from "../../../../store/admin_product/productSlice";

const product__search = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "2rem",
  marginBottom: "2rem",
};

function ProductManagement() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [selectedFilter, setSelectedFilter] = useState([]);

  const filterOptions = selectedFilter.map((selected, index) => {
    return Object.values(selected)[0];
  });

  useEffect(() => {
    dispatch(getCategoriesRequest());
  }, []);

  return (
    <>
      <Typography variant="h4" fontWeight={700}>
        Product Management
      </Typography>

      <Box className="product__search" sx={product__search}>
        <Stack spacing={2}>
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

          <Autocomplete
            size="small"
            multiple
            id="tags-outlined"
            options={categories}
            getOptionLabel={(option) => option.name}
            value={selectedFilter}
            onChange={(event, newValue) => {
              setSelectedFilter(newValue);
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            filterSelectedOptions
            renderInput={(params) => (
              <TextFieldCustom
                {...params}
                label="Choose Filter Categories"
                placeholder="Categories"
              />
            )}
          />
        </Stack>

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

      <Box>
        <ProductTable filterOptions={filterOptions} />
      </Box>
    </>
  );
}

export default ProductManagement;
