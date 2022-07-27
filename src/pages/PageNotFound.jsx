import React from "react";

const PageNotFound = () => {
  return (
    <div id="colorlib-notfound">
      <div className="colorlib-notfound">
        <div className="colorlib-notfound-404">
          <h1 className="colorlib-heading">
            <img src="./img/404.png" alt="404" style={{ width: "200px", height: "200px" }} />
          </h1>
        </div>
        <h2 id="colorlib_404_customizer_page_heading" className="colorlib-heading">
          404 - PAGE NOT FOUND
        </h2>
        <p id="colorlib_404_customizer_content">
          The page you are looking foro might have been removed had its name changed or is
          temporarily unavailable
        </p>
        <a href="/" id="colorlib_404_customizer_button_text">
          Homepage
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;
