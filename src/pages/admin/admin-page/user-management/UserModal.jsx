import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, MenuItem, TextField, Modal } from "@mui/material";
import { actUpdateUserInfo } from "../../../../store/users/actions";
import { closeModal } from "../../../../store/users/usersSlice";
import { selectUserInfo, selectUserOpen } from "../../../../store/users/selector";

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

export default function BasicModal() {
  const dispatch = useDispatch();
  const open = useSelector(selectUserOpen);
  const userInfo = useSelector(selectUserInfo);
  const [role, setRole] = React.useState("");
  const [state, setState] = React.useState({
    firstname: "",
    lastname: "",
    password: "",
    email: "",
    phonenumber: "",
    role: "",
  });

  //CHECK SHOW USER INFO TO MODAL
  React.useEffect(() => {
    if (userInfo) {
      setState({
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        password: userInfo.password,
        email: userInfo.email,
        phonenumber: userInfo.phonenumber,
      });
      setRole(userInfo.role);
    } else {
      setState({
        firstname: "",
        lastname: "",
        password: "",
        email: "",
        phonenumber: "",
        role: "",
      });
      setRole("");
    }
  }, [userInfo]);

  //GET VALUE FROM FORM
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setRole(event.target.value);
    setState({
      ...state,
      [name]: value,
    });
  };

  //SUBMIT USER
  const handleSubmit = (event) => {
    event.preventDefault();
    if (userInfo !== null)
      return (
        dispatch(actUpdateUserInfo(state, userInfo.id)),
        dispatch(closeModal())
        )
  };

  //HANDLE CLOSE MODAL
  const handleClose = () => {
    dispatch(closeModal())
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
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
          >
            <h1 className="admin__title">Edit User</h1>
            <div className="admin__form">
              <TextField
                variant="standard"
                required
                label="First Name"
                name="firstname"
                value={state.firstname}
                onChange={handleOnChange}
              />
              <TextField
                variant="standard"
                required
                label="Last Name"
                name="lastname"
                value={state.lastname}
                onChange={handleOnChange}
              />
              <TextField
                variant="standard"
                required
                label="Email Name"
                name="email"
                value={state.email}
                onChange={handleOnChange}
              />
              <TextField
                variant="standard"
                type="password"
                required
                label="Password"
                name="password"
                value={state.password}
                onChange={handleOnChange}
              />
              <TextField
                variant="standard"
                required
                label="Phone number"
                name="phonenumber"
                value={state.phonenumber}
                onChange={handleOnChange}
              />
              <TextField
                variant="standard"
                required
                select
                label="Select Role"
                name="role"
                value={role}
                onChange={handleOnChange}
                helperText="Please select your role"
              >
                {roles.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="admin__btn">
              <button
                className="btn btn--success"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
