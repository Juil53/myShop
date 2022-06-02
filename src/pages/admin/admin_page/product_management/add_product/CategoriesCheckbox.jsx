import React, { useEffect } from "react";
import { Field, FieldArray, useFormikContext } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { actGetCategories } from "../../../../../store/admin_product/action";
import { selectCategories } from "../../../../../store/admin_product/selector";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
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
  console.log(categories)

  useEffect(() => {
    dispatch(actGetCategories());
  }, []);

  const categoriesData = useSelector(selectCategories);
  const categoriesDetail = (categoryName) => {
    if (categoryName) {
      const { subCate = [] } =
        categoriesData.find((option) => option.id == categoryName) || {};
      return subCate.map((option, index) => (
        <FormControlLabel
          key={`subCate_${index}`}
          control={<Field as={Checkbox} name={`categories[0].value`} />}
          label={option.name}
          value={option.id}
        />
      ));
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <FieldArray name="categories">
          {({ insert, remove, push }) => (
            <>
              {categories.length > 0 &&
                categories.map((category, index) => (
                  <React.Fragment key={`categories${index}`}>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <SelectInput
                          name={`categories[0].name`}
                          variant="outlined"
                          size="small"
                          label="Categories"
                          fullWidth
                          disabled={category.name ? true : false}
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
                      {categoriesDetail(category.name)}
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
                          onClick={() =>
                            setFieldValue(`categories[0].name`, "")
                          }
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
