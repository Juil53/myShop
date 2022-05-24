import * as React from "react";
import { useDispatch } from "react-redux";
import { Box, MenuItem, TextField, Modal, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import { validation } from "../../../../validation/Validation";
import { actAddUser } from "../../../../store/users/actions";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

//Select Role
const roles = [
  {
    value: "Client",
    label: "Client",
  },
  {
    value: "Admin",
    label: "Admin",
  },
];
const container = {
  width: '80%',
  display: 'flex',
  flexDirection: 'row',
  margin: 'auto',
  padding: '2rem',
  bgcolor: 'background.paper',
  boxShadow: 3,
  borderRadius: 2,
}
const userImage = {
  width: '40%',
  marginRight: 2,
  padding: 3,
  flexGrow: 1,
  backgroundImage: 'url(https://source.unsplash.com/random)',
  backgroundSize: '100%',
  backgroundPosition: 'center center',
  borderRadius: 2,
  boxShadow: 3,
}
const user__form = {
  width: '50%',
  padding: 3
}
const admin__btn = {
  marginTop: 2
}

export default function AddUser(props) {
  const dispatch = useDispatch();
  const [role, setRole] = React.useState("");
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      password: "",
      email: "",
      phonenumber: "",
      role: role,
    },
    validationSchema: validation,
    onSubmit: (values) => {
      dispatch(actAddUser(values));
      props.close();
    },
  });

  return (
    <div>

      <Box sx={container}>
        <Box className="user__image" sx={userImage}></Box>
        <Box
          className="user__form"
          sx={user__form}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <Link to="/admin/user-management">
            <Button startIcon={<ArrowBackIcon/>} color="secondary">Back to List User...</Button>
          </Link>
          <Typography variant="h4" fontWeight={700}>Add User</Typography>
          <div className="admin__form">
            <TextField
              fullWidth
              variant="standard"
              required
              label="First Name"
              name="firstname"
              onChange={formik.handleChange}
              value={formik.values.firstname}
              helperText={formik.errors.firstname}
              error={formik.errors.firstname}
            />
            <TextField
              variant="standard"
              required
              label="Last Name"
              name="lastname"
              onChange={formik.handleChange}
              value={formik.values.lastname}
              helperText={formik.errors.lastname}
              error={formik.errors.lastname}
            />
            <TextField
              variant="standard"
              required
              label="Email Name"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              helperText={formik.errors.email}
              error={formik.errors.email}
            />
            <TextField
              variant="standard"
              type="password"
              required
              label="Password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              helperText={formik.errors.password}
              error={formik.errors.password}
            />
            <TextField
              variant="standard"
              required
              label="Phone number"
              name="phonenumber"
              onChange={formik.handleChange}
              value={formik.values.phonenumber}
              helperText={formik.errors.phonenumber}
              error={formik.errors.phonenumber}
            />
            <TextField
              variant="standard"
              required
              select
              label="Select Role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              helperText={formik.errors.role}
              error={formik.errors.role}
            >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <Box className="admin__btn" sx={admin__btn}>
            <Button variant="contained" color="success" type="submit">
              Submit
            </Button>
          </Box>
        </Box>
      </Box>

    </div>
  );
}
