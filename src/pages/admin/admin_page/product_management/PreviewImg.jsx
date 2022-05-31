import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";

const PreviewImg = () => {
  const [preview, setPreview] = useState(null);
  const {
    values: { image },
  } = useFormikContext();

  useEffect(() => {
    console.log(image);
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        setPreview(reader.result);
      };
    }
  }, [image]);

  if (image) {
    return (
      <div>
        <img
          src={preview}
          height="100px"
          width="100px"
          style={{ marginTop: "5px", marginBottom: "5px" }}
        />
      </div>
    );
  } else {
    return <></>;
  }
};

export default PreviewImg;
