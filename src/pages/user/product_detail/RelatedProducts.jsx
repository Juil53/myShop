import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../../components/user/product_card/ProductCard";
import { actions as productActions } from "../../../store/products/slice";
import { selectProduct } from "../../../store/products/selector";

const RelatedProducts = ({ product }) => {
  const dispatch = useDispatch();
  const productList = useSelector(selectProduct);

  useEffect(() => {
    dispatch(productActions.fetchAllProductsRequest());
  }, []);

  const handleRelatedProducts = () => {
    const { categories = [] } = product;
    const relatedProducts =
      productList &&
      productList?.filter((item) => item.categories?.includes(categories[0]));

    if (relatedProducts.length > 4) {
      return relatedProducts
        .splice(0, 4)
        .map((product, index) => (
          <ProductCard key={`product_${index}`} data={product} />
        ));
    } else {
      return relatedProducts.map((product, index) => (
        <ProductCard key={`product_${index}`} data={product} />
      ));
    }
  };

  return (
    <>
      <h1 className="product-related__title">Related Products</h1>
      <div className="product-related__divider"></div>
      <div className="product-related__cards">{handleRelatedProducts()}</div>
    </>
  );
};

export default RelatedProducts;
