import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { LOADING_STATUS, PRODUCT_ACTIONS } from "../../../constants";
import { categoriesSelector, selectLoading } from "../../../store/categories/selector";
import { productSelector, selectProduct } from "../../../store/products/selector";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Breadcrumb from "../../../components/breadcumb/BreadCumb";
import Loading from "../../../components/loading/Loading";
import ProductCard from "../../../components/product_card/ProductCard";
import MainLeft from "../home_page/child/MainLeft";

const SearchProduct = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState("Default");
  const { categories } = useSelector(categoriesSelector);
  const loading = useSelector(selectLoading);
  const mainCate = searchParams.get("category") || "";
  const subCate = searchParams.get("subcate") || "";
  const sortCate = searchParams.get("sort");
  const dataFilter = useSelector((state) => selectProduct(state, mainCate, subCate, sortCate));
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
    allProducts: { data, status },
    newProducts,
  } = useSelector(productSelector);

  useEffect(() => {
    if (status === LOADING_STATUS.IDLE || newProducts.status === LOADING_STATUS.IDLE) {
      dispatch({ type: PRODUCT_ACTIONS.GET_ALL_PRODUCTS });
      dispatch({ type: PRODUCT_ACTIONS.GET_NEW_PRODUCTS });
    }
  }, []);

  //RENDER CARDS
  const handleRenderCard = (dataArr) => {
    return dataFilter?.map((product, index) => (
      <Link to={`${product.id}`} key={`product_${index}`}>
        <ProductCard cardDirection="vertical" data={product} />
      </Link>
    ));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="breadcumb">
            <Breadcrumb pages={array} />
          </div>
          <div className="home-page__main row">
            <MainLeft categories={categories.data} data={newProducts.data} />
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
                        <Link to={`?category=${mainCate}&subcate=${subCate}&sort=default`}>
                          Default
                        </Link>
                      </li>
                      <li>
                        <Link to={`?category=${mainCate}&subcate=${subCate}&sort=asc`}>
                          Price Asc
                        </Link>
                      </li>
                      <li>
                        <Link to={`?category=${mainCate}&subcate=${subCate}&sort=des`}>
                          Price Des
                        </Link>
                      </li>
                      <li>
                        <Link to={`?category=${mainCate}&subcate=${subCate}&sort=az`}>A to Z</Link>
                      </li>
                      <li>
                        <Link to={`?category=${mainCate}&subcate=${subCate}&sort=za`}>Z to A</Link>
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
