import React, { useEffect, useState } from "react";
import { Field, FieldArray, useFormikContext } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { actGetCategories } from "../../../../../store/admin_product/action";
import { selectCategories } from "../../../../../store/admin_product/selector";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  MenuItem,
  Stack,
} from "@mui/material";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import SelectInput from "./SelectInput";

function CategoriesCheckBox() {
  const dispatch = useDispatch();
  const {
    values: { categories },
    setFieldValue,
  } = useFormikContext();
  console.log("categories", categories);

  useEffect(() => {
    dispatch(actGetCategories());
  }, []);

  const categoriesData = useSelector(selectCategories);

  // Lay ID tai parent Select so sanh vs Id Categories trong data, trung ID lay ra subCate data
  // map subCate data de render checkbox ben phai
  const categoriesDetail = (categoryName, parentIndex) => {
    if (categoryName) {
      const { subCate = [] } =
        categoriesData.find((category) => category.id === categoryName) || {};
      return (
        <FieldArray name={`categories.${parentIndex}.value`}>
          {({ insert, remove, push }) => (
            <FormGroup>
              <Stack direction="row" spacing={1}>
                {subCate.map((cate, index) => (
                  <FormControlLabel
                    key={`subCate_${index}`}
                    control={
                      <Field
                        as={Checkbox}
                        name={`categories.${parentIndex}.value`}
                        value={cate.id}
                      />
                    }
                    label={cate.name}
                  />
                ))}
              </Stack>
            </FormGroup>
          )}
        </FieldArray>
      );
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <FieldArray name="categories">
          {({ insert, remove, push }) => (
            <>
              <Grid item xs={12}>
                <Button
                  size="small"
                  color="secondary"
                  type="button"
                  onClick={() => push({ name: "", value: [] })}
                >
                  Click to add Categories
                </Button>
              </Grid>

              {/* Check State formik categories de map ra field select Category */}
              {categories.length > 0 &&
                categories.map((category, index) => (
                  <React.Fragment key={`categories${index}`}>
                    {/* Parent field */}
                    <Grid item xs={3}>
                      <SelectInput
                        name={`categories.${index}.name`}
                        variant="outlined"
                        size="small"
                        label="Categories"
                        fullWidth
                      >
                        {categoriesData?.map((category, index) => (
                          <MenuItem
                            key={`category_${index}`}
                            value={category.id}
                          >
                            {category.name}
                          </MenuItem>
                        ))}
                      </SelectInput>
                    </Grid>

                    {/* Child field, truyen name,index tu stateCategory */}
                    <Grid item xs={8}>
                      {categoriesDetail(category.name, index)}
                    </Grid>

                    {/* Delete */}
                    <Grid item xs={1}>
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                      >
                        <IconButton
                          variant="outlined"
                          onClick={() => remove(index)}
                        >
                          <RestartAltOutlinedIcon
                            color="secondary"
                            size="small"
                          />
                        </IconButton>
                      </Stack>
                    </Grid>
                  </React.Fragment>
                ))}
            </>
          )}
        </FieldArray>
      </Grid>
    </>
  );
}

export default CategoriesCheckBox;
