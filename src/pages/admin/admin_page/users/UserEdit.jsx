import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Box, Button, Grid, MenuItem, Paper, Stack, TextField } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Field, Formik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SimpleSnackbar from "../../../../components/admin/SimpleSnackbar";
import { db, storage } from "../../../../service/auth";
import { selectUserInfo } from "../../../../store/users/selector";
import { getUserRequest } from "../../../../store/users/usersSlice";
import { validation } from "../../../../validation/Validation";
import { roles, style } from "./logic";

const UserEdit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);

  const [show, setShow] = useState(false);
  const [file, setFile] = useState("");
  const [per, setPer] = useState(null);
  const [img, setImg] = useState({});
  const [severity, setSeverity] = useState({
    type: "",
    message: "",
  });

  useEffect(() => {
    dispatch(getUserRequest(params.id));
  }, []);

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, `users/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPer(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImg((prev) => ({ ...prev, image: downloadURL }));
            console.log(img.image);
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  return (
    <div>
      <Box component={Paper} sx={{ width: 800, margin: "0 auto" }} elevation={3}>
        <Box style={{ marginTop: 30, padding: 30 }}>
          <h1 className="admin__title" style={{ textAlign: "center" }}>
            Edit User
          </h1>

          <Formik
            initialValues={{
              firstname: user.firstname || "",
              lastname: user.lastname || "",
              password: user.password || "",
              email: user.email || "",
              address: user.address || "",
              gender: user.gender || "",
              education: user.education || "",
              identify: user.identify || "",
              avatar: user.avatar || "",
              phonenumber: user.phonenumber || "",
              role: user.role || "Staff",
            }}
            validationSchema={validation}
            enableReinitialize={true} // allow reinitialize formmik initial value and trigger re-render
            onSubmit={async (values, { resetForm }) => {
              await updateDoc(doc(db, "users", params.id), {
                ...values,
                avatar: img.image || user.avatar,
                timeStamp: moment().format("MM DD YYYY"),
              });
              setSeverity({
                type:'success',
                message:`Edited ${user.firstname} ${user.lastname} successful!`
              })
              setShow(true);
            }}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
                  <Grid item xs={6} sx={{ textAlign: "center" }}>
                    <img
                      value={props.values.avatar}
                      src={file ? URL.createObjectURL(file) : props.values.avatar}
                      alt="avatar"
                      style={style.img}
                    />
                    <label htmlFor="icon-button-file">
                      <input
                        id="icon-button-file"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                      <Button
                        aria-label="upload picture"
                        component="span"
                        variant="outlined"
                        startIcon={<UploadFileIcon />}
                      >
                        Upload image
                      </Button>
                    </label>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="admin__form">
                      <Field
                        as={TextField}
                        size="small"
                        variant="outlined"
                        fullWidth
                        required
                        label="First Name"
                        name="firstname"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.firstname}
                        helperText={props.touched.firstname && props.errors.firstname}
                        error={props.touched.firstname && props.errors.firstname ? true : false}
                      />
                      <TextField
                        size="small"
                        variant="outlined"
                        required
                        label="Last Name"
                        name="lastname"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.lastname}
                        helperText={props.touched.lastname && props.errors.lastname}
                        error={props.touched.lastname && props.errors.lastname ? true : false}
                      />
                      <TextField
                        size="small"
                        variant="outlined"
                        required
                        label="Email"
                        name="email"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.email}
                        helperText={props.touched.email && props.errors.email}
                        error={props.touched.email && props.errors.email ? true : false}
                      />
                      <TextField
                        size="small"
                        variant="outlined"
                        required
                        label="Address"
                        name="address"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.address}
                        helperText={props.touched.address && props.errors.address}
                        error={props.touched.address && props.errors.address ? true : false}
                      />

                      <TextField
                        size="small"
                        variant="outlined"
                        required
                        label="Gender"
                        name="gender"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.gender}
                        helperText={props.touched.gender && props.errors.gender}
                        error={props.touched.gender && props.errors.gender ? true : false}
                      />
                      <TextField
                        size="small"
                        variant="outlined"
                        required
                        label="Education"
                        name="education"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.education}
                        helperText={props.touched.education && props.errors.education}
                        error={props.touched.education && props.errors.education ? true : false}
                      />
                      <TextField
                        size="small"
                        variant="outlined"
                        required
                        label="Identify"
                        name="identify"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.identify}
                        helperText={props.touched.identify && props.errors.identify}
                        error={props.touched.identify && props.errors.identify ? true : false}
                      />
                      <TextField
                        size="small"
                        variant="outlined"
                        required
                        label="Phone number"
                        name="phonenumber"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.phonenumber}
                        helperText={props.touched.phonenumber && props.errors.phonenumber}
                        error={
                          props.touched.phonenumber && props.errors.phonenumber ? true : false
                        }
                      />

                      <TextField
                        size="small"
                        variant="outlined"
                        required
                        select
                        label="Select Role"
                        name="role"
                        value={props.values.role}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        helperText={props.touched.role && props.errors.role}
                        error={props.touched.role && props.errors.role ? true : false}
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
                <Stack direction="row" spacing={1} justifyContent="center" mt={1}>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    type="submit"
                    disabled={per !== null && per < 100}
                  >
                    Save
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
              </form>
            )}
          </Formik>
        </Box>
      </Box>

      <SimpleSnackbar show={show} setShow={setShow} severity={severity} />
    </div>
  );
};

export default UserEdit;
