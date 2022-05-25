import CategoryCard from "../../../../components/category_card/CategoryCard";
import ProductCard from "../../../../components/product_card/ProductCard";

const MainLeft = (props) => {
  const { categories, data } = props;

  const createProductCard = (data) => {
    if (data.length >= 0) {
      if (data.length > 3) {
        let tmp = [...data];
        const dataAfterSlice = tmp.splice(0, 3);
        return dataAfterSlice.map((v) => (
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
