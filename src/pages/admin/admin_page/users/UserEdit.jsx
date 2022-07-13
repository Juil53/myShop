import { Box, Button, Grid, MenuItem, Paper, Stack, TextField } from "@mui/material";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SimpleSnackbar from "../../../../components/admin/SimpleSnackbar";
import { db } from "../../../../service/auth";

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

const style = {
  img: {
    width: "200px",
    height: "200px",
    border: "1px solid",
    borderRadius: "50%",
  },
};

const UserEdit = () => {
  const navigate = useNavigate();  
  const params = useParams();
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const [role, setRole] = useState("");

  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    password: "",
    email: "",
    address: "",
    phonenumber: "",
    gender: "",
    education: "",
    identify: "",
    role: "",
    avatar: "",
  });

  useEffect(() => {
    if (data) {
      setState({
        firstname: data.firstname,
        lastname: data.lastname,
        password: data.password,
        email: data.email,
        address: data.address,
        gender: data.gender,
        education: data.education,
        identify: data.identify,
        phonenumber: data.phonenumber,
        avatar: data.avatar,
      });
      setRole(data.role);
    } else {
      setState({
        firstname: "",
        lastname: "",
        password: "",
        email: "",
        address: "",
        gender: "",
        education: "",
        identify: "",
        phonenumber: "",
        avatar: "",
      });
      setRole("");
    }
  }, [data]);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setRole(event.target.value);
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userRef = doc(db,'users',params.id)
    await updateDoc(userRef,state)
  };

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "users", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Box component={Paper} sx={{ width: 700, margin: "0 auto" }} elevation={3}>
        <Box component="form" style={{ marginTop: 30, padding: 30 }}>
          <h1 className="admin__title">Edit User</h1>

          <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
            <Grid item xs={6} sx={{ textAlign: "center" }}>
              <img
                value={state.avatar}
                src={state.avatar ? state.avatar : "/img/default_avatar.png"}
                alt=""
                style={style.img}
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
                  label="Email"
                  name="email"
                  value={state.email}
                  onChange={handleOnChange}
                />
                <TextField
                  size="small"
                  variant="standard"
                  required
                  label="Address"
                  name="address"
                  value={state.address}
                  onChange={handleOnChange}
                />

                <TextField
                  size="small"
                  variant="standard"
                  required
                  label="Gender"
                  name="gender"
                  value={state.gender}
                  onChange={handleOnChange}
                />
                <TextField
                  size="small"
                  variant="standard"
                  required
                  label="Education"
                  name="education"
                  value={state.education}
                  onChange={handleOnChange}
                />
                <TextField
                  size="small"
                  variant="standard"
                  required
                  label="Identify"
                  name="identify"
                  value={state.identify}
                  onChange={handleOnChange}
                />
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

          <Box>
            <Stack direction="row" spacing={1} justifyContent="center" mt={1}>
              <Button
                variant="contained"
                color="success"
                size="small"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </Button>

              <Button
                variant="contained"
                size="small"
                color="warning"
                onClick={() => navigate("/admin/users")}
              >
                Back
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>

      <SimpleSnackbar show={show} setShow={setShow} type="edit" />
    </div>
  );
};

export default UserEdit;
