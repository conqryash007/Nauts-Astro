import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import MenuItem from "@mui/material/MenuItem";
import { notifySuccess, notifyInfo, notifyError } from "./../../notification";
import Select from "@mui/material/Select";

import "./Disc.css";
import Clock from "./Clock";

// remove
import { calcGas } from "../../calcgas";

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

export default function DiscCard({ nautContract, account }) {
  const [nautCount, setNautCount] = useState(1);
  const [discountPrice, setDiscountPrice] = useState(0);

  useEffect(() => {
    const run = async () => {
      try {
        let price = await nautContract.DiscountedNFTprice();
        price = parseInt(price._hex);
        console.log(price);
        setDiscountPrice(() => price);
      } catch (err) {
        console.log(err);
      }
    };

    nautContract && run();
  }, [nautContract]);

  const discountMint = async () => {
    try {
      const num = Number(nautCount);

      // remove
      const est = await nautContract.estimateGas.MintDiscountedInvestorNFTs(
        account,
        num,
        { value: discountPrice * num }
      );
      const gas = await calcGas(est);
      // ---

      const options = {
        value: discountPrice * num,
        ...gas,
      };
      console.log(options);

      notifyInfo("Your Transaction Has Started");
      const transaction = await nautContract.MintDiscountedInvestorNFTs(
        account,
        num,
        options
      );
      await transaction.wait();
      notifySuccess(`You have successfully minted ${num} Nauts`);
    } catch (err) {
      console.log(err.message);
      if (err?.message.includes("user rejected transaction")) {
        notifyError("User Rejected the transaction");
      } else if (err?.message.includes("Caller can't mint discounted NFTs")) {
        notifyError("User cannot mint discounted NFTs");
      } else if (
        err?.message.includes("Maximum cap reached for asto-nauts NFTs")
      ) {
        notifyError("Sorry! NFTs fully minted");
      } else {
        notifyError("Something went wrong!");
      }
    }
  };

  return (
    <Card className="diccard" sx={{ backgroundColor: "#1a222c" }}>
      <h1>Discounted Mint!</h1>
      <h3>
        Now that you got your free mint, get a few more for a discounted mint
        price for a limited time.
      </h3>
      {/* <ThemeProvider theme={theme}>
        <Button variant="contained" sx={{ padding: "10px" }} color="success">
          CONNECT WALLET
        </Button>
      </ThemeProvider> */}
      <h2>Discounted Mint Price Ends In...</h2>
      <Clock type={1} />
      <div className="discsel">
        <h3>Quantity</h3>
        <Select
          label="Quantity"
          fullWidth
          sx={{ width: "auto", backgroundColor: "white" }}
          value={nautCount}
          onChange={(e) => {
            setNautCount(e.target.value);
          }}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
        <ThemeProvider theme={theme}>
          <Button
            sx={{ marginTop: "5px", width: "auto", fontWeight: "bolder" }}
            variant="contained"
            color="neutral"
            onClick={discountMint}
          >
            Get Yout Nauts
          </Button>
        </ThemeProvider>
      </div>
    </Card>
  );
}
