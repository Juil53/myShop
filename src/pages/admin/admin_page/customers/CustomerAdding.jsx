import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Box, Button, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authInstance, db, storage } from "../../../../service/auth";

const style = {
  img: { width: "150px", height: "150px", objectFit: "cover", borderRadius: "50%" },
};

const CustomerAdding = ({ inputs }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPer] = useState(null);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(authInstance, data.email, data.password);
      await setDoc(doc(db, "customers", res.user.uid), {
        ...data,
        homeAddress:data.address,
        timeStamp: moment().format("MM DD YYYY"),
      });
      //navigate to previous page
      navigate(-1);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, `customers/${file.name}`);
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
            setData((prev) => ({ ...prev, image: downloadURL }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  return (
    <Box>
      <Grid item xs={12} component={Paper} elevation={4} p={2}>
        <Typography fontSize="4rem" fontWeight={500} color="text.secondary">
          Add New Customer
        </Typography>
      </Grid>

      <Grid container mt={2} component={Paper} elevation={4} p={3}>
        <Grid item xs={3} textAlign="center">
          <img
            src={file ? URL.createObjectURL(file) : "/img/default_avatar.png"}
            alt="profile"
            style={style.img}
          />
        </Grid>

        <Grid item xs={9}>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {inputs.map((input, index) => (
                <Grid item xs={6} key={index}>
                  <TextField
                    id={input.id}
                    label={input.label}
                    type={input.type}
                    size="small"
                    fullWidth
                    variant="outlined"
                    placeholder={input.placeholder}
                    onChange={handleInput}
                  />
                </Grid>
              ))}
              <Grid item xs={6}>
                <label htmlFor="icon-button-file">
                  <input
                    id="icon-button-file"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleChange}
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
            </Grid>

            <Stack direction="row" spacing={1} sx={{ marginTop: "2rem" }}>
              <Button
                disabled={per !== null && per < 100}
                variant="contained"
                type="submit"
                size="small"
                color="success"
              >
                Submit
              </Button>
              <Button
                variant="contained"
                type="button"
                size="small"
                color="warning"
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerAdding;
