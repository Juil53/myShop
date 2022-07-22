import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, Box, Button, Grid, InputAdornment, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumb from "../../../../components/breadcumb/BreadCumb";
import { getCategoriesRequest } from "../../../../store/admin_product/productSlice";
import { selectCategories } from "../../../../store/admin_product/selector";
import { TextFieldCustom } from "../../../../styles/styled_components/styledComponent";
import ProductDataList from "./ProductDataList";

function ProductManagement() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [keyword, setKeyword] = useState("");

  const filterOptions = selectedFilter.map((selected, index) => {
    return Object.values(selected)[0];
  });

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

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
                label="Search"
                size="small"
                placeholder="name, brand, status,..."
                onChange={handleChange}
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
            <Button variant="contained" startIcon={<AddIcon />}>
              Add
            </Button>
          </Link>
        </Grid>
      </Grid>

      <Box>
        <ProductDataList filterOptions={filterOptions} keyword={keyword} />
      </Box>
    </>
  );
}

export default ProductManagement;
