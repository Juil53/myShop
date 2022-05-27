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
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useFormik, FormikProvider, FieldArray, Field } from "formik";
import {
  actAddProduct,
  actGetOptions,
} from "../../../../store/admin_product/action";
import { useSelector, useDispatch } from "react-redux";
import { storage } from "../../../../utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Input = styled("input")({
  display: "none",
});

export default function AddProduct() {
  const dispatch = useDispatch();
  const optionsData = useSelector((state) => state.adminProduct.options);
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    toggle ? setToggle(false) : setToggle(true);
  };
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  useEffect(() => {
    dispatch(actGetOptions());
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      brand: "",
      attribute: [],
      description: "",
      status: "",
      image: "",
      quantity: "",
      price_before_discount: "",
      isHot: toggle,
    },

    onSubmit: async (values) => {
      console.log(values);
      let image = document.getElementById("my_image");
      image.src = URL.createObjectURL(values.image);

      const imageRef = ref(storage, `images/${values.image.name}`);
      //upload image to firebase
      uploadBytes(imageRef, values.image).then((result) => {
        alert("Image uploaded");
      });
      await sleep(5000);
      //getDownload url
      getDownloadURL(imageRef)
        .then((url) => {
          console.log(url);
          formik.values.image = url;
        })
        .then(() => {
          dispatch(actAddProduct(values));
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <FormikProvider value={formik}>
      <Box
        component={Paper}
        elevation={5}
        padding={5}
        width="80%"
        margin="auto"
      >
        <Link to="/admin/product-management">
          <Button startIcon={<ArrowBackIcon />} color="secondary">
            Back to Products list...
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
                name="price_before_discount"
                type="number"
                value={formik.values.price_before_discount}
                onChange={formik.handleChange}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                label="Price"
                size="small"
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
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
                  component="span"
                  color="secondary"
                  size="small"
                >
                  <PhotoCamera sx={{ marginRight: "5px" }} />
                  Upload
                </Button>
              </label>

              {formik.values.image ? (
                <img id="my_image" height="100px" style={{ margin: "1rem" }} />
              ) : (
                ""
              )}
            </Grid>

            <Grid item xs={6}>
              <FormControlLabel
                value="end"
                control={
                  <Field
                    name="isHot"
                    component={Switch}
                    onChange={handleToggle}
                    value={(formik.values.isHot = toggle)}
                    checked={toggle}
                    color="secondary"
                  />
                }
                label="Hot"
                labelPlacement="end"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={3}
                label="Description"
              />
            </Grid>

            {/* FieldArray */}
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
            {/* End FieldArray */}

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
                Cancel
              </Button>
            </Stack>
          </Grid>
        </form>
      </Box>
    </FormikProvider>
  );
}
