import { useDispatch } from "react-redux";
import { useState } from "react";

import { utils } from "../../../../utils";
import localStorage from "../../../../service/localStorage";
import { POPUP } from "../../../../constants";
import { actions } from "../../../../store/page/slice";
import LeftImageSlider from "./child/LeftImageSlider";
import Quantity from "../../../quantity/Quantity";
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

    const product = {
      ...others,
      priceAfterDiscount,
      optionSelected: {},
      quantity: number,
      totalPrice: number * priceAfterDiscount,
    };

    if (Object.keys(currentOption).length !== 0) {
      product.optionSelected = { ...currentOption };
    }

    const cart = localStorage.get("cart")
      ? localStorage.get("cart")
      : {
          productList: [],
          totalAmount: 0,
        };

    if (cart.productList.length === 0) {
      cart.productList.push(product);
    } else {
      const sameProduct = cart.productList.filter((v) => v.id === product.id);

      if (sameProduct.length && sameProduct.length !== 0) {
        if (Object.keys(currentOption).length !== 0) {
          const sameOption = sameProduct.filter(
            (v) =>
              JSON.stringify(v.optionSelected) === JSON.stringify(currentOption)
          );

          if (sameOption.length && sameOption.length !== 0) {
            sameOption[0].quantity = sameOption[0].quantity + product.quantity;
            sameOption[0].totalPrice =
              sameOption[0].quantity * product.priceAfterDiscount;
          } else {
            cart.productList.push(product);
          }
        } else {
          sameProduct[0].quantity = sameProduct[0].quantity + product.quantity;
          sameProduct[0].totalPrice =
            sameProduct[0].quantity * product.priceAfterDiscount;
        }
      } else {
        cart.productList.push(product);
      }
    }

    //tinh lai tong tien
    cart.totalAmount = cart.productList.reduce(
      (pre, cur) => pre + cur.totalPrice,
      0
    );

    localStorage.set("cart", cart);

    dispatch(
      actions.activePopup({
        type: POPUP.ADD_CART_POPUP,
        data: {
          ...data,
        },
      })
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
                <span>{data.brand ? data.brand : "Updating"}</span>
              </div>
              <div className="right">
                Status:
                <span>{data.status ? data.status : "Updating"}</span>
              </div>
            </div>
            <div className="productinfopopup__info-price text-brand font-bold">
              {data.priceAfterDiscount
                ? utils.priceBreak(data.priceAfterDiscount) + "₫"
                : "Update later"}
              {data.priceAfterDiscount &&
                data.priceAfterDiscount !== data.priceBeforeDiscount && (
                  <span className="price-compare">
                    {data.priceBeforeDiscount &&
                      utils.priceBreak(data.priceBeforeDiscount)}
                    ₫
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
                quantity={numberOfProduct}
                changeValue={setNumber}
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
      )}
    </div>
  );
}
