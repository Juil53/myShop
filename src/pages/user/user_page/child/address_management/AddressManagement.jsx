import { useDispatch } from "react-redux";

import { actions } from "../../../../../store/page/slice";
import { POPUP } from "../../../../../constants";

const AddressManagement = () => {
  const dispatch = useDispatch();
  const handleAddNewAddress = () => {
    dispatch(actions.activePopup({ type: POPUP.ADD_ADDRESS_POPUP }));
  };

  return (
    <div className="address_management-container">
      <div className="title">Address management</div>
      <div className="add_address">
        <button className="button-style" onClick={handleAddNewAddress}>
          Add address
        </button>
      </div>
      <div className="address_list">
        <div className="address_item">
          <div className="name address_content">
            <strong>Name:</strong> Lê Minh Thư
            <span className="default">
              <i className="fa-solid fa-circle-check"></i> Default address
            </span>
          </div>
          <div className="address address_content">
            <strong>Address:</strong> xã Tiên Thủy, huyện Châu Thành, tỉnh Bến
            Tre, Huyện Châu Thành, Bến Tre, Vietnam
          </div>
          <div className="phoneNumber address_content">
            <strong>Phone number:</strong> 0392808994
          </div>
          <div className="function">
            <button className="delete-btn">Delete</button>
            <button className="edit-btn">Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressManagement;
