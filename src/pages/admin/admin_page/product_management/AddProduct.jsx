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
import { useFormik, FormikProvider, FieldArray, Field } from "formik";
import {
  actAddProduct,
  actGetCategories,
  actGetOptions,
} from "../../../../store/admin_product/action";
import { useSelector, useDispatch } from "react-redux";
import { storage } from "../../../../utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import PreviewImg from "./PreviewImg";

const Input = styled("input")({
  display: "none",
});

export default function AddProduct() {
  const dispatch = useDispatch();
  const optionsData = useSelector((state) => state.adminProduct.options);
  const categoriesOptions = useSelector((state) => state.adminProduct.categories)
  console.log(categoriesOptions)
  const [hot, setHot] = useState(false);
  const handleHot = () => (hot ? setHot(false) : setHot(true));
  const [newProduct, setNewProduct] = useState(false);
  const handleNewProduct = () =>
    newProduct ? setNewProduct(false) : setNewProduct(true);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  useEffect(() => {
    dispatch(actGetOptions());
    dispatch(actGetCategories());
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      brand: "",
      attribute: [],
      category:[],
      desc: "",
      status: "",
      image: null,
      quantity: 0,
      priceBeforeDiscount: 0,
      priceAfterDiscount: null,
      isHot: hot,
      isNew: newProduct,
    },

    onSubmit: async (values, { resetForm }) => {
      console.log(values);

      const imageRef = ref(storage, `images/${values.image.name}`);
      //upload image to firebase
      uploadBytes(imageRef, values.image).then((result) => {
        alert("Image uploaded");
      });
      await sleep(5000);
      //getDownload url
      getDownloadURL(imageRef)
        .then((url) => {
          formik.values.image = url;
        })
        .then(() => {
          dispatch(actAddProduct(values));
          // data = {
          //   ...values,
          //   categories: {

          //   }
          // }
        })
        .catch((error) => {
          console.log(error);
        });
      resetForm({ values: "" });
    },
  });

  return (
    <FormikProvider value={formik}>
      <Box
        component={Paper}
        elevation={5}
        padding={5}
        width="100%"
        margin="auto"
      >
        <Link to="/admin/product-management">
          <Button startIcon={<ArrowBackIcon />} color="secondary">
            Back
          </Button>
        </Link>

        <Typography variant="h4" marginBottom={2} sx={{ fontWeight: 700 }}>
          Add Product
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                label="Product Name"
                size="small"
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                name="brand"
                value={formik.values.brand}
                onChange={formik.handleChange}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                label="Brand"
                size="small"
                fullWidth
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                label="Status"
                size="small"
                fullWidth
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                name="quantity"
                type="number"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                label="Quantity"
                size="small"
                fullWidth
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                name="priceBeforeDiscount"
                type="number"
                value={formik.values.priceBeforeDiscount}
                onChange={formik.handleChange}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                label="Price"
                size="small"
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    name="image"
                    onChange={(event) =>
                      formik.setFieldValue("image", event.target.files[0])
                    }
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                    component="span"
                    startIcon={<PhotoCamera />}
                  >
                    Upload
                  </Button>

                  {formik.values.image && (
                    <PreviewImg image={formik.values.image} />
                  )}
                </label>
              </Stack>
            </Grid>

            <Grid item xs={3}>
              <FormControlLabel
                value="end"
                control={
                  <Field
                    name="isHot"
                    component={Switch}
                    onChange={handleHot}
                    value={(formik.values.isHot = hot)}
                    checked={hot}
                    color="secondary"
                  />
                }
                label="Hot"
                labelPlacement="end"
              />
            </Grid>

            <Grid item xs={3}>
              <FormControlLabel
                value="end"
                control={
                  <Field
                    name="isNew"
                    component={Switch}
                    onChange={handleNewProduct}
                    value={(formik.values.isNew = newProduct)}
                    checked={newProduct}
                    color="secondary"
                  />
                }
                label="New"
                labelPlacement="end"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="desc"
                label="Description"
                value={formik.values.desc}
                onChange={formik.handleChange}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={3}
              />
            </Grid>

            {/* Categories */}
            <FieldArray name="category">
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
                          {/* {console.log(formik.values.category[item.name])} */}
                          <Grid item xs={3}>
                            <Field
                              name={`category[${index}].name`}
                              as={Select}
                              variant="outlined"
                              size="small"
                              fullWidth
                              onChange={formik.handleChange}
                            >
                              <MenuItem value={item.id}>{item.name}</MenuItem>

                              {/* <MenuItem value="cateShirt">Shirt</MenuItem>
                              <MenuItem value="catePants">Pants</MenuItem>
                              <MenuItem value="cateDressAndSkirt">Dress and Skirt</MenuItem>
                              <MenuItem value="cateShoes">Shoes</MenuItem> */}
                            </Field>
                          </Grid>

                          <Grid item xs={8}>
                            <Field
                              name={`category[${index}].value`}
                              as={Select}
                              variant="outlined"
                              size="small"
                              fullWidth
                            >
                              {optionsData[item.name]?.map((option, index) => (
                                <MenuItem key={index} value={option.value}>
                                  {option.key}
                                </MenuItem>
                              ))}
                            </Field>
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
            </FieldArray>
            {/*  End Categories */}

            {/* Attribute */}
            <FieldArray name="attribute">
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
                              {optionsData[item.name]?.map((option, index) => (
                                <MenuItem key={index} value={option.value}>
                                  {option.key}
                                </MenuItem>
                              ))}
                            </Field>
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
            </FieldArray>
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
                onClick={formik.resetForm}
              >
                Reset
              </Button>
            </Stack>
          </Grid>
        </form>
      </Box>
    </FormikProvider>
  );
}
