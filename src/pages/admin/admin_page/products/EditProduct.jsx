import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import SimpleSnackbar from "../../../../components/admin/SimpleSnackbar";
import { db, storage } from "../../../../service/auth";
import { getProductInfoRequest } from "../../../../store/admin_product/productSlice";
import { selectProductInfo } from "../../../../store/admin_product/selector";
import { TextFieldCustom } from "../../../../styles/styled_components/styledComponent";
import AttributeInput from "./add_product/AttributeInput";
import CategoriesInput from "./add_product/CategoriesInput";
import ImageInput from "./add_product/ImageInput";

export default function EditProduct() {
  const params = useParams();
  const dispatch = useDispatch();
  
  const product = useSelector(selectProductInfo);

  const [show, setShow] = useState(false);
  const [severity, setSeverity] = useState({
    type: "",
    message: "",
  });

  useEffect(() => {
    dispatch(getProductInfoRequest(params.id));
  }, []);

  return (
    <Box component={Paper} elevation={5} padding={5} width="100%" margin="auto">
      <Typography variant="h4" marginBottom={2} sx={{ fontWeight: 700 }}>
        Edit Product
      </Typography>

      <Formik
        initialValues={{
          name: product.name || "",
          brand: product.brand || "",
          attributes: product.attributes || [],
          categories: product.categories || [],
          desc: product.desc || "",
          status: product.status || "",
          image: product.image || [],
          available: product.available || "",
          priceBeforeDiscount: product.priceBeforeDiscount || 0,
          priceAfterDiscount: product.priceAfterDiscount || 0,
          isHot: product.isHot || false,
          isNew: product.isNew || false,
        }}
        enableReinitialize={true}
        onSubmit={async (values) => {
          const tempUrl = [];
          let editedValues;
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

          if (tempUrl.length > 0) {
            editedValues = {
              ...values,
              image: tempUrl,
            };
          } else {
            editedValues = {
              ...values,
            };
          }

          const productRef = doc(db, "products", params.id);
          await updateDoc(productRef, editedValues);
          setSeverity({
            type:'success',
            message:`Edit product ${product.id} successful!`
          })
          setShow(true);
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
              <Grid item xs={3}>
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
              <Grid item xs={3}>
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

              {/* Price */}
              <Grid item xs={3}>
                <Field
                  as={TextFieldCustom}
                  value={values.priceBeforeDiscount}
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
                  value={values.priceAfterDiscount}
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

              {/* Hot & New */}
              <Grid item xs={3}>
                <FormControlLabel
                  control={
                    <Field as={Switch} name="isHot" color="primary" checked={values.isHot} />
                  }
                  label="Hot"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="end"
                  control={
                    <Field as={Switch} name="isNew" color="primary" checked={values.isNew} />
                  }
                  label="New"
                  labelPlacement="end"
                />
              </Grid>

              {/* Image */}
              <Grid item xs={6}>
                <ImageInput data={product.image} />
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
                  placeholder="??o kho??c Cardigan v???i phong c??ch tr??? trung, thi???t k??? ????n gi???n d??? ph???i ?????,... "
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
                  Save
                </Button>
                <Button variant="contained" color="error" type="submit" size="small">
                  Reset
                </Button>
                <Link to="/admin/products">
                  <Button variant="contained" color="primary" size="small">
                    Back
                  </Button>
                </Link>
              </Stack>
            </Grid>
          </Form>
        )}
      </Formik>
      <SimpleSnackbar show={show} setShow={setShow} severity={severity} />
    </Box>
  );
}
