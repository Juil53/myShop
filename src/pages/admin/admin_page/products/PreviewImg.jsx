import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectProductInfo } from "../../../../store/admin_product/selector";

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

const PreviewImg = ({ files }) => {
  const [name, setName] = useState("");
  const [preview, setPreview] = useState([]);
  const params = useParams();
  const product = useSelector((state) => selectProductInfo(state, params.id));

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
      {product && (
        <div style={{ display: "flex" }}>
          {product &&
            product.image.map((img, index) => (
              <img
                key={`img_${index}`}
                src={img}
                alt=""
                style={{
                  margin: "5px 5px 5px 0",
                  borderRadius: "5px",
                  height: "100px",
                  width: "100px",
                }}
              />
            ))}
        </div>
      )}

      <div id="previewImg" style={style.previewImg}>
        {preview.map((src, index) => (
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
