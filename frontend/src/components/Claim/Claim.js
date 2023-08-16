import React, { useEffect, useState } from "react";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Clock from "./subComponents/Clock";

import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import { notifySuccess, notifyInfo, notifyError } from "./../notification";

import p1 from "./../../assets/p1.png";
import p2 from "./../../assets/p2.png";
import axios from "axios";
import "./Claim.css";

// remove
import { calcGas } from "./../calcgas";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#0971f1",
      darker: "#053e85",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
    success: {
      main: "#86FF00",
    },
  },
});

const Claim = ({ freeContract, account, nautContract }) => {
  const [available, setAvailable] = useState(0);
  const [claimed, setClaimed] = useState({ moose: -1, alpha: -1 });
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const run = async () => {
      setLoad(true);

      let reward = 0;
      try {
        // moose
        try {
          let r1 = await axios.get(
            `${process.env.REACT_APP_production_url}/api/nauts/claimstatus/moose/${account}`
          );
          r1 = r1.data;

          if (r1.res === false) {
            reward++;
          }

          setClaimed((curr) => {
            return { ...curr, moose: r1.res };
          });
        } catch (err) {}

        // alpha
        try {
          let r2 = await axios.get(
            `${process.env.REACT_APP_production_url}/api/nauts/claimstatus/alpha/${account}`
          );
          r2 = r2.data;

          if (r2.res === false) {
            reward += 2;
          }

          setClaimed((curr) => {
            return { ...curr, moose: r2.res };
          });
        } catch (err) {}

        setAvailable(() => reward);
      } catch (err) {}
      setLoad(false);
    };

    freeContract.alpha && freeContract.moose && run();
  }, []);

  const checkStatus = () => {
    if (available === 0) {
      throw new Error("No claim available");
    } else if (available === 1 && claimed.moose === true) {
      throw new Error("Already claimed");
    } else if (available === 2 && claimed.alpha === true) {
      throw new Error("Already claimed");
    } else if (
      available === 3 &&
      claimed.alpha === true &&
      claimed.moose === true
    ) {
      throw new Error("Already claimed");
    }
  };

  const claimNauts = async () => {
    try {
      notifyInfo("Your Transaction Has Started");
      checkStatus();
      // remove
      const est = await nautContract.estimateGas.claimFreeInvestorNFTs();
      const gas = await calcGas(est);
      //----

      const transaction = await nautContract.claimFreeInvestorNFTs(gas);
      await transaction.wait();
      notifySuccess(`You have successfully claimed your Nauts`);

      if (available === 1) {
        await axios.post(
          `${process.env.REACT_APP_production_url}/api/nauts/claim/moose/${account}`
        );
      } else if (available === 2) {
        await axios.post(
          `${process.env.REACT_APP_production_url}/api/nauts/claim/alpha/${account}`
        );
      } else if (available === 3) {
        await axios.post(
          `${process.env.REACT_APP_production_url}/api/nauts/claim/moose/${account}`
        );
        await axios.post(
          `${process.env.REACT_APP_production_url}/api/nauts/claim/alpha/${account}`
        );
      }

      setAvailable(0);
    } catch (err) {
      console.log(err);
      if (err?.message.includes("Maximum cap reached for asto-nauts NFTs")) {
        notifyError("Maximum claiming cap reached for nauts NFTs");
      } else if (err?.message.includes("No claim available")) {
        notifyError("No claim available");
      } else if (err?.message.includes("Already claimed")) {
        notifyError("Already claimed");
      } else if (err?.message.includes("Can't claim free Investors NFTs")) {
        notifyError("User cannot claim free Investors NFTs");
      } else {
        notifyError("Something went wrong");
      }
    }
  };

  return (
    <div>
      {" "}
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
      <div className="main2">
        <Navbar />
        <div className="claim-txt">
          <h2 className="top-txt-c">
            Claim Your Astro-NAUT Before The Timer Runs Out!
          </h2>
          <h3>
            We wanted to say thank you to these selected communities for
            sticking by us and helping us navigate the Web3 industry and NFT
            ecosystem. If you are a member of more then one of the communities
            mentioned below, you will be able to claim more then one NFT.
          </h3>
        </div>

        <div className="project">
          <div className="proj-img">
            <div>
              <img src={p1} alt="" />
              <h2>MOOSE SOCIETY NFT</h2>
            </div>
            <div>
              <img src={p2} alt="" />
              <h2>ALPHA ISLAND CLUB</h2>
            </div>
          </div>
          <div className="proj-txt">
            <h3>
              This page is token gated to the selected projects. We used their
              contract addresses, not your wallet address. You must have one of
              the NFTs in your wallet from any of the projects to claim. Being a
              member of each project entitles you to one free astro-naut. Please
              connect your wallet and sign. Signing is allowing us to look in
              your wallet to see if you own any of these projects and allowing
              you to claim any or all you are entitled to.
            </h3>
          </div>
        </div>

        <div className="timer">
          <div className="claim-div">
            <h1>{available}</h1>
            <h2>NAUTS AVILABLE TO CLAIM</h2>
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                sx={{ padding: "10px" }}
                color="neutral"
                onClick={claimNauts}
                disabled={load}
              >
                CLAIM NAUT
              </Button>
            </ThemeProvider>
          </div>
          <div></div>
          <div>
            <Clock type={0} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Claim;
