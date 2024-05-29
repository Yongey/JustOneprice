/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
const ProductManagement = () => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div>
      <div>
        <p>ProductManagement</p>
      </div>
      <div className="flex items-center">
        <button
          type="button"
          className="flex items-center justify-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          <IoIosAddCircle className="mr-2" style={{ fontSize: "24px" }} /> Add
          Product
        </button>
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-16 py-3">
                <span class="sr-only">Image</span>
              </th>
              <th scope="col" class="px-6 py-3">
                Product
              </th>
              <th scope="col" class="px-6 py-3">
                Quantity
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="p-4">
                <img
                  src="https://help.apple.com/assets/6580A106ABAA01F3080E7505/6580A11008DFECBA0F060581/en_US/ce54a838112f4138e49e0be9b9a3a016.png"
                  class="w-16 md:w-32 max-w-full max-h-full"
                  alt="Apple Watch"
                ></img>{" "}
              </td>
              <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                Apple Watch
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <button
                    className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                    onClick={handleDecrement}
                  >
                    <span className="sr-only">Decrease Quantity</span>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 9h16"
                      />
                    </svg>
                  </button>
                  <span className="mx-2">{quantity}</span>
                  <button
                    className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                    onClick={handleIncrement}
                  >
                    <span className="sr-only">Increase Quantity</span>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
              <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                $599
              </td>
              <td class="px-6 py-4">
                <a
                  href="#"
                  class="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Remove
                </a>
              </td>
              <td class="px-6 py-4">
                <a
                  href="#"
                  class="font-medium text-yellow-600 dark:text-red-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
