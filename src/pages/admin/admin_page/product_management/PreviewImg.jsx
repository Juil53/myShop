import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";

const PreviewImg = () => {
  const [preview, setPreview] = useState([]);
  const {
    values: { image },
  } = useFormikContext();

  useEffect(() => {
    if (image) {
      let src = []
      for (let i = 0; i < image.length; i++) {
        const file = image[i];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          src = [...src, event.target.result];
          setPreview(src);
        };
      }
    }
  }, [image]);

    return (
      <div id="previewImg">
        {preview.map((src, index) => (
          <img
            key={`previewImg_${index}`}
            src={src}
            height="100px"
            width="100px"
            style={{ margin:"5px 5px 5px 0",borderRadius:'5px' }}
          />
        ))}
      </div>
    );
};

export default PreviewImg;
