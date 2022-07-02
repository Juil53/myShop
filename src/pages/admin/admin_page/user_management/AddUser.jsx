import { Box, Button, Grid, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectLoading } from "../../../../store/users/selector";
import { submitUserRequest } from "../../../../store/users/usersSlice";
import { validation } from "../../../../validation/Validation";
import SimpleSnackbar from "../component/SimpleSnackbar";
import Breadcrumb from "../../../../components/breadcumb/BreadCumb";

// SELECT ROLE

const roles = [
  {
    value: "Staff",
    label: "Staff",
  },
  {
    value: "Admin",
    label: "Admin",
  },
];
const container = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  margin: "auto",
  padding: "2rem",
  bgcolor: "background.paper",
  boxShadow: 3,
  borderRadius: 2,
};
const userImage = {
  display:"flex",
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center',
  width: "25%",
  marginRight: 2,
  padding: 3,
};
const user__form = {
  width: "75%",
  padding: 3,
};

export default function AddUser(props) {
  const pages = [
    {
      name: "Admin",
      url: "/admin",
    },
    {
      name: "Users",
      url: "/admin/users",
    },
    {
      name: "Add",
      url: "/admin/add",
    },
  ];

  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const [role, setRole] = useState("");
  const [file, setFile] = useState("");
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      password: "",
      email: "",
      address: "",
      gender: "",
      education: "",
      identify: "",
      avatar: "",
      phonenumber: "",
      role: role,
    },
    validationSchema: validation,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      dispatch(submitUserRequest({ values }));
      setShow(true);
      setSubmitting(false);
      resetForm();
    },
  });

  return (
    <div>
      <Breadcrumb pages={pages} />
      <Typography variant="h4" fontWeight={400} my={1}>
        Add User
      </Typography>
      <Box sx={container}>
        <Box className="user__image" sx={userImage}>
          <img
            src={file ? URL.createObjectURL(file) : "/img/default_avatar.png"}
            alt="avatar"
            width="100%"
            height="250px"
            style={{ borderRadius: "50%",marginBottom:'1rem' }}
          />
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </Box>
        <Box className="user__form" sx={user__form} component="form" onSubmit={formik.handleSubmit}>
          <div className="admin__form">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  color="secondary"
                  fullWidth
                  variant="outlined"
                  required
                  label="First Name"
                  name="firstname"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstname}
                  helperText={formik.touched.firstname && formik.errors.firstname}
                  error={formik.touched.firstname && formik.errors.firstname ? true : false}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  color="secondary"
                  variant="outlined"
                  required
                  label="Last Name"
                  name="lastname"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastname}
                  helperText={formik.touched.lastname && formik.errors.lastname}
                  error={formik.touched.lastname && formik.errors.lastname ? true : false}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={8}>
                <TextField
                  size="small"
                  color="secondary"
                  variant="outlined"
                  required
                  label="Email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  helperText={formik.touched.email && formik.errors.email}
                  error={formik.touched.email && formik.errors.email ? true : false}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  color="secondary"
                  variant="outlined"
                  label="Identify"
                  name="identify"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.identify}
                  helperText={formik.touched.identify && formik.errors.identify}
                  error={formik.touched.identify && formik.errors.identify ? true : false}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={8}>
                <TextField
                  size="small"
                  color="secondary"
                  variant="outlined"
                  label="Address"
                  name="address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                  helperText={formik.touched.address && formik.errors.address}
                  error={formik.touched.address && formik.errors.address ? true : false}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  color="secondary"
                  variant="outlined"
                  label="Gender"
                  name="gender"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.gender}
                  helperText={formik.touched.gender && formik.errors.gender}
                  error={formik.touched.gender && formik.errors.gender ? true : false}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  color="secondary"
                  variant="outlined"
                  type="password"
                  required
                  label="Password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  helperText={formik.touched.password && formik.errors.password}
                  error={formik.touched.password && formik.errors.password ? true : false}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  color="secondary"
                  variant="outlined"
                  required
                  select
                  label="Select Role"
                  name="role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.role && formik.errors.role}
                  error={formik.touched.role && formik.errors.role ? true : false}
                >
                  {roles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  color="secondary"
                  variant="outlined"
                  required
                  label="Phone number"
                  name="phonenumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phonenumber}
                  helperText={formik.touched.phonenumber && formik.errors.phonenumber}
                  error={formik.touched.phonenumber && formik.errors.phonenumber ? true : false}
                />
              </Grid>
            </Grid>
          </div>

          <Grid container spacing={2} mt={1}>
            <Grid item xs={6}>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="success" type="submit">
                  Submit
                </Button>
                <Link to="/admin/users">
                  <Button variant="contained" color="secondary">
                    Back
                  </Button>
                </Link>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        <SimpleSnackbar show={show} setShow={setShow} type="add" />
      </Box>
    </div>
  );
}
