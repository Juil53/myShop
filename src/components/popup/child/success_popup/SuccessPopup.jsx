const SuccessPopup = (props) => {
  const { data, closePopup } = props;

  setTimeout(closePopup, 3000);

  return (
    <div className="modal center">
      <div className="message_popup">
        <div className="title">
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <span>{data}</span>
      </div>
    </div>
  );
};

export default SuccessPopup;
