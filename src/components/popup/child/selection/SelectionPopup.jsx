const SelectionPopup = (props) => {
  const { closePopup, data } = props;
  const { message, action } = data || [];

  return (
    <div className="modal center">
      <div className="selection-popup">
        <div className="title">
          <i className="fa-solid fa-circle-question"></i>
        </div>
        <div className="message">{message}</div>
        <div className="function row">
          <button className="cancel-btn" onClick={closePopup}>
            Cancel
          </button>
          <button className="confirm-btn button-style" onClick={action}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectionPopup;
