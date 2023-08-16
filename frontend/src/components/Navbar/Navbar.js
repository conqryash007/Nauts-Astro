import React, { useState, useEffect } from "react";
import "./Navbar.css";
import useWindowDimensions from "./../utils/getDimension";
import { ethers } from "ethers";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";

import log from "./../../assets/rl.png";
const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [addr, setAddr] = useState("");
  const [change, setChange] = useState(false);
  const { width } = useWindowDimensions();
  const [op, setOp] = useState(false);

  //pop-up
  const openPopper = Boolean(anchorEl);
  const id = true ? "simple-popper" : undefined;

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  useEffect(() => {
    const run = async () => {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Create a provider and signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const data = provider.getSigner();
      const address = await data.getAddress();
      setAddr(() => address);
    };

    run();
  }, []);
  const getLinks = () => {
    if (width > 800) {
      return (
        <div>
          <a href="https://reignlabs.io/">Home</a>
          <a href="https://reignlabs.io/roadmap/">Roadmap</a>

          <a
            style={{ cursor: "pointer" }}
            aria-describedby={id}
            type="button"
            onMouseEnter={handleClick}
          >
            Launch
          </a>
          <Popper
            onMouseLeave={handleClick}
            id={id}
            open={openPopper}
            anchorEl={anchorEl}
          >
            <Box className="popup">
              <a href="launchpass">Launch Pass</a>
              <a href="https://reignlabs.io/launch-pad/">Launch Pad</a>
            </Box>
          </Popper>

          <a href="discountmint">Invest</a>
          <a href="claim">Claim</a>
          <a href="mintstake">Mint</a>
          <p style={{ cursor: "pointer", display: "inline" }}>
            {addr !== "" ? (
              <a>{`${addr.slice(0, 5)}...${addr.slice(-3)}`}</a>
            ) : (
              <a>Connect</a>
            )}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <div
            className={`${op ? "change" : ""} container`}
            onClick={() => {
              setOp(!op);
            }}
          >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </div>
      );
    }
  };
  return (
    <div>
      <div className="nav">
        <img src={log} alt="logo" />
        <div className="links">{getLinks()}</div>
        <div
          className={op ? "cross" : "none"}
          onClick={() => {
            setOp(!op);
          }}
        >
          X
        </div>
        <div className={op ? "nav-mob" : "none"}>
          <img src={log} alt="" />
          <div className="lin">
            <a href="https://reignlabs.io/">Home</a>
            <a href="mintstake">Apply Now</a>
            <a href="launchpass">Launch Pad</a>
            <a href="https://reignlabs.io/priority-support/">
              Priority Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
