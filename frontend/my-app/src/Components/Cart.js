import React, { useState, useContext } from "react";
import { useCart } from "../Components/CartContext";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../routes/AuthContext"; // Import AuthContext
const Cart = () => {
  const { cartItems, removeFromCart, addToCart } = useCart();
  const [expandedProductNames, setExpandedProductNames] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleIncreaseQuantity = (productId, size) => {
    addToCart(
      cartItems.find(
        (item) => item.product.product_id === productId && item.size === size
      ).product,
      1,
      size
    );
  };

  const handleDecreaseQuantity = (productId, size) => {
    const currentQuantity = cartItems.find(
      (item) => item.product.product_id === productId && item.size === size
    ).quantity;

    if (currentQuantity > 1) {
      addToCart(
        cartItems.find(
          (item) => item.product.product_id === productId && item.size === size
        ).product,
        -1,
        size
      );
    }
  };

  const handleToggleProductName = (productName) => {
    if (expandedProductNames.includes(productName)) {
      setExpandedProductNames(
        expandedProductNames.filter((name) => name !== productName)
      );
    } else {
      setExpandedProductNames([...expandedProductNames, productName]);
    }
  };

  const isProductNameExpanded = (productName) =>
    expandedProductNames.includes(productName);

  const handleRemoveFromCart = (productId, size) => {
    removeFromCart(productId, size);
  };

  const handleClose = () => {
    // Implement your close functionality here
    console.log("Implement close functionality");
    // Example: Close the dialog or navigate back
    window.history.back();
  };
  const formatCurrency = (amount) => {
    // Check if amount is a valid number
    if (!isNaN(amount)) {
      // Convert amount to number and format with commas for thousands separator
      return Number(amount).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    }
    return amount; // Return original value if not a valid number
  };
  return (
    <Dialog
      open={true}
      onClose={handleClose} // Use handleClose for onClose functionality
      className="fixed inset-0 z-50 overflow-hidden"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

      <DialogPanel className="absolute inset-0 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg overflow-auto w-full max-w-[60%] max-h-[80%] smooth-scroll">
          <DialogTitle className="text-lg font-medium text-gray-900 bg-gray-100 py-3 px-6 border-b border-gray-200">
            Shopping Cart
          </DialogTitle>
          {!token ? (
            <div className="p-4 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                You need to log in to view your cart.
              </p>
              <p className="mt-2">
                <a href="/auth" className="text-blue-700 hover:underline">
                  Login
                </a>{" "}
                to continue.
              </p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="p-4 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Your cart is empty.
              </p>
              <p className="mt-2">
                <a href="/wholesale" className="text-blue-700 hover:underline">
                  Browse Wholesale
                </a>{" "}
                and start adding items!
              </p>
            </div>
          ) : (
            <div className="overflow-y-auto">
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li
                    key={`${item.product.product_id}-${item.size}`}
                    className="p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="ml-4">
                        <h2 className="text-lg font-bold text-gray-900">
                          Product Name:{" "}
                          <span
                            className={`${
                              item.product.name.length > 15 &&
                              !isProductNameExpanded(item.product.name)
                                ? "truncate"
                                : ""
                            }`}
                          >
                            {item.product.name}
                          </span>{" "}
                          {item.product.name.length > 25 && (
                            <button
                              onClick={() =>
                                handleToggleProductName(item.product.name)
                              }
                              className="text-blue-600 hover:underline text-sm focus:outline-none"
                            >
                              {isProductNameExpanded(item.product.name)
                                ? "Show Less"
                                : "Show More"}
                            </button>
                          )}
                        </h2>
                        <p className="text-sm text-gray-500">
                          Size: {item.size}
                        </p>
                        <div className="flex items-center mt-1">
                          <p className="text-sm text-gray-500 mr-2">
                            Quantity:
                          </p>
                          <button
                            onClick={() =>
                              handleDecreaseQuantity(
                                item.product.product_id,
                                item.size
                              )
                            }
                            className="text-gray-600 focus:outline-none"
                          >
                            -
                          </button>
                          <p className="text-sm font-medium text-gray-900 mx-2">
                            {item.quantity}
                          </p>
                          <button
                            onClick={() =>
                              handleIncreaseQuantity(
                                item.product.product_id,
                                item.size
                              )
                            }
                            className="text-gray-600 focus:outline-none"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          Total Cost: $
                          {(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() =>
                            handleRemoveFromCart(
                              item.product.product_id,
                              item.size
                            )
                          }
                          className="text-red-600 hover:text-red-700 text-sm focus:outline-none mt-2"
                        >
                          Remove Item
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="p-4 border-t border-gray-200">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p className="text-lg font-bold">
                    {formatCurrency(
                      cartItems
                        .reduce(
                          (total, item) =>
                            total + item.product.price * item.quantity,
                          0
                        )
                        .toFixed(2)
                    )}
                  </p>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => navigate("/checkout")}
                    className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-white px-6 py-3 rounded-md text-sm font-medium"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={handleClose} // Use handleClose for onClick functionality
          className="absolute top-0 right-0 m-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
        >
          <XIcon className="h-6 w-6 text-gray-600" />
          <span className="sr-only">Close</span>
        </button>
      </DialogPanel>
    </Dialog>
  );
};

export default Cart;
