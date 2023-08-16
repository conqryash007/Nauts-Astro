import React from "react";
import Navbar from "../Navbar/Navbar";
import "./LaunchPage.css";
import roc from "./../../assets/roc.webp";
import i1 from "./../../assets/i1.webp";
import i2 from "./../../assets/i2.webp";
import i3 from "./../../assets/i3.webp";
import pass from "./../../assets/pass.png";
import Passes from "./Passes";
import Footer from "../Footer/Footer";

const LaunchPass = () => {
  return (
    <div>
      <div className="overlay"></div>
      <div className="main">
        <Navbar />
        <img className="roc" src={roc} alt="rocket" />
        <div className="container-1">
          <h1>
            Get Your Ticket Now! <br />
            Boarding Soon
          </h1>
          <h3>
            Your Launch Pass gives you access to our new NFT Project Minting
            <br />
            Technology. The R3 Launch Pad!
          </h3>
          <button className="btn-grn">Mint Below</button>
        </div>
        <div className="container-2">
          <div>
            <div className="sub1">
              <div className="sub1-1">
                <img className="m1" src={i1} alt="i1" />
              </div>
              <div className="sub1-2">
                <h1>Mint</h1>
                <h3>
                  Mint your pass below and get started <br />
                  ASAP!
                </h3>
              </div>
            </div>{" "}
            <div className="sub1">
              <div className="sub1-1">
                <img className="m1" src={i2} alt="i1" />
              </div>
              <div className="sub1-2">
                <h1>Activate</h1>
                <h3>
                  Activate your pass using the link provided after you have
                  minted.
                </h3>
              </div>
            </div>{" "}
            <div className="sub1">
              <div className="sub1-1">
                <img className="m1" src={i3} alt="i1" />
              </div>
              <div className="sub1-2">
                <h1>Launch</h1>
                <h3>
                  Launch your project using our launch <br />
                  pad and get up and running in no time!
                </h3>
              </div>
            </div>
          </div>
          <div>
            <img className="p" src={pass} alt="pass" />
          </div>
        </div>
        <div>
          <Passes />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LaunchPass;
