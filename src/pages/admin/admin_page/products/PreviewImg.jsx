import { useEffect, useState } from "react";

const style = {
  previewImg: {
    display: "flex",
  },
  imgContainer: {
    display: "flex",
    flexDirection: "column",
  },
  img: {
    margin: "5px 5px 5px 0",
    borderRadius: "5px",
    height: "100px",
    width: "100px",
  },
};

const PreviewImg = ({ files, data }) => {
  const [name, setName] = useState("");
  const [preview, setPreview] = useState([]);
  
  useEffect(() => {
    if (files) {
      let src = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        setName(file.name);
        reader.onload = (event) => {
          src = [...src, event.target.result];
          setPreview(src);
        };
      }
    }
  }, [files]);

  return (
    <>
      <div id="previewImg" style={style.previewImg}>
        {data?.map((src, index) => (
          <div key={`previewImg_${index}`} style={style.imgContainer}>
            <img src={src} style={style.img} />
            <span style={{ width: "100px" }}>{name}</span>
          </div>
        ))}

        {preview?.map((src, index) => (
          <div key={`previewImg_${index}`} style={style.imgContainer}>
            <img src={src} style={style.img} />
            <span style={{ width: "100px" }}>{name}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default PreviewImg;
