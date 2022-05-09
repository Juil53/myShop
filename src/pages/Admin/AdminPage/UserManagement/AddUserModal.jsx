import * as React from "react";
import { useDispatch } from "react-redux";
import { Box, MenuItem, TextField, Modal } from "@mui/material";
import { useFormik } from "formik";
import { validation } from "../../../../validation/validation";
import { actAddUser, actGetUser } from "../../../../store/actions/user";

// Modal Style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

//Modal Select Role
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

export default function AddUserModal(props) {
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
      props.close()
    },
  });


  return (
    <div>
      <Modal
        open={props.show}
        onClose={props.close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Modal Content */}
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            onSubmit={formik.handleSubmit}
          >
            <h1 className="admin__title">Add User</h1>

            <div className="admin__form">
              <TextField
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

            <div className="admin__btn">
              <button className="btn btn--success" type="submit">
                Submit
              </button>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
