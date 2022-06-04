import React, { useEffect, useState } from "react";
import { FieldArray, useFormikContext } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { actGetCategories } from "../../../../../store/admin_product/action";
import { selectCategories } from "../../../../../store/admin_product/selector";
import {
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import CategoriesCheckBox from "./CategoriesCheckBox";

const CategoriesInput = () => {
  const dispatch = useDispatch();
  const [mainCate, setMainCate] = useState("");
  const {
    values: { categories },
    setFieldValue,
  } = useFormikContext();

  useEffect(() => {
    if (categories.length !== 0) {
      const category = categoriesData.find((category) => categories.includes(category.id))
      if (category) {
        setMainCate(category.id);
      }
    }
  }, [categories])

  const categoriesData = useSelector(selectCategories);

  // Lay ID tai parent Select so sanh vs Id Categories trong data, trung ID lay ra subCate data
  // map subCate data de render checkbox ben phai
  const categoriesDetail = () => {
    if (mainCate) {
      const { subCate = [] } =
        categoriesData.find((category) => category.id === mainCate) || {};

      return <CategoriesCheckBox subCate={subCate} />;
    }
  };

  const handleChangeCategories = (e) => {
    const value = e.target.value;
    setFieldValue("categories", [value]);
    setMainCate(value);
  };

  const categoryChips = (categoriesRemove) => {
    const category = categoriesData.find((category) => categories.includes(category.id))
    const categoryList = category ? [...category.subCate, category] : [];

    return categoryList
      .filter((category) => categories.includes(category.id))
      .map((category, index) => (
        <Chip
          key={`category_${index}`}
          label={category.name}
          onDelete={() => categoriesRemove(index)}
        />
      ));
  };

  return (
    <>
      <Grid container spacing={2}>
        <FieldArray name="categories">
          {({ insert, remove, push }) => (
            <>
              <Grid item xs={12}>
                <Stack direction="row" spacing={1}>
                  {/* {categories.map((category, index) => (
                    <Chip
                      key={`category_${index}`}
                      label={category}
                      onDelete={() => remove(index)}
                    />
                  ))} */}
                  {categoryChips(remove)}
                </Stack>
              </Grid>
            </>
          )}
        </FieldArray>

        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Categories</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Categories"
              onChange={handleChangeCategories}
              value={mainCate}
            >
              {categoriesData?.map((category, index) => (
                <MenuItem key={`category_${index}`} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={8}>
          {categoriesDetail()}
        </Grid>
      </Grid>
    </>
  );
};

export default CategoriesInput;
