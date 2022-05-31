import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  Stack,
  Switch,
  FormControlLabel,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import {
  Field,
  Formik,
  Form,
} from "formik";
import {
  actGetCategories,
  actGetOptions,
} from "../../../../../store/admin_product/action";
import { useSelector, useDispatch } from "react-redux";
import ImageInput from "./ImageInput";
import AttributeInput from "./AttributeInput";
import CategoryInput from "./CategoryInput";

export default function AddProduct() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actGetOptions());
    dispatch(actGetCategories());
  }, []);

  return (
    <Box component={Paper} elevation={5} padding={5} width="100%" margin="auto">
      <Link to="/admin/product-management">
        <Button startIcon={<ArrowBackIcon />} color="secondary">
          Back
        </Button>
      </Link>

      <Typography variant="h4" marginBottom={2} sx={{ fontWeight: 700 }}>
        Add Product
      </Typography>

      <Formik
        initialValues={{
          name: "",
          brand: "",
          attributes: [],
          categories: [],
          desc: "",
          status: "",
          image: "",
          quantity: 0,
          priceBeforeDiscount: 0,
          priceAfterDiscount: null,
          isHot: false,
          isNew: false,
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
        }}
      >
        <Form>
          <Grid container spacing={2}>
            {/* Name */}
            <Grid item xs={6}>
              <Field
                as={TextField}
                name="name"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                label="Product Name"
                size="small"
                fullWidth
              />
            </Grid>

            {/* Brand */}
            <Grid item xs={6}>
              <Field
                as={TextField}
                name="brand"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                label="Brand"
                size="small"
                fullWidth
              />
            </Grid>

            {/* Status */}
            <Grid item xs={4}>
              <Field
                as={TextField}
                name="status"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                label="Status"
                size="small"
                fullWidth
              />
            </Grid>

            {/* Quantity */}
            <Grid item xs={4}>
              <Field
                as={TextField}
                name="quantity"
                type="number"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                label="Quantity"
                size="small"
                fullWidth
              />
            </Grid>

            {/* Price */}
            <Grid item xs={4}>
              <Field
                as={TextField}
                name="priceBeforeDiscount"
                type="number"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                label="Price"
                size="small"
                fullWidth
              />
            </Grid>

            {/* Image */}
            <Grid item xs={6}>
              <ImageInput />
            </Grid>

            {/* Hot */}
            <Grid item xs={3}>
              <FormControlLabel
                value="end"
                control={<Field as={Switch} name="isHot" color="secondary" />}
                label="Hot"
                labelPlacement="end"
              />
            </Grid>

            {/* New */}
            <Grid item xs={3}>
              <FormControlLabel
                value="end"
                control={<Field as={Switch} name="isNew" color="secondary" />}
                label="New"
                labelPlacement="end"
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <Field
                as={TextField}
                name="desc"
                label="Description"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={3}
              />
            </Grid>

            {/* Categories */}
            <Grid item xs={12}>
              <CategoryInput />
            </Grid>

            {/* Attribute */}
            <Grid item xs={12}>
              <AttributeInput test="test"/>
            </Grid>

            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              marginTop={2}
              paddingLeft={2}
            >
              <Button
                variant="contained"
                color="success"
                type="submit"
                size="small"
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                size="small"
              >
                Reset
              </Button>
            </Stack>

          </Grid>
        </Form>
      </Formik>
    </Box>
  );
}
