import "./FooterStyles.css";
import React from "react";

import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
        <div>
          <h1 style={{ fontSize: "2.5rem" }}>JustOnePrice</h1>
          <p>Choose your favorite Items</p>
        </div>
        <div>
          <h2 style={{ fontSize: "2.5rem" }}>
            Our Store Link
            <a href="https://www.miniloftshop.com/">
              <i class="fa-solid fa-link"></i>
            </a>
          </h2>
        </div>
        <div>
          <a href="https://www.facebook.com/miniloftshop/?checkpoint_src=any">
            <i class="fa-brands fa-facebook fa-bounce"></i>
          </a>
          <a href="https://www.instagram.com/miniloftshop/">
            <i class="fa-brands fa-instagram fa-spin"></i>
          </a>
          <a href="https://web.whatsapp.com/">
            <i class="fa-brands fa-whatsapp fa-beat-fade"></i>
          </a>
          <a href="https://www.tiktok.com/@mini.loft.shop">
            <i class="fa-brands fa-tiktok  fa-beat"></i>
          </a>
        </div>
      </div>
      <div className="bottom">
        <div>
          <h4>Project</h4>
          <a href="/">ChangeLog</a>
          <a href="/">Status</a>
          <a href="/">License</a>
          <a href="/">All Versions</a>
          <p>
            Build By <i class="fa-brands fa-node"></i>
          </p>
        </div>
        <div>
          <h4>Help</h4>
          <a href="/">Support</a>
          <a href="/">TroubleShooting</a>
          <a href="/">Contact Us</a>
        </div>
        <div>
          <h4>Others</h4>
          <a href="/">Terms of Service</a>
          <a href="/">Privacy Policy</a>
          <a href="/">License</a>
          <Link to="/DB">Delete Button</Link>
          <Link to="/AboutUs">About Us</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
