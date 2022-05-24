import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  Stack,
  Switch,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AttributeOptions from "./AtttributeOptions";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useFormik, FormikProvider, Field } from "formik";
import { actAddProduct } from "../../../../store/admin_product/action";
import { useDispatch } from "react-redux";
import { storage } from "../../../../utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Input = styled("input")({
  display: "none",
});

export default function AddProduct() {
  const [url, setUrl] = useState("");
  const [toggle, setToggle] = useState(false);
  console.log(toggle);
  const dispatch = useDispatch();

  const handleToggle = () => {
    toggle ? setToggle(false) : setToggle(true);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      brand: "",
      attribute: [],
      description: "",
      status: "",
      image: null,
      quantity: "",
      price_before_discount: "",
      is_hot: toggle,
    },
    onSubmit: (values) => {
      console.log(values);
      const imageRef = ref(storage, `images/${values.image.name}`);
      //upload image to firebase
      uploadBytes(imageRef, values.image).then((result) => {
        alert("Image uploaded");
      });
      //getDownload url
      getDownloadURL(imageRef).then((url) => {
        setUrl(url);
        formik.values.image = url;
      });
      // dispatch(actAddProduct(values));
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
              <img></img>
            </Grid>

            {/* <Grid item xs={6}>
              <Switch
                name="is_hot"
                value={formik.values.is_hot}
                onChange={handleToggle}
                checked={toggle}
              />
            </Grid> */}

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

            <AttributeOptions formik={formik} />

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
