import { Button, Stack } from "@mui/material";
import { storage } from "../../../../../utils/firebase";
import { useFormikContext } from "formik";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import PhotoCamera from "@mui/icons-material/PhotoCamera";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import PreviewImg from "../PreviewImg";
import { useEffect, useState } from "react";

export default function ImageInput() {
  const [files, setFiles] = useState([]);
  
  const {
    values: { image },
    setFieldValue,
  } = useFormikContext();

  useEffect(()=>{
    setFieldValue("image", files);
  },[files])

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2}>
        <label htmlFor="contained-button-file">
          <input
            id="contained-button-file"
            name="image"
            accept="image/*"
            multiple
            type="file"
            hidden
            onChange={(event) => {
              for (let i = 0; i < event.target.files.length; i++) {
                const newImage = event.target.files[i];
                setFiles((prevState) => [...prevState, newImage]);
              }
            }}
          />
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            component="span"
            startIcon={<PhotoCamera />}
          >
            Choose
          </Button>
        </label>
      </Stack>

      <PreviewImg files={files} />
    </>
  );
}
