import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Box, Button, Grid, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useFormik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SimpleSnackbar from "../../../../components/admin/SimpleSnackbar";
import Breadcrumb from "../../../../components/breadcumb/BreadCumb";
import { authInstance, db, storage } from "../../../../service/auth";
import { validation } from "../../../../validation/Validation";
import { roles, style } from "./logic";

export default function AddUser(props) {
  const [role, setRole] = useState("");
  const [img, setImg] = useState({});
  const [file, setFile] = useState("");
  const [per, setPer] = useState(null);
  const [show, setShow] = useState(false);

  //Pages
  const pages = [
    {
      name: "Admin",
      url: "/admin",
    },
    {
      name: "Users",
      url: "/admin/users",
    },
  ];

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
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      const res = await createUserWithEmailAndPassword(authInstance, values.email, values.password);
      await setDoc(doc(db, "users", res.user.uid), {
        ...values,
        avatar: img.image,
        timeStamp: moment().format("MM DD YYYY"),
      });
      setShow(true);
      setSubmitting(false);
      setImg("");
      resetForm();
    },
  });

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
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  return (
    <div>
      <Breadcrumb pages={pages} />
      <Typography variant="h4" fontWeight={400} my={1}>
        Add User
      </Typography>
      <Box sx={style.container}>
        <Box className="user__image" sx={style.imgContainer}>
          <img
            src={file ? URL.createObjectURL(file) : "/img/default_avatar.png"}
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
        </Box>
        <Box
          className="user__form"
          sx={style.userForm}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <div className="admin__form">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  size="small"
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
              <Grid item xs={6}>
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
              </Grid>
              <Grid item xs={6}>
                <TextField
                  size="small"
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

              <Grid item xs={6}>
                <TextField
                  size="small"
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
              <Grid item xs={6}>
                <TextField
                  size="small"
                  variant="outlined"
                  label="Education"
                  name="education"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.education}
                  helperText={formik.touched.education && formik.errors.education}
                  error={formik.touched.education && formik.errors.education ? true : false}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
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
              </Grid>
              <Grid item xs={6}>
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
              </Grid>
            </Grid>
          </div>

          <Grid container spacing={2} mt={1}>
            <Grid item xs={6}>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  disabled={per !== null && per < 100}
                >
                  Submit
                </Button>
                <Link to="/admin/users">
                  <Button variant="contained" color="warning">
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
