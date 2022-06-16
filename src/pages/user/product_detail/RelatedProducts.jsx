import React from "react";
import { useSelector } from "react-redux";
import { selectProduct } from "../../../store/products/selector";
import ProductCard from "../../../components/product_card/ProductCard";

const RelatedProducts = ({ product }) => {
  const productList = useSelector(selectProduct);
  const handleRelatedProducts = (product) => {
    const relatedProducts = productList.filter((item) =>
      item.categories.includes(product.categories[0])
    );

    if (relatedProducts.length > 4) {
      return relatedProducts
        .splice(0, 4)
        .map((product, index) => <ProductCard key={`product_${index}`} data={product} />);
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
      <div className="product-related__cards">{handleRelatedProducts(product)}</div>
    </>
  );
};

export default RelatedProducts;
