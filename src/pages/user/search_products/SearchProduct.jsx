import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainLeft from "../home_page/child/MainLeft";
import Banner from "../home_page/child/Banner";
import ProductSection from "../../../components/product_section/ProductSection";
import { productSelector } from "../../../store/products/selector";
import { categoriesSelector } from "../../../store/categories/selector";
import { fetchAllProducts } from "../../../store/products/actions";
import { pageSelector } from "../../../store/page/selector";
import { LOADING_STATUS, PAGE_ACTIONS, PRODUCT_ACTIONS } from "../../../constants";

const SearchProduct = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector(categoriesSelector);
  const { allProducts, bestSellingProducts } =
    useSelector(productSelector);

  useEffect(() => {
    if (allProducts.status === LOADING_STATUS.IDLE) {
      dispatch({ type: PRODUCT_ACTIONS.GET_ALL_PRODUCTS});
    }
  },[]);

  console.log(allProducts)

  return (
    <div className="home-page__main row">
      <MainLeft categories={categories.data} data={bestSellingProducts.data} />
      <div className="home-page__main-right">
        <h2>All products</h2>
        <span>Sort</span>
        <input type="text" placeholder="Sort" style={{ border: "1px solid" }} />
        <div className="productcards_container">
          {allProducts.data.length !== 0 && allProducts.data.length >= 3 && (
            <ProductSection title="Hot product" data={allProducts.data} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
