import { useDispatch } from "react-redux";

import { utils } from "../../../../utils";
import { POPUP } from "../../../../constants";
import { actions } from "../../../../store/page/slice";
import LeftImageSlider from "./child/LeftImageSlider";
import Quantity from "../../../quantity/Quantity";
import { isAvailableOption, getQuantityAvailable } from "./helper";
import { useState } from "react";

export default function ProductInfoPopup(props) {
  const { closePopup, data } = props;
  const dispatch = useDispatch();

  //Option dang chon
  const [currentOption, setCurrentOption] = useState(() => {
    const { configurableProducts = [] } = data;
    if (!configurableProducts.length) return {};
    const { available, selected, ...current } = configurableProducts.filter(
      (p) => p.selected
    )[0];

    return current;
  });

  const [numberOfProduct, setNumberOfProduct] = useState(() => {
    if (data.configurableOptions) {
      return getQuantityAvailable({
        product: data,
        currentOption,
      });
    } else {
      return data.quantity;
    }
  });

  function check(optionId, optionValue) {
    if (currentOption[optionId] === optionValue) return "active";

    const rs = isAvailableOption({
      product: data,
      currentOption,
      optionId,
      optionValue,
    });

    return rs ? "" : "unavailable";
  }

  function changeOption(optionId, optionValue) {
    const newOption = { ...currentOption };
    const quantity = getQuantityAvailable({
      product: data,
      currentOption,
      optionId,
      optionValue,
    });

    setNumberOfProduct(quantity);

    newOption[optionId] = optionValue;
    setCurrentOption(newOption);
  }

  function handleAddCart() {
    dispatch(
      actions.activePopup({
        type: POPUP.ADD_CART_POPUP,
        data: {
          ...data,
        },
      })
    );
  }

  function createConfigurableOptions(data) {
    if (data) {
      if (data.length > 0) {
        return data.map((v) => (
          <div className="configurable-options row" key={v.id}>
            <div className="title">{v.name}</div>
            {createOptionItem(v.id, v.values)}
          </div>
        ));
      }
    }
  }

  function createOptionItem(id, values) {
    return (
      <div className="option option-more row">
        {values.map((i) => (
          <div
            onClick={() => changeOption(id, i)}
            className={`option-item ${check(id, i)}`}
            key={i + "configurableOptions"}
          >
            {i}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="modal center">
      {!data.image ? (
        <div className="productinfopopup">
          Something went wrong. Please try again later
          <div
            className="productinfopopup__cancel-btn round"
            onClick={closePopup}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
      ) : (
        <div className="productinfopopup row">
          <LeftImageSlider data={data.image} />
          <div className="productinfopopup__info">
            <div className="productinfopopup__info-name font-bold">
              {data.name}
            </div>
            <div className="productinfopopup__info-vend row">
              <div className="left">
                Brand:
                <span>{data.brand ? data.brand : "Not yet been update"}</span>
              </div>
              <div className="right">
                Status:
                <span>{data.status ? data.status : "Not yet been update"}</span>
              </div>
            </div>
            <div className="productinfopopup__info-price text-brand font-bold">
              {utils.priceBreak(data.priceAfterDiscount)}₫
              {data.priceAfterDiscount !== data.priceBeforeDiscount && (
                <span className="price-compare">
                  {utils.priceBreak(data.priceBeforeDiscount)}₫
                </span>
              )}
            </div>
            <div className="productinfopopup__info-attributes">
              {data.attributes &&
                data.attributes.map((v) => (
                  <div key={v.name + "att"}>
                    - {v.name}: <span>{v.value}</span>
                  </div>
                ))}
            </div>
            {createConfigurableOptions(data.configurableOptions)}
            <div className="productinfopopup__info-quantity row">
              <div className="title">Quantity</div>
              <Quantity value="1" quantity={numberOfProduct} />
              <div className="number-product">
                {numberOfProduct} products avaiable
              </div>
            </div>
            <button
              onClick={handleAddCart}
              className="addcart-btn button-style"
            >
              Add to cart
            </button>
            <div style={{ height: "1.5rem" }}></div>
          </div>
          <div className="popup__cancel-btn round" onClick={closePopup}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
      )}
    </div>
  );
}
