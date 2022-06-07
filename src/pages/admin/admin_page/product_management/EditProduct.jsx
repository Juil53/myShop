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
import { Link, useParams } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import {
  actAddProduct,
  actGetAllProduct,
  actGetCategories,
  actGetOptions,
} from "../../../../store/admin_product/action";
import { useSelector, useDispatch } from "react-redux";
import { selectProductInfo } from "../../../../store/admin_product/selector";
import { TextFieldCustom } from "../../../../styles/styled_components/styledComponent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ImageInput from "./add_product/ImageInput";
import CategoriesInput from "./add_product/CategoriesInput";
import AttributeInput from "./add_product/AttributeInput";

export default function EditProduct() {
  const params = useParams();
  const dispatch = useDispatch();
  const info = useSelector((state) => selectProductInfo(state, params.id));

  useEffect(() => {
    dispatch(actGetOptions());
    dispatch(actGetCategories());
    dispatch(actGetAllProduct());
  }, []);

  return (
    <Box component={Paper} elevation={5} padding={5} width="100%" margin="auto">
      <Link to="/admin/products">
        <Button startIcon={<ArrowBackIcon />} color="secondary">
          Back
        </Button>
      </Link>

      <Typography variant="h4" marginBottom={2} sx={{ fontWeight: 700 }}>
        Edit Product
      </Typography>

      {info && (
        <Formik
          initialValues={{
            name: info.name || "",
            brand: info.brand || "",
            attributes: info.attributes || [],
            categories: info.categories || [],
            desc: info.desc || "",
            status: info.status || "",
            image: null,
            available: info.available || "",
            priceBeforeDiscount: info.priceBeforeDiscount || 0,
            priceAfterDiscount: info.priceAfterDiscount || 0,
            isHot: info.isHot || false,
            isNew: info.isNew || false,
          }}
          enableReinitialize
          onSubmit={async (values, { resetForm }) => {
            console.log(values);
          }}
        >
          {({ values }) => (
            <Form>
              <Grid container spacing={2}>
                {/* Name */}
                <Grid item xs={6}>
                  <Field
                    as={TextFieldCustom}
                    value={values.name}
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
                    value={values.brand}
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
                    value={values.status}
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
                    value={values.available}
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
                    value={values.priceBeforeDiscount}
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
                    control={
                      <Field as={Switch} name="isHot" color="secondary" checked={values.isHot} />
                    }
                    label="Hot"
                    labelPlacement="end"
                  />
                </Grid>

                {/* New */}
                <Grid item xs={3}>
                  <FormControlLabel
                    value="end"
                    control={
                      <Field as={Switch} name="isNew" color="secondary" checked={values.isNew} />
                    }
                    label="New"
                    labelPlacement="end"
                  />
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <Field
                    as={TextFieldCustom}
                    value={values.desc}
                    name="desc"
                    label="Description"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    size="small"
                    fullWidth
                    multiline
                    rows={5}
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

                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  marginTop={2}
                  paddingLeft={2}
                >
                  <Button variant="contained" color="success" type="submit" size="small">
                    Submit
                  </Button>
                  <Button variant="contained" color="secondary" type="submit" size="small">
                    Reset
                  </Button>
                </Stack>
              </Grid>
            </Form>
          )}
        </Formik>
      )}
    </Box>
  );
}
