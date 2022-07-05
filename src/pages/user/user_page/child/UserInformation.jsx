import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

import InputField from "../../../../components/input_field/InputField";
import Loading from "../../../../components/loading/Loading";
import { LOADING_STATUS, POPUP, USER_ACTIONS } from "../../../../constants";
import { actions } from "../../../../store/page/slice";
import { uploadImage } from "../../../../utils/file";

const UserInformation = (props) => {
  const { data, status } = props;

  const [displayName, setDisplayName] = useState(data?.displayName);
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber || "");

  const fileInput = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);

  const dispatch = useDispatch();

  const onOpenFileSelect = () => {
    fileInput.current.click();
  };

  const handleFileSelect = (e) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const error = document.getElementById("user_info-error_msg");
    error.textContent = "";
    if (displayName && phoneNumber) {
      const newInfo = {};

      dispatch(actions.activePopup({ type: POPUP.WAITING_POPUP }));

      if (phoneNumber !== data.phoneNumber) {
        newInfo.phoneNumber = phoneNumber;
      }
      if (displayName !== data.displayName) {
        newInfo.displayName = displayName;
      }

      if (selectedFile) {
        const imgLink = await uploadImage(selectedFile);
        if (imgLink) {
          newInfo.image = imgLink;
        } else {
          error.textContent = "Fail to upload image. Try again";
        }
      }

      dispatch({
        type: USER_ACTIONS.UPDATE_USER_INFO,
        uid: data.id,
        data: newInfo,
      });
    } else {
      error.textContent = "Fill all information required";
    }
  };

  useEffect(() => {
    if (!selectedFile) return;
    let imageUrl = URL.createObjectURL(selectedFile);
    setPreviewFile(imageUrl);
    // remove obj URL img prevent memory leak
    return () => URL.revokeObjectURL(imageUrl);
  }, [selectedFile]);

  useEffect(() => {
    // if (status === LOADING_STATUS.SUCCESS) {
    //   setDisplayName(data.displayName);
    //   setPhoneNumber(data.phoneNumber);
    // }
    if (status !== LOADING_STATUS.UPDATING) {
      dispatch(actions.hidePopup(POPUP.WAITING_POPUP));
    }
  });

  return (
    <>
      {status === LOADING_STATUS.SUCCESS ? (
        <div className="user_infor-container">
          <div className="title">Your information</div>
          <div className="user_infor">
            <div className="user_pic">
              <img src={previewFile ? previewFile : data.image} alt="" />
              <button className="change_pic-btn" onClick={onOpenFileSelect}>
                <i className="fa-solid fa-pen"></i>
              </button>
            </div>
            <InputField
              type="name"
              id="user-display_name"
              title="Display name"
              onChange={setDisplayName}
              required
              currentValue={data.displayName}
            />
            <InputField
              type="phone"
              id="user-phone_number"
              title="Phone number"
              onChange={setPhoneNumber}
              required
              currentValue={data.phoneNumber}
            />
          </div>
          <div className="error_msg" id="user_info-error_msg"></div>
          <div className="save_change-container">
            <button onClick={handleSubmit} className="button-style save_change">
              Save change
            </button>
          </div>
          <input
            ref={fileInput}
            type="file"
            name="image"
            id="image"
            accept=".png,.jpg,.jpeg"
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default UserInformation;
