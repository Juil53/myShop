
import React, { useState } from "react";
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Field, FieldArray } from "formik";


function AttributeOptions({ formik }) {
  const [val, setVal] = useState([])

  const options = {
    insurances: [
      { key: 'Select option', value: "" },
      { key: '1 YEAR', value: "1 YEAR" },
      { key: '2 YEARS', value: "2 YEARS" }
    ],
    origin: [
      { key: 'Select option', value: "" },
      { key: 'USA', value: "USA" },
      { key: 'VN', value: "VN" },
    ],
    material: [
      { key: 'Select option', value: "" },
      { key: 'SILK', value: 'SILK' },
      { key: 'COTTON', value: 'COTTON' },
    ],
  }

  const handleVal = (event, index) => {
    const { value } = event.target
    setVal(options[value])
  }

  return (

    <>
      <FieldArray name="attribute">
        {({ push, remove }) => (
          <React.Fragment>
            <Grid item xs={12}>
              <Button variant="outlined" color="success" type="button" onClick={() => push({ name: "", value: "" })} startIcon={<AddIcon />}>Attribute</Button>
            </Grid>

            {/* Loop through attribute from Formik,starting with 1 index */}
            {formik.values.attribute.map((item, index) => (
              <React.Fragment key={index}>
                <Grid item xs={3}>
                  {/* When add more attribute will increase index */}
                  <Field name={`attribute[${index}].name`} as={Select} variant="outlined" size="small" fullWidth>
                    <MenuItem value="insurances">Insurances</MenuItem>
                    <MenuItem value="origin">Origin</MenuItem>
                    <MenuItem value="material">Material</MenuItem>
                  </Field>
                </Grid>

                <Grid item xs={8}>
                  {/* When add more attribute will increase index */}
                  <Field name={`attribute[${index}].value`} as={TextField} InputLabelProps={{ shrink: true }} variant="outlined" size="small" fullWidth label="Value" />
                </Grid>

                {/* Remove attribute field */}
                <Grid item xs={1}>
                  <IconButton aria-label="delete" color="error" size="small" onClick={() => {remove(index)}}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </React.Fragment>
            ))}
          </React.Fragment>
        )}
      </FieldArray>
    </>

  )
}

export default AttributeOptions