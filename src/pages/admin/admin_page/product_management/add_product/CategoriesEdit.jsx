import React, { useEffect, useState } from "react";
import { Field, FieldArray, useFormikContext } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { actGetCategories } from "../../../../../store/admin_product/action";
import { selectCategories } from "../../../../../store/admin_product/selector";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Stack,
  Chip,
} from "@mui/material";
import SelectInput from "./SelectInput";

function CategoriesEdit() {
  const [cate, setCate] = useState([]);
  const [cateDetail, setCateDetail] = useState([]);
  const [checked, setChecked] = useState(true)
  const handleCate = (event) => {
    setCate(event.target.value);
  };
  const handleCateDetail = (event) => {
    setCateDetail([...cateDetail, event.target.value]);
  };
  console.log("cate", cate);
  console.log("cateDetail", cateDetail);

  const dispatch = useDispatch();
  const {
    values: { categories },
  } = useFormikContext();
  console.log("categories", categories);

  useEffect(() => {
    dispatch(actGetCategories());
  }, []);

  const categoriesData = useSelector(selectCategories);
  const categoriesDetail = (cate) => {
    const { subCate = [], id } =
      categoriesData.find((category) => category.id === cate) || {};
    console.log("id",id)
    console.log(cate == id);
    return (
      <Stack direction="row" spacing={1}>
        {subCate?.map((cate, index) => (
          <FormControlLabel
            key={`subCate_${index}`}
            onChange={handleCateDetail}
            checked={checked}
            control={
              <Field
                as={Checkbox}
                value={cate.id}
                checked={checked}
              />
            }
            label={cate.name}
          />
        ))}
      </Stack>
    );
  };

  const updateDate = (push) => {
    push(cate);
    cateDetail.map((item, index) => push(item));
  };

  return (
    <>
      <Grid container spacing={2}>
        <FieldArray name="categories">
          {({ insert, remove, push }) => (
            <>
              <Grid item xs={12}>
                <Stack direction="row" spacing={1}>
                  {categories.map((category, index) => (
                    <Chip
                      key={`category_${index}`}
                      label={category}
                      onDelete={() => remove(index)}
                    />
                  ))}
                </Stack>
              </Grid>

              <Grid item xs={3}>
                <SelectInput
                  name=""
                  value={cate}
                  variant="outlined"
                  size="small"
                  label="Categories"
                  fullWidth
                  onChange={handleCate}
                >
                  {categoriesData?.map((category, index) => (
                    <MenuItem
                      key={`categoriesData_${index}`}
                      value={category.id}
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </SelectInput>
              </Grid>

              <Grid item xs={9}>
                {categoriesDetail(cate)}
              </Grid>

              <Grid item xs={12}>
                <Button
                  size="small"
                  color="secondary"
                  type="button"
                  onClick={() => updateDate(push)}
                >
                  Click to update Categories
                </Button>
              </Grid>
            </>
          )}
        </FieldArray>
      </Grid>
    </>
  );
}

export default CategoriesEdit;
