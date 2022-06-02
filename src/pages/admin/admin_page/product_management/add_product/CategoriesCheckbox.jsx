import React, { useEffect } from "react";
import { Field, FieldArray, useFormikContext } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { actGetCategories } from "../../../../../store/admin_product/action";
import { selectCategories } from "../../../../../store/admin_product/selector";
import {
  Button,
  Checkbox,
  FormControl,
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

  useEffect(() => {
    dispatch(actGetCategories());
  }, []);

  const categoriesData = useSelector(selectCategories);

  const categoriesDetail = (categoryId, parentIndex) => {
    if (categoryId) {
      const { subCate = [] } =
        categoriesData.find((category) => category.id === categoryId) || {};

      return (
        <FieldArray name={`categories.${parentIndex}.subCate`}>
          {({ insert, remove, push }) => (
            <FormGroup>
              <Stack direction="row" spacing={1}>
                {subCate.map((cate, index) => (
                  <FormControlLabel
                    key={`sub_cate_${index}`}
                    control={
                      <Field
                        as={Checkbox}
                        name={`categories.${parentIndex}.subCate`}
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
                  onClick={() => push({ id: "", subCate: [] })}
                >
                  Click to add Categories
                </Button>
              </Grid>

              {categories.length > 0 &&
                categories.map((category, index) => (
                  <React.Fragment key={`categories${index}`}>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <SelectInput
                          name={`categories.${index}.id`}
                          variant="outlined"
                          size="small"
                          label="Categories"
                          fullWidth
                        >
                          {categoriesData?.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                              {category.name}
                            </MenuItem>
                          ))}
                        </SelectInput>
                      </FormControl>
                    </Grid>

                    <Grid item xs={8}>
                      {categoriesDetail(category.id, index)}
                    </Grid>

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
