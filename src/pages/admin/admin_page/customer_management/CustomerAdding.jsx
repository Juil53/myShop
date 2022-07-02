import React, { useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Box, Grid, Typography, Paper, TextField, Button, Stack } from "@mui/material";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { authInstance, db, storage } from "../../../../service/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect } from "react";

const CustomerAdding = ({ inputs }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPer] = useState(null);

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
        timeStamp: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
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
            setData((prev) => ({ ...prev, img: downloadURL }));
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
            style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "50%" }}
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
                    color="secondary"
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

            <Stack direction="row" spacing={1} sx={{ marginTop: "1rem" }}>
              <Button
                disabled={per !== null && per < 100}
                variant="contained"
                type="submit"
                size="small"
                color="success"
              >
                Submit
              </Button>
              <Button variant="contained" type="button" size="small" color="secondary">
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
