import { utils } from "../../utils";
import { useDispatch } from "react-redux";
import { constant } from "../../constants";
import { appActions } from "../../store/actions/PopupActions";
export default function ProductCard(props) {
  const dispatch = useDispatch();
  let {
    price_after_discount,
    price_before_discount,
    cardDirection,
    name,
    img,
    attributes,
    quantity,
    status,
    brand,
  } = props;
  function handleShowPopup() {
    dispatch(
      appActions.changePopup(constant.PRODUCT_INFO_POPUP, {
        name: name,
        price_after_discount: price_after_discount,
        price_before_discount: price_before_discount,
        img: img,
        attributes: attributes,
        quantity: quantity,
        status: status,
        brand: brand,
      })
    );
  }
  return (
    <div className="w-full relative productcard">
      <div className={cardDirection}>
        <div
          className={
            cardDirection === "row"
              ? "productcard__image-row"
              : "productcard__image"
          }
        >
          <div className="img-container">
            <img src={img} alt="" />
          </div>
          {cardDirection !== "row" && (
            <div className="productcard__image-overlay"></div>
          )}
        </div>
        {cardDirection !== "row" &&
          utils.discount(price_before_discount, price_after_discount) > 0 && (
            <div className="productcard__discount">
              -{utils.discount(price_before_discount, price_after_discount)}%
            </div>
          )}
        <div
          className={
            cardDirection === "row"
              ? "productcard__info productcard__info-row"
              : "productcard__info"
          }
        >
          <div className="productcard__info-name">{name}</div>
          <div className="productcard__info__price text-brand font-bold">
            {utils.priceBreak(price_after_discount)}₫
            {price_after_discount !== price_before_discount && (
              <span className="price-compare">
                {utils.priceBreak(price_before_discount)}₫
              </span>
            )}
          </div>
          <div className="productcard__info-feature">
            <button className="detail-btn bg-white text-bold">More info</button>
            {cardDirection !== "row" && (
              <button className="showpopup-btn" onClick={handleShowPopup}>
                <i className="fa-solid fa-eye"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}