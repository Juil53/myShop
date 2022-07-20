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
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import SimpleSnackbar from "../../../../components/admin/SimpleSnackbar";
import { db, storage } from "../../../../service/auth";
import { getProductInfo, getProductInfoRequest } from "../../../../store/admin_product/productSlice";
import { selectProductInfo } from "../../../../store/admin_product/selector";
import { TextFieldCustom } from "../../../../styles/styled_components/styledComponent";
import AttributeInput from "./add_product/AttributeInput";
import CategoriesInput from "./add_product/CategoriesInput";
import ImageInput from "./add_product/ImageInput";

export default function EditProduct() {
  const params = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const product = useSelector(selectProductInfo)  

  useEffect(() => {
    dispatch(getProductInfoRequest(params.id))
    setData(product)
  }, []);

  return (
    <Box component={Paper} elevation={5} padding={5} width="100%" margin="auto">
      <Typography variant="h4" marginBottom={2} sx={{ fontWeight: 700 }}>
        Edit Product
      </Typography>

      {data && (
        <Formik
          initialValues={{
            name: data.name || "",
            brand: data.brand || "",
            attributes: data.attributes || [],
            categories: data.categories || [],
            desc: data.desc || "",
            status: data.status || "",
            image: data.image || [],
            available: data.available || "",
            priceBeforeDiscount: data.priceBeforeDiscount || 0,
            priceAfterDiscount: data.priceAfterDiscount || 0,
            isHot: data.isHot || false,
            isNew: data.isNew || false,
          }}
          enableReinitialize
          onSubmit={async (values) => {
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
            
            const productRef = doc(db, "products", params.id);
            await updateDoc(productRef, editedValues);
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
                  <ImageInput data={data} />
                </Grid>

                {/* Hot */}
                <Grid item xs={3}>
                  <FormControlLabel
                    control={
                      <Field as={Switch} name="isHot" color="primary" checked={values.isHot} />
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
                      <Field as={Switch} name="isNew" color="primary" checked={values.isNew} />
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
                  <Button variant="contained" color="error" type="submit" size="small">
                    Reset
                  </Button>
                  <Link to="/admin/products">
                    <Button variant="contained" color="warning">
                      Back
                    </Button>
                  </Link>
                </Stack>
              </Grid>
            </Form>
          )}
        </Formik>
      )}
      <SimpleSnackbar show={show} setShow={setShow} type="edit" />
    </Box>
  );
}
