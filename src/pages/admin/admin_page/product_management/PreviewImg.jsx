import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";

const PreviewImg = () => {
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

  const [preview, setPreview] = useState(null);

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
