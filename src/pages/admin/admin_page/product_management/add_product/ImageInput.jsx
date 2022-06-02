import { Button, Stack } from "@mui/material";
import { Field, useField, useFormikContext } from "formik";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import PreviewImg from "../PreviewImg";

export default function ImageInput() {
  const { 
    setFieldValue
  } = useFormikContext();

  return (
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
            setFieldValue("image",(event.target.files));
          }}
        />
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          component="span"
          startIcon={<PhotoCamera />}
        >
          Upload
        </Button>

        <PreviewImg />
      </label>
    </Stack>
  );
}