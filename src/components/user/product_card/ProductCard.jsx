import { useDispatch } from "react-redux";

import { utils } from "../../../utils";
import { POPUP } from "../../../constants";
import { actions } from "../../../store/page/slice";
import { useNavigate } from "react-router-dom";
import Image from "../../image/Image";

export default function ProductCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cardDirection, data } = props;

  function handleShowPopup() {
    dispatch(
      actions.activePopup({
        type: POPUP.PRODUCT_INFO_POPUP,
        data: {
          ...data,
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
            <Image showLoading={true} src={data.image} alt="" />
          </div>
          {cardDirection !== "row" && (
            <div
              className="productcard__image-overlay"
              onClick={() => navigate(`/product/${data.id}`)}
            ></div>
          )}
        </div>
        {cardDirection !== "row" &&
          utils.discount(data.priceBeforeDiscount, data.priceAfterDiscount) >
            0 && (
            <div className="productcard__discount">
              -
              {utils.discount(
                data.priceBeforeDiscount,
                data.priceAfterDiscount
              )}
              %
            </div>
          )}
        <div
          className={
            cardDirection === "row"
              ? "productcard__info productcard__info-row"
              : "productcard__info"
          }
        >
          <div className="productcard__info-name">{data.name}</div>
          <div className="productcard__info__price text-brand font-bold">
            {data.priceAfterDiscount
              ? utils.priceBreak(data.priceAfterDiscount) + "₫"
              : "Update later"}
            {data.priceAfterDiscount &&
              data.priceAfterDiscount !== data.priceBeforeDiscount && (
                <span className="price-compare">
                  {utils.priceBreak(data.priceBeforeDiscount)}₫
                </span>
              )}
          </div>
          <div className="productcard__info-feature">
            <button
              className="detail-btn bg-white text-bold"
              onClick={() => navigate(`/product/${data.id}`)}
            >
              More info
            </button>
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
