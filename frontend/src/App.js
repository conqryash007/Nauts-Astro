import React, { useState, useEffect } from "react";

import { Route, Switch } from "react-router-dom";
import { final } from "./web3Components/config";
import "./App.css";
import { ethers } from "ethers";
// import { useAccount, useSigner } from "@web3modal/react";

import LaunchPass from "./components/LaunchPass/LaunchPass";
import MintStake from "./components/MintStake/MintStake";
import Claim from "./components/Claim/Claim";
import Discount from "./components/Discount/Discount";

function App() {
  // const { data } = useSigner();
  // const { account } = useAccount();
  const [addr, setAddr] = useState("");
  const [nautContract, setNautContract] = useState(null);
  const [freeContract, setFreeContract] = useState({
    alpha: null,
    moose: null,
  });

  useEffect(() => {
    const run = async () => {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Create a provider and signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const data = provider.getSigner();
      const address = await data.getAddress();
      setAddr(() => address);

      const contract = new ethers.Contract(
        final.passContractAddress,
        final.ABI,
        data
      );
      const mc1 = new ethers.Contract(
        final.mooseSocietyAddress,
        final.balance,
        data
      );
      const ac2 = new ethers.Contract(
        final.alphaHerdAddress,
        final.balance,
        data
      );

      setFreeContract((curr) => {
        return { ...curr, moose: mc1, alpha: ac2 };
      });
      setNautContract(() => contract);
    };

    run();
  }, []);

  return (
    <Switch>
      <Route
        exact
        path="/launchpass"
        component={() => (
          <LaunchPass nautContract={nautContract} account={addr} />
        )}
      />
      <Route
        exact
        path="/mintstake"
        component={() => (
          <MintStake nautContract={nautContract} account={addr} />
        )}
      />{" "}
      <Route
        exact
        path="/discountmint"
        component={() => (
          <Discount nautContract={nautContract} account={addr} />
        )}
      />
      <Route
        exact
        path="/claim"
        component={() => (
          <Claim
            nautContract={nautContract}
            freeContract={freeContract}
            account={addr}
          />
        )}
      />
    </Switch>
  );
}

export default App;
