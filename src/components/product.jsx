import { getProductByID } from "../store/services/product";

export default function Product() {
  let product = await getProductByID(1);
  //console.log(product);
  return (
    <div>
      product
      <div>{product.productName}</div>
    </div>
  );
}
