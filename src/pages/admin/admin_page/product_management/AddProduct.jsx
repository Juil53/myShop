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
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const Input = styled("input")({
  display: "none",
});

export default function AddProduct() {
  const [attrFields, setAttrFields] = useState([]);
  const newField = { name: "", value: "" };
  const handleAddField = () => {
    setAttrFields([...attrFields, newField]);
  };

  const handleRemoveField = (index) => {
    let data = [...attrFields];
    data.splice(index, 1);
    setAttrFields(data);
  };

  const handleChange = (index, event) => {
    let data = [...attrFields];
    data[index][event.target.name] = event.target.value;
    setAttrFields(data);
    console.log(attrFields);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      brand: "",
      origin: "",
      status: "",
      attributes: [],
      status: "",
      image: "",
      quantity: "",
      price_before_discount: "",
    },
    // validationSchema: validation,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Box component={Paper} elevation={10} padding={5}>
      <Typography variant="h3" marginBottom={2}>
        Add Product
      </Typography>

      <Box component="form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} id="form_product">
          <Grid item xs={6}>
            <TextField
              size="small"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              label="Product Name"
              fullWidth
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              label="Brand"
              fullWidth
              name="brand"
              value={formik.values.brand}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              size="small"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              label="Status"
              fullWidth
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              label="Price"
              fullWidth
              name="price_before_discount"
              value={formik.values.price_before_discount}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              label="Quantity"
              fullWidth
              name="quantity"
              value={formik.values.quantity}
              onChange={formik.handleChange}
            />
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
                <Button variant="outlined" component="span">
                  Upload
                </Button>
              </label>
              <label htmlFor="icon-button-file">
                <Input accept="image/*" id="icon-button-file" type="file" />
                <IconButton
                  color="primary"
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
              size="small"
              fullWidth
              multiline
              rows={3}
              label="Description"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              component="span"
              onClick={handleAddField}
            >
              Add Field
            </Button>
          </Grid>

          {attrFields.map((input, index) => {
            return (
              <React.Fragment key={index}>
                <Grid item xs={2}>
                  <TextField
                    size="small"
                    fullWidth
                    name="name"
                    value={input.name}
                    onChange={(event) => handleChange(index, event)}
                  />
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    size="small"
                    fullWidth
                    name="value"
                    value={input.value}
                    onChange={(event) => handleChange(index, event)}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Button
                    variant="contained"
                    component="span"
                    sx={{ height: "100%", width: "100%" }}
                    onClick={() => {
                      handleRemoveField(index);
                    }}
                  >
                    -
                  </Button>
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>

        {/* Stack Button */}
        <Stack direction="row" alignItems="center" spacing={1} marginTop={2}>
          <Button
            variant="contained"
            size="small"
            color="success"
            type="submit"
          >
            Add
          </Button>
          <Button variant="contained" size="small" color="secondary">
            Cancel
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
