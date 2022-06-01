import Quantity from "../../../components/quantity/Quantity";
import { utils } from "../../../utils";

const CartPage = () => {
  return (
    <div className="cart-page">
      <ul className="breadcums">
        <li>
          <a>Home</a>
          <span>/</span>
        </li>
        <li>Cart</li>
      </ul>
      <div className="title">Your cart</div>
      <table className="cart-table">
        <thead className="cart-header">
          <tr>
            <th className="image">Image</th>
            <th className="name">Name</th>
            <th className="price">Price</th>
            <th className="quantity">Quantity</th>
            <th className="amount">Amount</th>
            <th className="delete">Delete</th>
          </tr>
        </thead>
        <tbody className="cart-data">
          <tr className="cart-item">
            <td>
              <div className="image">
                <img src="/img/sp1.png" alt="" />
              </div>
            </td>
            <td className="name">
              <a href="">
                Đồ chơi xếp hình DF Friends Thỏ tím in the mug 7x12 - Mix
              </a>
            </td>
            <td>{utils.priceBreak(500000)}₫</td>
            <td className="quantity">
              <Quantity />
            </td>
            <td>{utils.priceBreak(500000)}₫</td>
            <td className="delete">
              <button className="delete-btn">
                <i className="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="total-money row">
        Total money:
        <span>{utils.priceBreak(500000)}₫</span>
      </div>
      <div className="payment-container row">
        <a className="payment-btn button-style" href="/payment">
          Payment
        </a>
      </div>
    </div>
  );
};
export default CartPage;
