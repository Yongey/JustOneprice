import React from "react";
import "../style/shoppingCart.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoBagCheckOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function ShoppingCart({
  visibilty,
  products,
  onProductRemove,
  onClose,
  onQuantityChange,
}) {
  return (
    <div
      className="modal"
      style={{
        display: visibilty ? "block" : "none",
      }}
    >
      <div className="shoppingCart">
        <div className="header">
          <h2>Shopping cart</h2>
          <button className="btn close-btn" onClick={onClose}>
            <AiFillCloseCircle size={30} />
          </button>
        </div>
        <div className="cart-products">
          {products.length === 0 && (
            <span className="empty-text">Your basket is currently empty</span>
          )}
          {products.map((product) => (
            <div className="cart-product" key={product.id}>
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <span className="product-price">
                  {product.price * product.count}$
                </span>
              </div>
              <select
                className="count"
                value={product.count}
                onChange={(event) => {
                  onQuantityChange(product.id, event.target.value);
                }}
              >
                {[...Array(1000).keys()].map((number) => {
                  const num = number + 1;
                  return (
                    <option value={num} key={num}>
                      {num}
                    </option>
                  );
                })}
              </select>
              <button
                className="btn remove-btn"
                onClick={() => onProductRemove(product)}
              >
                <RiDeleteBin6Line size={20} />
              </button>
            </div>
          ))}
          {products.length > 0 && (
            <Link to="/checkout" className="checkout-link">
              <button className="checkout-btn">
                <div className="checkout-container">
                  <IoBagCheckOutline size={25} />
                  <span>Proceed to checkout</span>
                </div>
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
