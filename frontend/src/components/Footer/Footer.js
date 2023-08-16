import React from "react";
import lg from "./../../assets/lg.png";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-main">
      <div className="footer-c1">
        <img src={lg} alt="logo" />
      </div>
      <div className="footer-c2">
        <div className="info-1">
          <h1>Contact Us</h1>
          <h3>Address</h3>
          <h2>Midlothian Va, 23114</h2>
          <h3>Email</h3>
          <h2>hello@reignlabs.io</h2>
        </div>
        <div className="info-2">
          <h1>Support</h1>
          <h3>
            <a href="https://reignlabs.io/launch-pass/">Team of use</a>
          </h3>
          <h3>
            <a href="https://reignlabs.io/launch-pass/">Privacy</a>
          </h3>
          <h3>
            {" "}
            <a href="https://reignlabs.io/launch-pass/">Help center</a>
          </h3>
          <h3>
            <a href="https://reignlabs.io/launch-pass/">Contact</a>
          </h3>
        </div>
        <div className="info-2">
          <h1>Quick Link</h1>
          <h3>
            <a href="https://reignlabs.io/launch-pass/">Home</a>
          </h3>
          <h3>
            <a href="https://reignlabs.io/launch-pass/">Staking</a>
          </h3>
          <h3>
            {" "}
            <a href="https://reignlabs.io/launch-pass/">Blog</a>
          </h3>
          <h3>
            <a href="https://reignlabs.io/launch-pass/">Our Team</a>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Footer;
