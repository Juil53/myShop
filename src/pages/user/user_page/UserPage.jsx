import ChangePassword from "./child/ChangePassword";

const UserPage = () => {
  return (
    <div className="user-page-container">
      <ul className="breadcums">
        <li>
          <a href="home">Home</a>
          <span>/</span>
        </li>
        <li>User</li>
      </ul>
      <div className="user-page__content row">
        <div className="user-page__content-left">
          <div className="title row">
            <div className="img">
              <img src="/img/default_product.jpg" />
            </div>
            <div className="name">
              Welcome back <br />
              <span className="bottom">Lê Ngọc Minh</span>
            </div>
          </div>
          <div className="content-btn active">
            <a href="#">Orders</a>
          </div>
          <div className="content-btn">
            <a href="#">Account information</a>
          </div>
          <div className="content-btn">
            <a href="#">Change password</a>
          </div>
          <div className="content-btn">
            <a href="#">Address management</a>
          </div>
        </div>
        <div className="user-page__content-right">
          <ChangePassword />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
