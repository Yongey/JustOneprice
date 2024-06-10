/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../Components/Home.css";
import "../Components/FooterStyles.css";
import { AuthContext } from "../routes/AuthContext"; // Import AuthContext

const Home = () => {
  const { token } = useContext(AuthContext); // Use AuthContext

  const isAuthenticated = !!token;
  return (
    <div className="content-wrapper">
      <div>
        <Navbar />
        <div className="homepage-message">
          {isAuthenticated ? (
            <div>
              <span class="box-decoration-clone bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2 ...">
                Welcome to the homepage
              </span>
            </div>
          ) : (
            <h1>
              Please{" "}
              <a href="/auth" className="login-link">
                log in
              </a>{" "}
              to access the account
            </h1>
          )}
        </div>
      </div>
      <div className="p-5 grid grid-cols-4 gap-5">
        <div className="container product-card">
          <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                class="p-8 rounded-t-lg"
                src="https://m.media-amazon.com/images/I/611uU63JESL._AC_SX679_.jpg"
              />
            </a>
            <div class="px-5 pb-5">
              <a href="#">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  Apple Watch Series 7 GPS, Aluminum Case, Starlight Sport
                </h5>
              </a>

              <div class="flex items-center justify-between mt-6">
                <span class="text-3xl font-bold text-gray-900 dark:text-white">
                  $599
                </span>
                <a class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Browse
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
