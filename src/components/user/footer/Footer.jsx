import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__top row">
        <div className="footer__top-left">
          <div className="logo">
            <div className="img-container">
              <img src="/img/logomyShopwhite.png" alt="" />
            </div>
          </div>
          <div className="nav row">
            <Link to="/" className="nav-btn">
              Home
            </Link>
            <Link to="/product" className="nav-btn">
              Product
            </Link>
            <Link to="/about" className="nav-btn">
              About
            </Link>
            <Link to="/news" className="nav-btn">
              News
            </Link>
            <Link to="/map" className="nav-btn">
              Map
            </Link>
            <Link to="/contact" className="nav-btn">
              Contact
            </Link>
          </div>
        </div>
        <div className="footer__top-mid">
          <div className="info row">
            <div className="info-icon text-brand">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <div className="info-content">
              Room 16 Hall 8 Quang Trung software city, Tan Chanh Hiep ward, 12
              Dictrict, Ho Chi Minh City
            </div>
          </div>
          <div className="info row phone">
            <div className="info-icon text-brand">
              <i className="fa-solid fa-phone"></i>
            </div>
            <div className="info-content">19009597</div>
          </div>
          <div className="info row mail">
            <div className="info-icon text-brand">
              <i className="fa-solid fa-envelope"></i>
            </div>
            <div className="info-content">support@breshka_vn.com</div>
          </div>
        </div>
        <div className="footer__top-right">
          <div className="about">
            <div className="title">About us</div>
            <div
              className="about-content"
              dangerouslySetInnerHTML={{
                __html:
                  "Breshka clothes is top VietNam brand fashion. <br /> Modern shopping type - Convenient, Safe payment - Easy",
              }}
            ></div>
          </div>
          <div className="contact row">
            <a href="#" className="contact-btn">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="contact-btn">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="#" className="contact-btn">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#" className="contact-btn">
              <i className="fa-brands fa-twitch"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer__source">
        © Copyright belong to Breshka Viet Nam
      </div>
    </div>
  );
}
