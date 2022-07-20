import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Box, Button, Grid, MenuItem, Paper, Stack, TextField } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useFormik } from "formik";
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

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      password: '',
      email: '',
      address: '',
      gender: '',
      education: '',
      identify: '',
      avatar: '',
      phonenumber: '',
      role: '',
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      await updateDoc(doc(db, "users", params.id), {
        ...values,
        avatar: img.image || "",
        timeStamp: moment().format("MM DD YYYY"),
      });
      setShow(true);
    },
  });

  useEffect(() => {
    formik.values = {...formik.values, ...user};
  }, [user])

  console.log("abc");

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

          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
              <Grid item xs={6} sx={{ textAlign: "center" }}>
                <img
                  value={formik.values.avatar}
                  src={file ? URL.createObjectURL(file) : formik.values.avatar}
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
                  <TextField
                    size="small"
                    variant="outlined"
                    fullWidth
                    required
                    label="First Name"
                    name="firstname"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstname}
                    helperText={formik.touched.firstname && formik.errors.firstname}
                    error={formik.touched.firstname && formik.errors.firstname ? true : false}
                  />
                  <TextField
                    size="small"
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
                  <TextField
                    size="small"
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
                  <TextField
                    size="small"
                    variant="outlined"
                    required
                    label="Address"
                    name="address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                    helperText={formik.touched.address && formik.errors.address}
                    error={formik.touched.address && formik.errors.address ? true : false}
                  />

                  <TextField
                    size="small"
                    variant="outlined"
                    required
                    label="Gender"
                    name="gender"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.gender}
                    helperText={formik.touched.gender && formik.errors.gender}
                    error={formik.touched.gender && formik.errors.gender ? true : false}
                  />
                  <TextField
                    size="small"
                    variant="outlined"
                    required
                    label="Education"
                    name="education"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.education}
                    helperText={formik.touched.education && formik.errors.education}
                    error={formik.touched.education && formik.errors.education ? true : false}
                  />
                  <TextField
                    size="small"
                    variant="outlined"
                    required
                    label="Identify"
                    name="identify"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.identify}
                    helperText={formik.touched.identify && formik.errors.identify}
                    error={formik.touched.identify && formik.errors.identify ? true : false}
                  />
                  <TextField
                    size="small"
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

                  <TextField
                    size="small"
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
        </Box>
      </Box>

      <SimpleSnackbar show={show} setShow={setShow} type="edit" />
    </div>
  );
};

export default UserEdit;
