import React from "react";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { ToastContainer } from "react-toastify";
import DiscCard from "./subComponents/DiscCard";

import p1 from "./../../assets/p1.png";
import p2 from "./../../assets/p2.png";
import p3 from "./../../assets/p3.webp";
import p4 from "./../../assets/p4.jpeg";
import p5 from "./../../assets/p5.webp";
import p6 from "./../../assets/p6.webp";
import pair from "./../../assets/pairnauts.webp";

import "./Discount.css";

const Discount = ({ nautContract, account }) => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
        pauseOnHover
      />
      <div className="main22">
        <Navbar />
        <div className="claim-txt2">
          <h2 className="top-txt-c2">
            Claim Your Astro-NAUT Before The Timer Runs Out!
          </h2>
          <h3>
            We wanted to say thank you to these selected communities for
            sticking by us and helping us navigate the Web3 industry and NFT
            ecosystem. If you are a member of more then one of the communities
            mentioned below, you will be able to claim the NFTs at dicounted
            price.
          </h3>
        </div>

        <div className="project2">
          <div className="proj-img2">
            <div>
              <img src={p1} alt="" />
              <h2>MOOSE SOCIETY NFT</h2>
            </div>
            <div>
              <img src={p2} alt="" />
              <h2>ALPHA ISLAND CLUB</h2>
            </div>
            <div>
              <img src={p3} alt="" />
              <h2>CRYP3D PUNKS</h2>
            </div>
            <div>
              <img src={p4} alt="" />
              <h2>BUSHIDO APES</h2>
            </div>
            <div>
              <img src={p5} alt="" />
              <h2>GROUCHY TIGERS</h2>
            </div>
            <div>
              <img src={p6} alt="" />
              <h2>GNARWAHLS</h2>
            </div>
          </div>
          <div className="proj-txt2">
            <h3>
              This page is token gated to the selected projects. We used their
              contract addresses, not your wallet address. You must have one of
              the NFTs in your wallet from any of the projects to claim. Being a
              member of each project entitles you to discounted astro-naut mint.
              Please connect your wallet and sign. Signing is allowing us to
              look in your wallet to see if you own any of these projects and
              allowing you to mint any or all you are entitled to.
            </h3>
          </div>
        </div>

        <div className="discount2">
          <div>
            <img src={pair} alt="" />
          </div>
          <div>
            <DiscCard nautContract={nautContract} account={account} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Discount;
