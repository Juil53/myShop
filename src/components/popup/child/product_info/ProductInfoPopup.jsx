import { useDispatch } from "react-redux";
import { useState } from "react";

import { utils } from "../../../../utils";
import { POPUP } from "../../../../constants";
import { actions } from "../../../../store/page/slice";
import { actions as cartActions } from "../../../../store/cart/slice";
import LeftImageSlider from "./LeftImageSlider";
import Quantity from "../../../user/quantity/Quantity";
import {
  isAvailableOption,
  getQuantityAvailable,
  selectUnavailableOption,
} from "./helper";

export default function ProductInfoPopup(props) {
  const { closePopup, data } = props;

  const dispatch = useDispatch();
  const [number, setNumber] = useState(1);

  //Option dang chon
  const [currentOption, setCurrentOption] = useState(() => {
    const { configurableProducts = [] } = data;
    if (!configurableProducts.length) return {};
    const { available, selected, ...current } = configurableProducts.filter(
      (p) => p.selected
    )[0];

    return current;
  });

  //so luong san pham con lai cua option tuong ung
  const [numberOfProduct, setNumberOfProduct] = useState(() => {
    if (data.configurableOptions) {
      return getQuantityAvailable({
        product: data,
        currentOption,
      });
    } else {
      return data.available;
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

  function changeOption(optionId, optionValue, isAvailable) {
    if (isAvailable) {
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
    } else {
      const [newOption, newQty] = selectUnavailableOption({
        product: data,
        optionId,
        optionValue,
      });
      setCurrentOption(newOption);
      setNumberOfProduct(newQty);
    }
  }

  function createConfigurableOptions(data) {
    if (data) {
      if (data.length > 0) {
        return data.map((v) => (
          <div className="configurable-options row" key={v.id}>
            <div className="configurable-options__title">{v.name}</div>
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
            onClick={() => changeOption(id, i, !check(id, i))}
            className={`option-item ${check(id, i)}`}
            key={i + "configurableOptions"}
          >
            {i}
          </div>
        ))}
      </div>
    );
  }

  function handleAddCart() {
    const {
      configurableProducts = [],
      configurableOptions = [],
      attributes = [],
      priceAfterDiscount,
      ...others
    } = data;

    if (
      priceAfterDiscount &&
      priceAfterDiscount !== 0 &&
      number &&
      number !== 0 &&
      numberOfProduct > 0
    ) {
      const product = {
        ...others,
        cartItemID: new Date().getTime(),
        priceAfterDiscount,
        optionSelected: {},
        quantity: number,
        totalPrice: number * priceAfterDiscount,
        available: numberOfProduct,
      };

      if (Object.keys(currentOption).length !== 0) {
        product.optionSelected = { ...currentOption };
      }

      dispatch(cartActions.fetchAddCartRequest({ product: product }));

      dispatch(
        actions.activePopup({
          type: POPUP.ADD_CART_POPUP,
          data: {
            ...data,
          },
        })
      );
    }
  }

  return (
    <div className="modal center">
      <div className="productinfopopup row">
        <LeftImageSlider data={data.image} />
        <div className="productinfopopup__info">
          <div className="productinfopopup__info-name font-bold">
            {data.name}
          </div>
          <div className="productinfopopup__info-vend row">
            <div className="left">
              Brand:
              <span>{data.brand ? data.brand : "Updating"}</span>
            </div>
            <div className="right">
              Status:
              <span>{data.status ? data.status : "Updating"}</span>
            </div>
          </div>
          <div className="productinfopopup__info-price text-brand font-bold">
            {data.priceAfterDiscount
              ? utils.priceBreak(data.priceAfterDiscount) + "???"
              : "Update later"}
            {!!data.priceAfterDiscount &&
              data.priceAfterDiscount !== data.priceBeforeDiscount && (
                <span className="price-compare">
                  {data.priceBeforeDiscount &&
                    utils.priceBreak(data.priceBeforeDiscount)}
                  ???
                </span>
              )}
          </div>
          <div className="productinfopopup__info-attributes">
            {data.attributes &&
              data.attributes.length > 0 &&
              typeof data.attributes !== "string" &&
              data.attributes.map((v) => (
                <div key={v.name + "att"}>
                  - {v.name}: <span>{v.value}</span>
                </div>
              ))}
          </div>
          {createConfigurableOptions(data.configurableOptions)}
          <div
            className={
              data.image && data.image.length === 1
                ? "productinfopopup__info-quantity row special"
                : "productinfopopup__info-quantity row"
            }
          >
            <div className="title">Quantity</div>
            <Quantity
              value={number}
              available={numberOfProduct}
              changeValue={setNumber}
              type="add"
            />
            <div className="number-product">
              {numberOfProduct} products avaiable
            </div>
          </div>
          <div className="function-container row">
            <button onClick={closePopup} className="cancel-btn">
              Back
            </button>
            <button
              onClick={handleAddCart}
              className="addcart-btn button-style"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
