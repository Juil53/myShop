import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import Breadcrumb from "../../../components/breadcumb/BreadCumb";
import Loading from "../../../components/loading/Loading";
import {
  getQuantityAvailable,
  isAvailableOption,
  selectUnavailableOption,
} from "../../../components/popup/child/product_info/helper";
import Quantity from "../../../components/user/quantity/Quantity";
import { POPUP } from "../../../constants";
import { actions } from "../../../store/page/slice";
import {
  productLoading,
  selectProductInfo,
} from "../../../store/products/selector";
import { actions as productActions } from "../../../store/products/slice";
import ProductTabs from "./ProductTabs";
import RelatedProducts from "./RelatedProducts";
import { actions as cartActions } from "../../../store/cart/slice";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [number, setNumber] = useState(1);
  const [mainSlider, setMainSlider] = useState();
  const [subSlider, setSubSlider] = useState();
  const productInfo = useSelector((state) =>
    selectProductInfo(state, params.id)
  );
  const loading = useSelector(productLoading);
  const { name } = productInfo;

  useEffect(() => {
    dispatch(productActions.getProductRequest(params.id));
  }, []);

  const array = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Product",
      url: "/product",
    },
    {
      name: name,
      url: "",
    },
  ];

  //NUMBER FORMATTER
  const formatter = new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "VND",
  });

  const [currentOption, setCurrentOption] = useState(() => {
    const { configurableProducts = [] } = productInfo;
    if (!configurableProducts.length) return {};
    const { available, selected, ...current } = configurableProducts.filter(
      (p) => p.selected
    )[0];

    return current;
  });

  const [numberOfProduct, setNumberOfProduct] = useState(() => {
    if (productInfo.configurableOptions) {
      return getQuantityAvailable({
        product: productInfo,
        currentOption,
      });
    } else {
      return productInfo.available;
    }
  });

  const settings_mainSlider = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };

  const settings_subSlider = {
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    arrows: false,
  };

  function createMainSlider(data) {
    if (!data) {
      return <></>;
    }

    if (typeof data === "string") {
      return (
        <Slider
          {...settings_mainSlider}
          asNavFor={subSlider}
          ref={(slider1) => setMainSlider(slider1)}
        >
          <div className="img-container">
            <img src={data} alt="" />
          </div>
        </Slider>
      );
    }
    return (
      <Slider
        {...settings_mainSlider}
        asNavFor={subSlider}
        ref={(slider1) => setMainSlider(slider1)}
      >
        {data.map((v) => (
          <div className="img-container" key={v}>
            <img src={v} alt="" />
          </div>
        ))}
      </Slider>
    );
  }

  function createSubSlider(data) {
    if (!data || data.length <= 1 || typeof data === "string") {
      return <></>;
    }

    return (
      <Slider
        {...settings_subSlider}
        asNavFor={mainSlider}
        ref={(slider2) => setSubSlider(slider2)}
      >
        {data.map((v) => (
          <div className="subimg" key={v}>
            <div className="img-container">
              <img src={v} alt="" />
            </div>
          </div>
        ))}
      </Slider>
    );
  }

  function check(optionId, optionValue) {
    if (currentOption[optionId] === optionValue) return "active";

    const rs = isAvailableOption({
      product: productInfo,
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
        product: productInfo,
        currentOption,
        optionId,
        optionValue,
      });

      setNumberOfProduct(quantity);

      newOption[optionId] = optionValue;
      setCurrentOption(newOption);
    } else {
      const [newOption, newQty] = selectUnavailableOption({
        product: productInfo,
        optionId,
        optionValue,
      });
      setCurrentOption(newOption);
      setNumberOfProduct(newQty);
    }
  }

  function createConfigurableOptions(configurableOptions) {
    if (configurableOptions) {
      if (configurableOptions.length > 0) {
        return configurableOptions.map((option, index) => (
          <div className="product-detail__options row" key={option.id}>
            <h4>{option.name}: </h4>
            <div className="options">
              {createOptionItem(option.id, option.values)}
            </div>
          </div>
        ));
      }
    }
  }

  function createOptionItem(id, values) {
    return (
      <>
        {values.map((option, index) => (
          <div
            className={`option-item ${check(id, option)}`}
            key={option + "configurableOptions"}
            onClick={() => changeOption(id, option, !check(id, option))}
          >
            {option}
          </div>
        ))}
      </>
    );
  }

  function handleAddCart() {
    const {
      configurableProducts = [],
      configurableOptions = [],
      attributes = [],
      priceAfterDiscount,
      ...others
    } = productInfo;

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

    dispatch(cartActions.fetchAddCart({ product: product }));

    dispatch(
      actions.activePopup({
        type: POPUP.ADD_CART_POPUP,
        data: {
          ...productInfo,
        },
      })
    );
  }

  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="breadcumb">
            <Breadcrumb pages={array} />
          </div>

          <div className="product-detail row">
            <div className="product-detail__img">
              <div className="main-img">
                {createMainSlider(productInfo.image)}
              </div>
              <div className="sub-img">
                {createSubSlider(productInfo.image)}
              </div>
            </div>

            <div className="product-detail__info">
              <div className="product-detail__name">
                <h1>{productInfo.name}</h1>
              </div>

              <div className="row">
                <div className="product-detail__brand">
                  <h4 className="">Brand:</h4>
                  {productInfo.brand || "Updating"}
                </div>
                <div className="product-detail__status">
                  <h4>Status:</h4>
                  {productInfo.status || "Updating"}
                </div>
              </div>

              <div className="product-detail__price">
                <span className="price__afterdiscount">
                  {formatter.format(productInfo.priceAfterDiscount) ||
                    "Updating"}
                </span>
                <span className="price__beforediscount">
                  {formatter.format(productInfo.priceBeforeDiscount) ||
                    "Updating"}
                </span>
              </div>

              <div className="product-detail__attributes">
                {productInfo.attributes &&
                  productInfo.attributes.length > 0 &&
                  typeof productInfo.attributes !== "string" &&
                  productInfo.attributes.map((v) => (
                    <h4 key={v.name + "att"}>
                      {v.name}: <span>{v.value}</span>
                    </h4>
                  ))}
              </div>

              {createConfigurableOptions(productInfo.configurableOptions)}

              <div className="product-detail__quantity row">
                <div className="left">
                  <h4>Quantity:</h4>
                  <Quantity
                    value={number}
                    changeValue={setNumber}
                    type="add"
                    available={numberOfProduct}
                  />
                </div>
                <p className="right">
                  Product Available <span>{numberOfProduct}</span>{" "}
                </p>
              </div>

              <div className="product-detail__tag row">
                <h4>Tag:</h4>
                {productInfo.categories &&
                  productInfo.categories.map((cate, index) => (
                    <span key={`cate_${index}`}>{cate}</span>
                  ))}
              </div>

              <div className="product-detail__btn row">
                <button className="button button-style" onClick={handleAddCart}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>

          <div className="product-detail__tabs">
            <ProductTabs product={productInfo} />
          </div>
          <div className="product-detail__related">
            <RelatedProducts product={productInfo} />
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default ProductDetail;
