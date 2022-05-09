import React from "react";
export default function PreButton(props) {
  let { onClick, style } = props;
  return (
    <React.Fragment>
      <button onClick={onClick} style={{ ...style }} className="slide-pre-btn">
        <i className="fa-solid fa-angle-left"></i>
      </button>
    </React.Fragment>
  );
}
