import { Chip, FormControl, Grid, MenuItem, Stack } from "@mui/material";
import { FieldArray, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCategories } from "../../../../../store/admin_product/selector";
import CategoriesCheckBox from "./CategoriesCheckbox";
import SelectInput from "./SelectInput";

const CategoriesInput = () => {
  const [mainCate, setMainCate] = useState("");
  const categoriesData = useSelector(selectCategories);

  const {
    values: { categories },
    setFieldValue,
  } = useFormikContext();

  useEffect(() => {
    if (categories.length !== 0) {
      const category = categoriesData.find((category) => categories.includes(category.id));
      if (category) {
        setMainCate(category.id);
      }
    }
  }, [categories]);

  const handleChangeCategories = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setFieldValue("categories", [value]);
    setMainCate(value);
  };

  const categoriesDetail = () => {
    if (mainCate) {
      const { subCate = [] } = categoriesData.find((category) => category.id === mainCate) || {};
      return <CategoriesCheckBox subCate={subCate} />;
    }
  };

  const categoryChips = (categoriesRemove) => {
    // const category = categoriesData.find((category) => categories.includes(category.id));
    // const categoryList = category ? [...category.subCate, category] : [];
    // const categoryListFilter = categoryList.filter((category) => categories.includes(category.id));
    // console.log("categoryList", categoryList);
    // console.log("categoryListFilter", categoryListFilter);

    // return categoryListFilter.map((category, index) => (
    //   <Chip
    //     key={`category_${index}`}
    //     label={category.name}
    //     onDelete={() => (categoriesRemove(index), setMainCate(""))}
    //   />
    // ));

    // if (mainCate == "") {
    //  console.log("categories = 0")
    //  categories.length = 0
    // }

    return categories.map((category, index) => (
      <Chip
        key={`category_${index}`}
        label={category}
        onDelete={() => (categoriesRemove(index), setMainCate(""))}
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
                  {categoryChips(remove)}
                </Stack>
              </Grid>
            </>
          )}
        </FieldArray>

        <Grid item xs={3}>
          <FormControl fullWidth>
            <SelectInput
              name="categories"
              size="small"
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
            </SelectInput>
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
