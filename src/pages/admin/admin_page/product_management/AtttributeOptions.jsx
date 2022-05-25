import React, { useEffect } from "react";
import { Grid, Button, IconButton, Select, MenuItem } from "@mui/material";
import { Field, FieldArray } from "formik";
import { useSelector,useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { actGetOptions } from "../../../../store/admin_product/action";

const options = {
  insurances: [
    { key: "Select option", value: "" },
    { key: "1 YEAR", value: "1 YEAR" },
    { key: "2 YEARS", value: "2 YEARS" },
  ],
  origin: [
    { key: "Select option", value: "" },
    { key: "USA", value: "USA" },
    { key: "VN", value: "VN" },
  ],
  material: [
    { key: "Select option", value: "" },
    { key: "SILK", value: "SILK" },
    { key: "COTTON", value: "COTTON" },
  ],
};

function AttributeOptions({ formik, setField }) {
  const dispatch = useDispatch()
  const optionsData = useSelector((state) => state.adminProduct.options[0]);
  console.log(optionsData);

  useEffect(()=>{
    dispatch(actGetOptions())
  },[])

  return (
    <>
      <FieldArray name="attribute">
        {({ push, remove }) => (
          <React.Fragment>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="secondary"
                type="button"
                onClick={() => push({ name: "", value: "" })}
                // onClick={() => arrayHelper.push({ name: "", value: "" })}
                startIcon={<AddIcon />}
              >
                Attribute
              </Button>
            </Grid>

            {formik.values.attribute.map((item, index) => {
              // console.log(options[item.name])
              // console.log(optionsData[item.name])
              return (
                <React.Fragment key={index}>
                  <Grid item xs={3}>
                  <Field
                      name={`attribute[${index}].name`}
                      as={Select}
                      variant="outlined"
                      size="small"
                      fullWidth
                      onChange={formik.handleChange}
                    >
                      <MenuItem value="insurances">Insurances</MenuItem>
                      <MenuItem value="origin">Origin</MenuItem>
                      <MenuItem value="material">Material</MenuItem>
                    </Field>
                  </Grid>

                  <Grid item xs={8}>
                  <Field
                      name={`attribute[${index}].value`}
                      as={Select}
                      variant="outlined"
                      size="small"
                      fullWidth
                    >
                      {options[item.name]?.map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                          {option.key}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>

                  <Grid item xs={1}>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      size="small"
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </React.Fragment>
              );
            })}
          </React.Fragment>
        )}
      </FieldArray>
    </>
  );
}

export default AttributeOptions;
