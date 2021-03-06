import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { LOADING_STATUS } from "../../../constants";
import { categoriesSelector, selectLoading } from "../../../store/categories/selector";
import {
  productSelector,
  selectProduct,
  selectSearchProduct,
} from "../../../store/products/selector";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Breadcrumb from "../../../components/breadcumb/BreadCumb";
import Loading from "../../../components/loading/Loading";
import ProductCard from "../../../components/user/product_card/ProductCard";
import MainLeft from "../home_page/MainLeft";
import { actions as productActions } from "../../../store/products/slice";
import ScrollToTop from "../../../components/user/scroll_to_top/ScrollToTop";

const SearchProduct = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState("Default");

  const { categories } = useSelector(categoriesSelector);
  const { searchResult } = useSelector(productSelector);
  const loading = useSelector(selectLoading);

  const mainCate = searchParams.get("category") || "";
  const subCate = searchParams.get("subCate") || "";
  const sortCate = searchParams.get("sort");
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (query !== "" && searchResult.status === LOADING_STATUS.IDLE) {
      dispatch(productActions.searchProductRequest({ name: query }));
    }
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [searchParams]);

  const dataFilter = useSelector((state) => selectProduct(state, mainCate, subCate, sortCate));
  const searchResultFilter = useSelector((state) =>
    selectSearchProduct(state, mainCate, subCate, sortCate)
  );

  const array = [
    {
      id: "/home",
      name: "Home",
      url: "/",
    },
    {
      id: "/product",
      name: "Product",
      url: "",
    },
  ];

  const {
    allProducts: { status },
    newProducts,
  } = useSelector(productSelector);

  useEffect(() => {
    if (status === LOADING_STATUS.IDLE || newProducts.status === LOADING_STATUS.IDLE) {
      dispatch(productActions.fetchAllProductsRequest());
      dispatch(productActions.fetchNewProductsRequest());
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //RENDER CARDS
  const handleRenderCard = () => {
    if (searchResult.status === "SUCCESS") {
      return searchResultFilter.map((product, index) => (
        <ProductCard cardDirection="vertical" data={product} key={`product_${index}`} />
      ));
    } else {
      return dataFilter.map((product, index) => (
        <ProductCard cardDirection="vertical" data={product} key={`product_${index}`} />
      ));
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="breadcumb">
            <Breadcrumb pages={array} color={"#35c0c5"} />
          </div>
          <ScrollToTop />
          <div className="home-page__main row">
            <MainLeft
              categories={categories.data}
              data={newProducts.data}
              currentCate={{ mainCate, subCate }}
              keyword={query}
            />
            <div className="home-page__main-right">
              <h2>ALL PRODUCTS</h2>

              <div className="productpage__sort-wrapper">
                <span>Sort products:</span>
                <ul className="productpage__sort">
                  <span className="productpage__sort-title">{title}</span>
                  <KeyboardArrowDownIcon className="productpage__sort-icon" />
                  <li className="productpage__sort-list">
                    <ul>
                      <li>
                        <Link
                          to={`?query=${query}&?category=${mainCate}&subcate=${subCate}&sort=default`}
                          onClick={() => setTitle("Default")}
                        >
                          Default
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`?query=${query}&?category=${mainCate}&subcate=${subCate}&sort=asc`}
                          onClick={() => setTitle("Price Asc")}
                        >
                          Price Asc
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`?query=${query}&?category=${mainCate}&subcate=${subCate}&sort=des`}
                          onClick={() => setTitle("Price Des")}
                        >
                          Price Des
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`?query=${query}&?category=${mainCate}&subcate=${subCate}&sort=az`}
                          onClick={() => setTitle("A -> Z")}
                        >
                          A to Z
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`?query=${query}&?category=${mainCate}&subcate=${subCate}&sort=za`}
                          onClick={() => setTitle("Z -> A")}
                        >
                          Z to A
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <span className="productpage__sort-icon"></span>
                </ul>
              </div>
              <div className="productpage__container">{handleRenderCard()}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SearchProduct;
