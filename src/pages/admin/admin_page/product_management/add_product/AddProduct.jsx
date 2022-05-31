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
  MenuItem,
  Select,
  IconButton,
  FormControlLabel,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  useFormik,
  FormikProvider,
  FieldArray,
  Field,
  Formik,
  Form,
} from "formik";
import {
  actAddProduct,
  actGetCategories,
  actGetOptions,
} from "../../../../../store/admin_product/action";
import { useSelector, useDispatch } from "react-redux";
import { storage } from "../../../../../utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import PreviewImg from "../PreviewImg";
import AttributeInput from "./AttributeInput";
import ImageInput from "./ImageInput";

export default function AddProduct() {
  const dispatch = useDispatch();
  const categoriesOptions = useSelector(
    (state) => state.adminProduct.categories
  );
  const [hot, setHot] = useState(false);
  const handleHot = () => (hot ? setHot(false) : setHot(true));
  const [newProduct, setNewProduct] = useState(false);
  const handleNewProduct = () =>
    newProduct ? setNewProduct(false) : setNewProduct(true);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  useEffect(() => {
    dispatch(actGetCategories());
  }, []);

  // const formik = useFormik({
  //   initialValues: {
  //     name: "",
  //     brand: "",
  //     attribute: [],
  //     category: [],
  //     desc: "",
  //     status: "",
  //     image: null,
  //     quantity: 0,
  //     priceBeforeDiscount: 0,
  //     priceAfterDiscount: null,
  //     isHot: hot,
  //     isNew: newProduct,
  //   },

  // onSubmit: async (values, { resetForm }) => {
  // console.log(values);
  // const imageRef = ref(storage, `images/${values.image.name}`);
  // //upload image to firebase
  // uploadBytes(imageRef, values.image).then((result) => {
  //   alert("Image uploaded");
  // });
  // await sleep(5000);
  // //getDownload url
  // getDownloadURL(imageRef)
  //   .then((url) => {
  //     formik.values.image = url;
  //   })
  //   .then(() => {
  //     dispatch(actAddProduct(values));
  //     // data = {
  //     //   ...values,
  //     //   categories: {

  //     //   }
  //     // }
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // resetForm({ values: "" });
  //   },
  // });

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
          category: [],
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

            <Grid item xs={6}>
              <ImageInput />
            </Grid>

            <Grid item xs={3}>
              <FormControlLabel
                value="end"
                control={<Field as={Switch} name="isHot" color="secondary" />}
                label="Hot"
                labelPlacement="end"
              />
            </Grid>

            <Grid item xs={3}>
              <FormControlLabel
                value="end"
                control={<Field as={Switch} name="isNew" color="secondary" />}
                label="New"
                labelPlacement="end"
              />
            </Grid>

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

            <Grid item xs={12}>
              <AttributeInput />
            </Grid>

            {/* Categories */}
            {/* <FieldArray name="category">
              {({ push, remove }) => (
                <React.Fragment>
                  <Grid item xs={12}>
                    <Button
                      size="small"
                      color="secondary"
                      type="button"
                      onClick={() => push({ name: "", value: "" })}
                    >
                      Click to add Categories
                    </Button>
                  </Grid>

                  {formik.values.category && formik.values.category.length > 0
                    ? formik.values.category.map((item, index) => (
                        <React.Fragment key={index}>
                          <Grid item xs={3}>
                            <Select
                              name={`category[${index}].name`}
                              variant="outlined"
                              size="small"
                              fullWidth
                              onChange={formik.handleChange}
                            >
                              // <MenuItem value={item.id}>{item.name}</MenuItem>

                                <MenuItem value="cateShirt">Shirt</MenuItem>
                                <MenuItem value="catePants">Pants</MenuItem>
                                <MenuItem value="cateDressAndSkirt">Dress and Skirt</MenuItem>
                                <MenuItem value="cateShoes">Shoes</MenuItem>
                          </Grid>

                          <Grid item xs={8}>
                            <Select
                              name={`category[${index}].value`}
                              variant="outlined"
                              size="small"
                              fullWidth
                            >
                              {optionsData[item.name]?.map((option, index) => (
                                <MenuItem key={index} value={option.value}>
                                  {option.key}
                                </MenuItem>
                              ))}
                            </Select>
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
                                onClick={() => remove(index)}
                              >
                                <DeleteIcon color="secondary" />
                              </IconButton>
                            </Stack>
                          </Grid>
                        </React.Fragment>
                      ))
                    : ""}
                </React.Fragment>
              )}
            </FieldArray> */}
            {/*  End Categories */}

            {/* Attribute */}
            {/* <FieldArray name="attribute">
              {({ push, remove }) => (
                <React.Fragment>
                  <Grid item xs={12}>
                    <Button
                      size="small"
                      color="secondary"
                      type="button"
                      onClick={() => push({ name: "", value: "" })}
                    >
                      Click to add Attributes
                    </Button>
                  </Grid>

                  {formik.values.attribute && formik.values.attribute.length > 0
                    ? formik.values.attribute.map((item, index) => (
                        <React.Fragment key={index}>
                          <Grid item xs={3}>
                            <Select
                              name={`attribute[${index}].name`}
                              variant="outlined"
                              size="small"
                              fullWidth
                              onChange={formik.handleChange}
                            >
                              <MenuItem value="insurances">Insurances</MenuItem>
                              <MenuItem value="origin">Origin</MenuItem>
                              <MenuItem value="material">Material</MenuItem>
                            </Select>
                          </Grid>

                          <Grid item xs={8}>
                            <Select
                              name={`attribute[${index}].value`}
                              variant="outlined"
                              size="small"
                              fullWidth
                            >
                              {optionsData[item.name]?.map((option, index) => (
                                <MenuItem key={index} value={option.value}>
                                  {option.key}
                                </MenuItem>
                              ))}
                            </Select>
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
                                onClick={() => remove(index)}
                              >
                                <DeleteIcon color="secondary" />
                              </IconButton>
                            </Stack>
                          </Grid>
                        </React.Fragment>
                      ))
                    : ""}
                </React.Fragment>
              )}
            </FieldArray> */}
            {/* End Attribute */}

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
