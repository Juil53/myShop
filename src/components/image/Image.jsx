import { useState } from "react";

const DEFAULT_IMAGE_SOURCE = "";

const Image = ({ src, showLoading = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {showLoading && !isLoaded && (
        <img alt="" id="img" className="with-loading" />
      )}
      <img
        src={src}
        alt=""
        onLoad={() => {
          setIsLoaded(true);
        }}
        id="img"
        className={isLoaded ? "show" : "hide"}
      />
    </>
  );
};

export default Image;
