import React, { useEffect } from "react";
import {
  Button,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  FormControl,
  InputLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FieldArray, useFormikContext, useField } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { actGetCategories } from "../../../../../store/admin_product/action";
import { selectCategories } from "../../../../../store/admin_product/selector";
import SelectInput from "./SelectInput";

export default function CategoryInput() {
  const dispatch = useDispatch();
  const {
    values: { categories },
  } = useFormikContext();

  useEffect(() => {
    dispatch(actGetCategories());
  }, []);

  const categoriesData = useSelector(selectCategories);
  const categoriesDetail = (categoryName) => {
    if (categoryName) {
      const { subCate = [] } =
      categoriesData.find((option) => option.id == categoryName) || {};
      return subCate.map((option, index) => (
        <MenuItem key={`categoriesDetail_${index}`} value={option.id}>
          {option.name}
        </MenuItem>
      ));
    } else {
      return <MenuItem></MenuItem>;
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
                  onClick={() => push({ name: "", value: "" })}
                >
                  Click to add Categories
                </Button>
              </Grid>

              {categories.length > 0 &&
                categories.map((category, index) => (
                  <React.Fragment key={`categories_${index}`}>
                    <Grid item xs={3}>
                      <SelectInput
                        name={`categories.${index}.name`}
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
                    </Grid>

                    <Grid item xs={8}>
                      <SelectInput
                        name={`categories.${index}.value`}
                        variant="outlined"
                        size="small"
                        label="Detail"
                        fullWidth
                      >
                        {categoriesDetail(categories[index].name)}
                      </SelectInput>
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
                          <DeleteIcon color="secondary" />
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
