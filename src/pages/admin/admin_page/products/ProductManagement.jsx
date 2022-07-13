import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, Box, Button, Grid, InputAdornment, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { TextFieldCustom } from "../../../../styles/styled_components/styledComponent";
import { selectCategories } from "../../../../store/admin_product/selector";
import { getCategoriesRequest } from "../../../../store/admin_product/productSlice";
import Breadcrumb from "../../../../components/breadcumb/BreadCumb";
import ProductList from "./ProductList";
import ProductDataList from "./ProductDataList";

function ProductManagement() {
  const pages = [
    {
      name: "Admin",
      url: "/admin",
    },
    {
      name: "Products",
      url: "/admin/products",
    },
  ];
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
      <Breadcrumb pages={pages} />
      <Typography variant="h4" fontWeight={400}>
        Product Management
      </Typography>

      <Grid container justifyContent="space-between" my={2}>
        <Grid item xs={8}>
          <Grid container spacing={3}>
            <Grid item>
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
              />
            </Grid>

            <Grid item xs={4}>
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
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={1} textAlign="right">
          <Link to="add">
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              startIcon={<AddIcon />}
            >
              Add
            </Button>
          </Link>
        </Grid>
      </Grid>

      <Box>
        {/* <ProductList filterOptions={filterOptions} /> */}

        <ProductDataList/>
      </Box>
    </>
  );
}

export default ProductManagement;
