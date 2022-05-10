import { useSelector } from "react-redux";

export default function Footer() {
  const language = useSelector((state) => state.languages);
  const footer = language.footer;
  const footer_top_left = footer.top_footer.left;
  const footer_top_mid = footer.top_footer.mid;
  const footer_top_right = footer.top_footer.right;

  return (
    <div className="footer">
      <div className="footer__top row">
        <div className="footer__top-left">
          <div className="logo">
            <div className="img-container">
              <img src="./img/logomyShopwhite.png" alt="" />
            </div>
          </div>
          <div className="nav row">
            <a href="#" className="nav-btn">
              {footer_top_left.home[language.current]}
            </a>
            <a href="#" className="nav-btn">
              {footer_top_left.product[language.current]}
            </a>
            <a href="#" className="nav-btn">
              {footer_top_left.about[language.current]}
            </a>
            <a href="#" className="nav-btn">
              {footer_top_left.news[language.current]}
            </a>
            <a href="#" className="nav-btn">
              {footer_top_left.map[language.current]}
            </a>
            <a href="#" className="nav-btn">
              {footer_top_left.contact[language.current]}
            </a>
          </div>
        </div>
        <div className="footer__top-mid">
          <div className="info row">
            <div className="info-icon text-brand">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <div className="info-content">
              {footer_top_mid.address[language.current]}
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
            <div className="title">
              {footer_top_right.about.title[language.current]}
            </div>
            <div
              className="about-content"
              dangerouslySetInnerHTML={{
                __html: footer_top_right.about.content[language.current],
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
      <div className="footer__source">© {footer.source[language.current]}</div>
    </div>
  );
}
