import { useDispatch } from "react-redux";

import { actions } from "../../../../../store/page/slice";
import { POPUP } from "../../../../../constants";
import { clone } from "../../../../../utils";

const AddressManagement = (props) => {
  const { data } = props;
  const dispatch = useDispatch();

  const handleAddNewAddress = () => {
    dispatch(
      actions.activePopup({ type: POPUP.ADD_ADDRESS_POPUP, data: data })
    );
  };

  const handleEditAddress = (current) => {
    dispatch(
      actions.activePopup({
        type: POPUP.ADD_ADDRESS_POPUP,
        data: { ...data, currentAddress: current },
      })
    );
  };

  //Delete address
  const handleDeleteAddress = (id) => {
    const kq = data.addressList.filter((v) => v.id === id);
    const newAddressList = clone(data.addressList);

    if (kq) {
      const index = data.addressList.indexOf(kq[0]);
      newAddressList.splice(index, 1);

      const newData = {
        addressList: [...newAddressList],
      };

      dispatch(
        actions.activePopup({
          type: POPUP.SELECTION_POPUP,
          data: {
            title: "Delete address",
            message:
              "Do you want to continue removing this address from your address book?",
            actionType: "delete address",
            detail: {
              address: newData,
              uid: data.id,
            },
          },
        })
      );
    }
  };

  const createAddressItem = (data) => {
    if (data && data?.length) {
      return data.map((v) => (
        <div className="address_item" key={v.id}>
          <div className="name address_content">
            <strong>Name:</strong> {v.name}
            {v.default && (
              <span className="default">
                <i className="fa-solid fa-circle-check"></i> Default address
              </span>
            )}
          </div>
          <div className="address address_content">
            <strong>Address:</strong> {v.address.detail}, {v.address.ward.name},{" "}
            {v.address.district.name}, {v.address.region.name}
          </div>
          <div className="phoneNumber address_content">
            <strong>Phone number:</strong> {v.phoneNumber}
          </div>
          <div className="function">
            {!v.default && (
              <button
                className="delete-btn"
                onClick={() => handleDeleteAddress(v.id)}
              >
                Delete
              </button>
            )}
            <button className="edit-btn" onClick={() => handleEditAddress(v)}>
              Edit
            </button>
          </div>
        </div>
      ));
    } else {
      return <div className="no_address">You don't have an address yet.</div>;
    }
  };

  return (
    <div className="address_management-container">
      <div className="title">Address management</div>
      <div className="add_address">
        <button className="button-style" onClick={handleAddNewAddress}>
          Add address
        </button>
      </div>
      <div className="address_list">{createAddressItem(data.addressList)}</div>
    </div>
  );
};

export default AddressManagement;
