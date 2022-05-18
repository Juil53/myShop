import CategoryCard from "../../../../components/category_card/CategoryCard";
import ProductCard from "../../../../components/product_card/ProductCard";

const MainLeft = (props) => {
  const { categories, data } = props;

  const createProductCard = (data) => {
    if (data) {
      if (data.length >= 0) {
        return data.map((v) => (
          <ProductCard
            cardDirection="row"
            name={v.name}
            price_after_discount={v.price_after_discount}
            price_before_discount={v.price_before_discount}
            img={v.image}
          />
        ));
      }
    }
  };
  return (
    <div className="home-page__main-left">
      <CategoryCard categories={categories} />
      <div className="topic">
        <div className="topic-title">Best selling</div>
        <div className="topic-content">{createProductCard(data)}</div>
        <div className="topic-btn">
          <a href="#">See more</a>
        </div>
      </div>
    </div>
  );
};

export default MainLeft;
