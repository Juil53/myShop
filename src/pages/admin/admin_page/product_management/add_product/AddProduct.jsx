import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Stack,
  Switch,
  FormControlLabel,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import { Field, Formik, Form } from "formik";
import {
  actAddProduct,
  actGetCategories,
  actGetOptions,
} from "../../../../../store/admin_product/action";
import { TextFieldCustom } from "../../../../../styles/styled_components/styledComponent";
import { useDispatch } from "react-redux";
import ImageInput from "./ImageInput";
import AttributeInput from "./AttributeInput";
import CategoriesInput from "./CategoriesInput";
import { storage } from "../../../../../utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(actGetOptions());
    dispatch(actGetCategories());
  }, []);

  return (
    <Box component={Paper} elevation={5} padding={5} width="100%" margin="auto">
      <Link to="/admin/products">
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
          image: [],
          available: 0,
          priceBeforeDiscount: 0,
          priceAfterDiscount: 0,
          isHot: false,
          isNew: false,
        }}
        onSubmit={async (values, { resetForm }) => {
          const tempUrl = [];
          if (values.image.length !== 0) {
            values.image.map((file, index) => {
              const imageRef = ref(storage, `images/${file.name}`);
              uploadBytes(imageRef, file).then((result) => {
                // setFiles((prevState) => [...prevState]);
                getDownloadURL(imageRef).then((url) => {
                  tempUrl.push(url);
                });
              });
            });
          }

          const editedValues = {
            ...values,
            image: tempUrl,
          };

          dispatch(actAddProduct(editedValues));
          navigate("/admin/products")
          resetForm();
        }}
      >
        <Form>
          <Grid container spacing={2}>
            {/* Name */}
            <Grid item xs={6}>
              <Field
                as={TextFieldCustom}
                name="name"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                label="Product Name"
                size="small"
                fullWidth
                placeholder="T-shirt..."
              />
            </Grid>

            {/* Brand */}
            <Grid item xs={6}>
              <Field
                as={TextFieldCustom}
                name="brand"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                label="Brand"
                size="small"
                fullWidth
                placeholder="Uniqlo..."
              />
            </Grid>

            {/* Status */}
            <Grid item xs={4}>
              <Field
                as={TextFieldCustom}
                name="status"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                label="Status"
                size="small"
                fullWidth
                placeholder="Available"
              />
            </Grid>

            {/* Available */}
            <Grid item xs={4}>
              <Field
                as={TextFieldCustom}
                name="available"
                type="number"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                label="Available"
                size="small"
                fullWidth
                placeholder="100"
              />
            </Grid>

            {/* Price */}
            <Grid item xs={4}>
              <Field
                as={TextFieldCustom}
                name="priceBeforeDiscount"
                type="number"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                label="Price"
                size="small"
                fullWidth
                placeholder="100000"
              />
            </Grid>

            {/* Image */}
            <Grid item xs={6}>
              <ImageInput />
            </Grid>

            {/* Hot */}
            <Grid item xs={3}>
              <FormControlLabel
                control={<Field as={Switch} name="isHot" color="secondary" />}
                label="Hot"
                labelPlacement="end"
              />
            </Grid>

            {/* New */}
            <Grid item xs={3}>
              <FormControlLabel
                control={<Field as={Switch} name="isNew" color="secondary" />}
                label="New"
                labelPlacement="end"
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <Field
                as={TextFieldCustom}
                name="desc"
                label="Description"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={3}
                placeholder="Áo khoác Cardigan với phong cách trẻ trung, thiết kế đơn giản dễ phối đồ,... "
              />
            </Grid>

            {/* Categories Checkbox */}
            <Grid item xs={12}>
              <CategoriesInput />
            </Grid>

            {/* Attribute */}
            <Grid item xs={12}>
              <AttributeInput />
            </Grid>

            <Stack direction="row" alignItems="center" spacing={1} marginTop={2} paddingLeft={2}>
              <Button variant="contained" color="success" type="submit" size="small">
                Submit
              </Button>
              <Button variant="contained" color="secondary" type="submit" size="small">
                Reset
              </Button>
            </Stack>
          </Grid>
        </Form>
      </Formik>
    </Box>
  );
}
