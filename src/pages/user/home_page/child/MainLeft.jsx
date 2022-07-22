import { Link } from "react-router-dom";
import CategoryCard from "../../../../components/user/category_card/CategoryCard";
import ProductCard from "../../../../components/user/product_card/ProductCard";

const MainLeft = (props) => {
  const { categories, data, currentCate } = props;

  const createProductCard = (data) => {
    if (data.length >= 0) {
      if (data.length > 3) {
        let tmp = [...data];
        const dataAfterSlice = tmp.splice(0, 3);
        return dataAfterSlice.map((v) => (
          <ProductCard cardDirection="row" data={v} key={v.id} />
        ));
      }

      return data.map((v) => (
        <ProductCard
          key={v.id}
          cardDirection="row"
          name={v.name}
          priceAfterDiscount={v.priceAfterDiscount}
          priceBeforeDiscount={v.priceBeforeDiscount}
          img={v.image}
        />
      ));
    }
  };

  return (
    <div className="home-page__main-left">
      <CategoryCard categories={categories} currentCate={currentCate} />
      <div className="topic">
        <div className="topic-title">New Products</div>
        <div className="topic-content">{createProductCard(data)}</div>
        <div className="topic-btn">
          <Link to="/product">See more</Link>
        </div>
      </div>
    </div>
  );
};

export default MainLeft;
