import { useDispatch } from "react-redux";

import { utils } from "../../utils";
import { POPUP } from "../../constants";
import { actions } from "../../store/page/slice";

export default function ProductCard(props) {
  const dispatch = useDispatch();
  const {
    priceAfterDiscount,
    priceBeforeDiscount,
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
      actions.activePopup({
        type: POPUP.PRODUCT_INFO_POPUP,
        data: {
          name: name,
          priceAfterDiscount: priceAfterDiscount,
          priceBeforeDiscount: priceBeforeDiscount,
          img: img,
          attributes: attributes,
          quantity: quantity,
          status: status,
          brand: brand,
        },
      })
    );
  }

  return (
    <div className="w-full productcard">
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
          utils.discount(priceBeforeDiscount, priceAfterDiscount) > 0 && (
            <div className="productcard__discount">
              -{utils.discount(priceBeforeDiscount, priceAfterDiscount)}%
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
            {utils.priceBreak(priceAfterDiscount)}₫
            {priceAfterDiscount !== priceBeforeDiscount && (
              <span className="price-compare">
                {utils.priceBreak(priceBeforeDiscount)}₫
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
