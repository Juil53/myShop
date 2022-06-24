import { Chip, FormControl, Grid, MenuItem, Stack } from "@mui/material";
import { FieldArray, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../../../../../store/admin_product/selector";
import CategoriesCheckBox from "./CategoriesCheckbox";
import SelectInput from "./SelectInput";

const CategoriesInput = () => {
  const dispatch = useDispatch();
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

  const categoriesDetail = () => {
    if (mainCate) {
      const { subCate = [] } = categoriesData.find((category) => category.id === mainCate) || {};
      return <CategoriesCheckBox subCate={subCate} />;
    }
  };

  const handleChangeCategories = (e) => {
    e.preventDefault()
    const value = e.target.value;
    setFieldValue("categories", [value]);
    setMainCate(value);
  };

  const categoryChips = (categoriesRemove) => {
    const category = categoriesData.find((category) => categories.includes(category.id));
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
