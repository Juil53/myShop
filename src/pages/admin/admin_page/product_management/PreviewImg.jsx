import React, { useState } from "react";

const PreviewImg = ({ image }) => {
  const [preview, setPreview] = useState(null);
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = () => {
    setPreview(reader.result);
  };

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
};

export default PreviewImg;
