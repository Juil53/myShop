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
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import { useFormik, FormikProvider } from "formik";
import AttributeOptions from "./AtttributeOptions";

const Input = styled('input')({
  display: 'none',
});

export default function AddProduct() {
  const formik = useFormik({
    initialValues: {
      name: "",
      brand: "",
      attribute: [{ name: "", value: "" }],
      description: "",
      status: "",
      image: "",
      quantity: "",
      price_before_discount: "",
    },
    onSubmit: (values) => {
      console.log(values)
    },
    onChange: (values) => {
      console.log(values.attribute)
    }
  })

  return (

    <FormikProvider value={formik}>
      <Box component={Paper} elevation={10} padding={5}>
        <Typography variant="h3" marginBottom={2}>
          Add Product
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>

            <Grid item xs={6}>
              <TextField name="name" value={formik.values.name} onChange={formik.handleChange} InputLabelProps={{ shrink: true }} variant="outlined"
                label="Product Name" size="small"
                fullWidth />
            </Grid>

            <Grid item xs={6}>
              <TextField name="brand" value={formik.values.brand} onChange={formik.handleChange} InputLabelProps={{ shrink: true }} variant="outlined"
                label="Brand" size="small"
                fullWidth />
            </Grid>

            <Grid item xs={4}>
              <TextField name="status" value={formik.values.status} onChange={formik.handleChange} InputLabelProps={{ shrink: true }} variant="outlined"
                label="Status" size="small"
                fullWidth />
            </Grid>

            <Grid item xs={4}>
              <TextField name="quantity" value={formik.values.quantity} onChange={formik.handleChange} InputLabelProps={{ shrink: true }} variant="outlined"
                label="Quantity" size="small"
                fullWidth />
            </Grid>

            <Grid item xs={4}>
              <TextField name="price_before_discount" value={formik.values.price_before_discount} onChange={formik.handleChange} InputLabelProps={{ shrink: true }} variant="outlined"
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
              <TextField
                name="description"
                value={formik.values.description} onChange={formik.handleChange}
                InputLabelProps={{ shrink: true }} variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={3}
                label="Description"
              />
            </Grid>

            {/* Pass initialValues formik to child Comp */}
            <AttributeOptions formik={formik} />
            
            <Stack direction="row" alignItems="center" spacing={1} marginTop={2} paddingLeft={2}>
              <Button variant="contained" color="success" type="submit" size="small">Submit</Button>
              <Button variant="contained" color="secondary" type="submit" size="small">Cancel</Button>
            </Stack>

          </Grid>
        </form>
      </Box >
    </FormikProvider>

  );
}
