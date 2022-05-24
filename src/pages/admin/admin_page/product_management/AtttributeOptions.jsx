import React from "react";
import { Grid, Button, IconButton, Select, MenuItem } from "@mui/material";
import { Field, FieldArray } from "formik";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

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

function AttributeOptions({ formik,setField }) {
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
                startIcon={<AddIcon />}
              >
                Attribute
              </Button>
            </Grid>

            {formik.values.attribute.map((item, index) => {
              // console.log(options[item.name])
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
