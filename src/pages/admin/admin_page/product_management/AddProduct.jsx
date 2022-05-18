import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import { Formik, Field, Form, FieldArray } from "formik";

const Input = styled('input')({
  display: 'none',
});

export default function AddProduct() {
  const [attribute, setAttribute] = useState([{ name: "", value: "" }])
  const handleAddAttribute = () => {
    setAttribute([
      ...attribute,
      { name: "", value: "" }
    ])
  }
  const removeField = (index) => {
    let data = [...attribute];
    data.splice(index, 1)
    setAttribute(data);
  }
  const initialState = {
    name: "",
    brand: "",
    attribute,
    description: "",
    status: "",
    image: "",
    quantity: "",
    price_before_discount: "",
  }

  return (
    <Box component={Paper} elevation={10} padding={5}>
      <Typography variant="h3" marginBottom={2}>
        Add Product
      </Typography>

      <Formik
        initialValues={initialState}
        onSubmit={values => {
          console.log(values);
        }}
      >
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Field name="name" component={TextField} InputLabelProps={{ shrink: true }} variant="outlined"
                label="Product Name" size="small"
                fullWidth />
            </Grid>
            <Grid item xs={6}>
              <Field name="brand" component={TextField} InputLabelProps={{ shrink: true }} variant="outlined"
                label="Brand" size="small"
                fullWidth />
            </Grid>
            <Grid item xs={4}>
              <Field name="status" component={TextField} InputLabelProps={{ shrink: true }} variant="outlined"
                label="Status" size="small"
                fullWidth />
            </Grid>
            <Grid item xs={4}>
              <Field name="quantity" component={TextField} InputLabelProps={{ shrink: true }} variant="outlined"
                label="Quantity" size="small"
                fullWidth />
            </Grid>
            <Grid item xs={4}>
              <Field name="price_before_discount" component={TextField} InputLabelProps={{ shrink: true }} variant="outlined"
                label="Price" size="small"
                fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                  />
                  <Button variant="outlined" component="span" color="secondary" size="small">
                    Upload
                  </Button>
                </label>
                <label htmlFor="icon-button-file">
                  <Input accept="image/*" id="icon-button-file" type="file" />
                  <IconButton
                  size="small"
                    color="secondary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Field
                name="description"
                component={TextField}
                InputLabelProps={{ shrink: true }} variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={3}
                label="Description"
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="outlined" color="success" type="button" onClick={handleAddAttribute} startIcon={<AddIcon />}>Attribute</Button>
            </Grid>

            <FieldArray name="attribute">
              {({ push, remove }) => (
                <React.Fragment>
                  {attribute.map((att, index) => (
                    <React.Fragment key={index}>

                      <Grid item xs={3}>
                        <Field name={`attribute[${index}].name`} value={attribute.name} component={TextField} InputLabelProps={{ shrink: true }} variant="outlined"
                          label="Attribute" size="small"
                          fullWidth />
                      </Grid>
                      <Grid item xs={8} flexGrow={1}>
                        <Field name={`attribute[${index}].value`} value={attribute.value} component={TextField} InputLabelProps={{ shrink: true }} variant="outlined"
                          label="Value" size="small"
                          fullWidth />
                      </Grid>
                      <Grid item xs={1}>
                        <IconButton aria-label="delete" color="error" size="small" fullWidth onClick={() => {
                          remove(index) // Remove value formik
                          removeField(index) // Remove attribute field
                        }}>
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </React.Fragment>
                  ))}
                </React.Fragment>
              )}
            </FieldArray>


            <Stack direction="row" alignItems="center" spacing={1} marginTop={2} paddingLeft={2}>
              <Button variant="contained" color="success" type="submit" size="small">Submit</Button>
              <Button variant="contained" color="secondary" type="submit" size="small">Cancel</Button>
            </Stack>
          </Grid>
        </Form>
      </Formik>
    </Box >
  );
}
