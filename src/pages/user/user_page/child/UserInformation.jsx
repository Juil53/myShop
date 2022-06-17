const UserInformation = (props) => {
  return (
    <div className="user_infor-container">
      <div className="title">Your information</div>
      <div className="user_infor">
        <div className="user_pic">
          <img src="/img/default_product.jpg" alt="" />
          <button className="change_pic-btn">
            <i className="fa-solid fa-pen"></i>
          </button>
        </div>
        <div className="user_infor-field">
          <label htmlFor="displayName">Name</label>
          <input type="text" value="Lê Ngọc Minh" id="displayName" />
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
