import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import "../style/main.css";
import ProductCard from "../Components/ProductCard"; // Import ProductCard

const Wholesale = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/JOproduct/products"
        );
        setProducts(response.data); // Assuming response.data is an array of products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-5 grid grid-cols-4 gap-5">
        {products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Wholesale;
