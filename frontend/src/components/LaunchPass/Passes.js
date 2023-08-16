import React from "react";
import "./Pass.css";

const single = [
  [
    "SMART CONTRACT CREATION",
    "MARKETPLACE LISTING",
    "MINT BUTTON VIA SDK",
    "AIRDROPS",
    "LDR (LATER DATE REVEAL)",
    "REVENUE SPLIT",
    "PAUSABLE CONTRACTS",
    "DISCORD SUPPORT (5 DAYS)",
  ],
  [
    "EVERYTHING IN THE BASIC PASS",
    "STAKING",
    "STAKE/UNSTAKE BUTTON VIA SDK",
    "SOUL BOUND NFTS",
    "DYNAMIC MINT PRICE",
    "NFT GENERATION (5K MAX)",
    "MULTIPLE CURRENCY MINTING",
    "DISCORD SUPPORT (15 DAYS)",
  ],
  [
    "EVERYTHING IN BASIC & ELITE",
    "UNIQUE SMART CONTRACTS",
    "COMMUNITY TOKEN CREATION",
    "FULL STACK SOLUTIONS",
    "NFT GENERATION (10K MAX)",
    "DISCORD CREATION",
    "SOCIAL MEDIA CREATION",
    "DISCORD SUPPORT (30 DAYS)",
  ],
];

const Passes = () => {
  return (
    <div className="pass-cont">
      <div className="pass">
        <div className="pass-head">
          <div className="patti">STARTER</div>
          <h1>Economy</h1>
          <h3>LAUNCH PASS</h3>
        </div>
        <div className="pass-fee">
          <h1>4%</h1>
          <h3>Sales Fee</h3>
        </div>
        <div className="pass-char">
          {single[0].map((curr, i) => {
            return (
              <div key={i} className="passSingle">
                {/* <svg
                  aria-hidden="true"
                  className="e-font-icon-svg e-far-check-circle"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"></path>
                </svg> */}
                {curr}
              </div>
            );
          })}
        </div>
        <button className="btn-pass">0.35 ETH</button>
        <p className="pass-btm">
          This pass is perfect for someone who is just starting out and needs an
          NFT Smart Contract done. NFT Generation is not included in this pass.
        </p>
      </div>
      <div className="pass">
        <div className="pass-head">
          <div className="patti">POPULAR</div>
          <h1>Business</h1>
          <h3>LAUNCH PASS</h3>
        </div>
        <div className="pass-fee">
          <h1>2%</h1>
          <h3>Sales Fee</h3>
        </div>
        <div className="pass-char">
          {single[1].map((curr, i) => {
            return (
              <div key={i} className="passSingle">
                {/* <svg
                  aria-hidden="true"
                  className="e-font-icon-svg e-far-check-circle"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"></path>
                </svg> */}
                {curr}
              </div>
            );
          })}
        </div>
        <button className="btn-pass">1.5 ETH</button>
        <p className="pass-btm">
          This is a perfect pass for someone who needs a little of everything.
          This pass gets your contract done, NFT generation up to 5k, staking &
          more!
        </p>
      </div>
      <div className="pass">
        <div className="pass-head">
          <div className="patti">EVERYTHING</div>
          <h1>First Class</h1>
          <h3>LAUNCH PASS</h3>
        </div>
        <div className="pass-fee">
          <h1>0%</h1>
          <h3>Sales Fee</h3>
        </div>
        <div className="pass-char">
          {single[0].map((curr, i) => {
            return (
              <div key={i} className="passSingle">
                {/* <svg
                  aria-hidden="true"
                  className="e-font-icon-svg e-far-check-circle"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"></path>
                </svg> */}
                {curr}
              </div>
            );
          })}
        </div>
        <button className="btn-pass">8.25 ETH</button>
        <p className="pass-btm">
          The First Class Pass is perfect for a creator who needs a custom
          solution. You need it all done and don't want to worry? We have you
          covered!
        </p>
      </div>
    </div>
  );
};

export default Passes;
