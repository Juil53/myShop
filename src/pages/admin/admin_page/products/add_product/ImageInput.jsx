import { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { useFormikContext } from "formik";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import PreviewImg from "../PreviewImg";

export default function ImageInput() {
  const [files, setFiles] = useState([]);
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    setFieldValue("image", files);
  }, [files]);

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
