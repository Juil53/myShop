import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
  Switch,
  Typography
} from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Field, Form, Formik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SimpleSnackbar from "../../../../../components/admin/SimpleSnackbar";
import { db, storage } from "../../../../../service/auth";
import {
  getCategoriesRequest,
  getOptionsRequest
} from "../../../../../store/admin_product/productSlice";
import { TextFieldCustom } from "../../../../../styles/styled_components/styledComponent";
import AttributeInput from "./AttributeInput";
import CategoriesInput from "./CategoriesInput";
import ImageInput from "./ImageInput";

export default function AddProduct() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(getOptionsRequest());
  }, []);

  return (
    <Box component={Paper} elevation={3} padding={5} width="100%" margin="auto">
      <Typography variant="h4" marginBottom={2} sx={{ fontWeight: 700 }}>
        Add Product
      </Typography>

      <Formik
        initialValues={{
          name: "",
          brand: "",
          options: [],
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

          try {
            for (let file of values.image) {
              const imageRef = ref(storage, `images/${file.name}`);
              await uploadBytes(imageRef, file);
              const url = await getDownloadURL(imageRef);
              tempUrl.push(url);
            }
          } catch (error) {
            console.log(error);
          }

          const editedValues = {
            ...values,
            image: tempUrl,
          };
          await addDoc(collection(db, "products"), {
            ...editedValues,
            timeStamp: moment().format("MM DD YYYY"),
          });

          setShow(true);
          // navigate("/admin/products");
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
            <Grid item xs={3}>
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
            <Grid item xs={3}>
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

            {/* Price */}
            <Grid item xs={3}>
              <Field
                as={TextFieldCustom}
                name="priceBeforeDiscount"
                type="number"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                label="Price Before Discount"
                size="small"
                fullWidth
                placeholder="100000"
              />
            </Grid>
            <Grid item xs={3}>
              <Field
                as={TextFieldCustom}
                name="priceAfterDiscount"
                type="number"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                label="Price After Discount"
                size="small"
                fullWidth
                placeholder="80000"
              />
            </Grid>

            {/* Available */}
            <Grid item xs={3}>
              <Field
                as={TextFieldCustom}
                name="available"
                type="number"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                label="Quantity"
                size="small"
                fullWidth
                placeholder="100"
              />
            </Grid>

            {/* Hot */}
            <Grid item xs={3}>
              <Stack direction="row" spacing={2}>
                <FormControlLabel
                  control={<Field as={Switch} name="isHot" color="primary" />}
                  label="Hot"
                  labelPlacement="end"
                />
                <FormControlLabel
                  control={<Field as={Switch} name="isNew" color="primary" />}
                  label="New"
                  labelPlacement="end"
                />
              </Stack>
            </Grid>

            {/* New */}
            <Grid item xs={2}></Grid>

            {/* Image */}
            <Grid item xs={12}>
              <ImageInput />
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

            {/* Options */}
            {/* <Grid item xs={12}>
              <OptionsInput />
            </Grid> */}

            {/* Attribute */}
            <Grid item xs={12}>
              <AttributeInput />
            </Grid>

            <Stack direction="row" alignItems="center" spacing={1} marginTop={2} paddingLeft={2}>
              <Button variant="contained" color="success" type="submit" size="small">
                Submit
              </Button>
              <Button variant="contained" color="error" type="submit" size="small">
                Reset
              </Button>
              <Link to="/admin/products">
                <Button size="small" variant="contained" color="warning">
                  Back
                </Button>
              </Link>
            </Stack>
          </Grid>
        </Form>
      </Formik>
      <SimpleSnackbar show={show} setShow={setShow} type="add" />
    </Box>
  );
}
