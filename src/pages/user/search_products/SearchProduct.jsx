import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
import ProductCard from "../../../components/product_card/ProductCard";
import { LOADING_STATUS, PRODUCT_ACTIONS } from "../../../constants";
import {
  categoriesSelector, selectLoading
} from "../../../store/categories/selector";
import { productSelector } from "../../../store/products/selector";
import MainLeft from "../home_page/child/MainLeft";

const SearchProduct = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTemp = searchParams.get("category");
  const [productSorted, setProductSorted] = useState([]);
  const [title, setTitle] = useState("Default");
  const { categories } = useSelector(categoriesSelector);
  const loading = useSelector(selectLoading);

  const {
    allProducts: { data, status },
    newProducts,
  } = useSelector(productSelector);

  useEffect(() => {
    if (searchTemp) {
      setProductSorted(data.filter((product) => product.categories.includes(searchTemp)));
    } else {
      setProductSorted(data);
    }
  }, [searchTemp]);

  useEffect(() => {
    if (status === LOADING_STATUS.IDLE || newProducts.status === LOADING_STATUS.IDLE) {
      dispatch({ type: PRODUCT_ACTIONS.GET_ALL_PRODUCTS });
      dispatch({ type: PRODUCT_ACTIONS.GET_NEW_PRODUCTS });
    }
  }, []);

  //HANDLE DEFAULT SORT
  const handleDefaultSort = () => {
    setProductSorted(data);
    setTitle("Default");
  };

  //HANDLE SORT PRICE ASC
  const handleSortAsc = () => {
    let arr = [];
    const dataClone = [...productSorted];
    arr = dataClone.sort((a, b) => {
      return a.priceBeforeDiscount - b.priceBeforeDiscount;
    });
    setProductSorted(arr);
    setTitle("Price Asc");
  };

  //HANDLE SORT PRICE DES
  const handleSortDes = () => {
    let arr = [];
    const dataClone = [...productSorted];
    arr = dataClone
      .sort((a, b) => {
        return a.priceBeforeDiscount - b.priceBeforeDiscount;
      })
      .reverse();
    setProductSorted(arr);
    setTitle("Price Des");
  };

  //HANDLE SORT BY NAME A->Z
  const handleSortByNameAZ = () => {
    let arr = [];
    const dataClone = [...productSorted];
    arr = dataClone.sort((a, b) => {
      const x = a.name.toUpperCase();
      const y = b.name.toUpperCase();
      return x.localeCompare(y);
    });
    setProductSorted(arr);
    setTitle("Name A -> Z");
  };

  //HANDLE SORT BY NAME Z->A
  const handleSortByNameZA = () => {
    let arr = [];
    const dataClone = [...productSorted];
    arr = dataClone.sort((a, b) => {
      const x = a.name.toUpperCase();
      const y = b.name.toUpperCase();
      return y.localeCompare(x);
    });
    setProductSorted(arr);
    setTitle("Name Z -> A");
  };

  //RENDER CARDS
  const handleRenderCard = (dataArr) => {
    return productSorted.map((product, index) => (
      <ProductCard key={`product_${index}`} cardDirection="vertical" data={product} />
    ));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
                    <li onClick={() => handleDefaultSort()}>
                      <span>Default</span>
                    </li>
                    <li onClick={() => handleSortAsc()}>
                      <span>Price Asc</span>
                    </li>
                    <li onClick={() => handleSortDes()}>
                      <span>Price Des</span>
                    </li>
                    <li onClick={() => handleSortByNameAZ()}>
                      <span>A to Z</span>
                    </li>
                    <li onClick={() => handleSortByNameZA()}>
                      <span>Z to A</span>
                    </li>
                  </ul>
                </li>
                <span className="productpage__sort-icon"></span>
              </ul>
            </div>
            <div className="productpage__container">{handleRenderCard()}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchProduct;
