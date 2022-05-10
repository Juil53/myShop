import React from "react";
export default function NextButton(props) {
  let { style, onClick } = props;
  return (
    <React.Fragment>
      <button
        onClick={onClick}
        className=" slide-next-btn"
        style={{ ...style }}
      >
        <i className="fa-solid fa-angle-right"></i>
      </button>
    </React.Fragment>
  );
}
