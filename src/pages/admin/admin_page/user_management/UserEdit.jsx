import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Grid, MenuItem, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectUserInfo } from "../../../../store/users/selector";
import { getUserRequest, updateUserInfo } from "../../../../store/users/usersSlice";

//MODAL SELECT ROLE
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

const UserEdit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => selectUserInfo(state, params.id));
  console.log(userInfo)

  React.useEffect(() => {
    dispatch(getUserRequest());
  }, []);

  const [role, setRole] = React.useState("");
  const [state, setState] = React.useState({
    firstname: "",
    lastname: "",
    password: "",
    email: "",
    phonenumber: "",
    role: "",
    avatar: "",
  });

  React.useEffect(() => {
    if (userInfo) {
      setState({
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        password: userInfo.password,
        email: userInfo.email,
        phonenumber: userInfo.phonenumber,
        avatar: userInfo.avatar,
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
        avatar: "",
      });
      setRole("");
    }
  }, [userInfo]);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setRole(event.target.value);
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userInfo !== null)
      return dispatch(updateUserInfo({ state, id: userInfo.id })), navigate("/admin/users");
  };

  return (
    <div>
      <Box component={Paper} sx={{ width: 700, margin: "0 auto" }} elevation={5}>
        <Box component="form" style={{ marginTop: 30, padding: 30 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            color="secondary"
            onClick={() => navigate("/admin/users")}
          >
            Back
          </Button>
          <h1 className="admin__title">Edit User</h1>

          <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
            <Grid item xs={6} sx={{ textAlign: "center" }}>
              <img
                value={state.avatar}
                src={state.avatar ? state.avatar : "/img/default_avatar.png"}
                alt=""
                style={{
                  width: "200px",
                  height: "200px",
                  border: "1px solid",
                  borderRadius: "50%",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <div className="admin__form">
                <TextField
                  size="small"
                  variant="standard"
                  fullWidth
                  required
                  label="First Name"
                  name="firstname"
                  value={state.firstname}
                  onChange={handleOnChange}
                />
                <TextField
                  size="small"
                  variant="standard"
                  required
                  label="Last Name"
                  name="lastname"
                  value={state.lastname}
                  onChange={handleOnChange}
                />
                <TextField
                  size="small"
                  variant="standard"
                  required
                  label="Email Name"
                  name="email"
                  value={state.email}
                  onChange={handleOnChange}
                />

                {/* data thieu password,them vao sau */}
                {/* <TextField
                  size="small"
                  variant="standard"
                  type="password"
                  required
                  label="Password"
                  name="password"
                  value={state.password}
                  onChange={handleOnChange}
                /> */}
                <TextField
                  size="small"
                  variant="standard"
                  required
                  label="Phone number"
                  name="phonenumber"
                  value={state.phonenumber}
                  onChange={handleOnChange}
                />
                <TextField
                  size="small"
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
            </Grid>
          </Grid>

          <div className="admin__btn" style={{ textAlign: "center", marginTop: "1rem" }}>
            <Button
              variant="contained"
              color="success"
              size="small"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default UserEdit;
