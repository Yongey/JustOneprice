import React from "react";

const OrderManagement = () => {
  return (
    <div>
      <div>
        <h1>Order Management</h1>
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Order Number
              </th>
              <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Product name
              </th>
              <th scope="col" class="px-6 py-3">
                Color
              </th>
              <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Category
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                1
              </th>
              <td class="px-6 py-4"> Apple MacBook Pro 17"</td>
              <td class="px-6 py-4">Silver</td>
              <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">Laptop</td>
              <td class="px-6 py-4">$2999</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
