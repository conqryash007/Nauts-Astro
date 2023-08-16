import React, { useEffect, useState } from "react";

import Navbar from "../Navbar/Navbar";
import Footer from "./../Footer/Footer";
import NautCard from "./subComponent/NautCard";
import "./MintStake.css";
import { ToastContainer } from "react-toastify";

import an from "./../../assets/an.png";
import mintImg from "./../../assets/mint.png";
import stakeImg from "./../../assets/stake.png";

import { notifySuccess, notifyInfo, notifyError } from "./../notification";
import axios from "axios";

const percentage = {
  pilot: 0.0934,
  colPilot: 0.0467,
  team: 0.21015,
};

const MintStake = ({ nautContract, account }) => {
  const [nautPrice, setNautPrice] = useState(null);
  const [userNautInfo, setUserNautInfo] = useState({
    nautsMinted: 0, // number of nauts minted
    nautsStaked: 0, // number of staked nfts
    totalSupply: 0, // total nauts minted
    ownerPercentage: 0, // ownership percentage
  });

  const [nautStakeMint, setNautStakeMint] = useState({
    mintedNautIds: [],
    stakedNautIds: [],
    teamsIds: [],
    pilotIds: [],
  });
  const [loading, setLoading] = useState(false);

  const isPilot = async (_id) => {
    const data = await axios.post(
      `${process.env.REACT_APP_production_url}/api/nauts/ispilot`,
      { naughtIds: _id }
    );
    const result = data.data;
    console.log(result);

    if (result.ok === true) {
      return result.pilotData;
    } else {
      throw new Error("Something went wrong");
    }
  };

  // @notice calcs team, ownerpercentage
  const calculateTeams = async (stkIds, pilotIds) => {
    // separate pilot and copilot

    const pilot = [];
    const copilot = [];

    for (let i = 0; i < stkIds.length; i++) {
      console.log(stkIds[i], stkIds[i] in pilotIds);
      if (stkIds[i] in pilotIds) {
        pilot.push(stkIds[i]);
      } else {
        copilot.push(stkIds[i]);
      }
    }
    console.log(pilot, copilot);

    // club 1-1 pilot and co-pilot in one 2d array
    const team = [];
    const sm = Math.min(pilot.length, copilot.length);
    for (let i = 0; i < sm; i++) {
      team.push([pilot[i], copilot[i]]);
    }
    console.log(team);

    setNautStakeMint((curr) => {
      return { ...curr, teamsIds: team };
    });

    // calculate the percentage owned
    const teamNum = Number(team.length);
    const pilotNum = Math.abs(pilot.length - team.length);
    const copilotNum = Math.abs(copilot.length - team.length);

    const ownerPerc =
      teamNum * percentage.team +
      pilotNum * percentage.pilot +
      copilotNum * percentage.colPilot;

    // console.log(teamNum, pilotNum, copilotNum, ownerPerc);
    setUserNautInfo((curr) => {
      return { ...curr, ownerPercentage: ownerPerc };
    });
  };

  // @notice calculates pilot ids
  // @notice sets the pilot ids
  // @returns pilot ids
  const calcPilotIds = async (ids) => {
    const obj = await isPilot(ids);

    setNautStakeMint((curr) => {
      return { ...curr, pilotIds: obj };
    });
    console.log(obj);
    return obj;
  };

  useEffect(() => {
    console.log(nautContract);
    const run = async () => {
      setLoading(true);
      // 1. price fetch
      try {
        let prc = await nautContract.NFTprice();
        setNautPrice(() => parseInt(prc._hex));
      } catch (err) {
        console.log("1. Error fetching price", err);
      }

      // 3. total nauts minted
      let totalMinted = 0;
      try {
        let x = await nautContract.totalSupply();
        totalMinted = parseInt(x._hex);
        setUserNautInfo((curr) => {
          return { ...curr, totalSupply: totalMinted };
        });
        console.log(totalMinted);
      } catch (err) {
        console.log("3. Error in total nauts minted", err);
      }

      // 5. get array all NFTs staked+minted for owner
      let userAllIds = [];
      let i = 0;
      while (1) {
        try {
          let idx = await nautContract.tokenOfOwnerByIndex(account, i);
          i++;
          userAllIds.push(parseInt(idx._hex));
        } catch {
          break;
        }
      }
      console.log(userAllIds);

      // calculate all pilot ids
      const pIds = await calcPilotIds(userAllIds);
      console.log("----", pIds);

      // ---
      const st = Date.now();
      // 6. get staked ids
      let stakedids = [];
      let mintedIds = [];
      try {
        for (let i = 0; i < userAllIds.length; i++) {
          const dum = userAllIds[i];
          const res = await nautContract.StakedNFT(account, dum);
          if (res) {
            stakedids.push(dum);
          } else {
            mintedIds.push(dum);
          }
        }
        setUserNautInfo((curr) => {
          return {
            ...curr,
            nautsStaked: stakedids.length,
            nautsMinted: mintedIds.length,
          };
        });

        await calculateTeams(stakedids, pIds);

        setNautStakeMint((curr) => {
          return {
            ...curr,
            mintedNautIds: mintedIds,
            stakedNautIds: stakedids,
          };
        });
      } catch (err) {
        console.log("6. Error", err);
      }
      const fn = Date.now();

      console.log("-=-==-", fn - st);

      setLoading(false);
    };

    nautContract && run();
  }, [account, nautContract]);

  const mintNauts = async (nauts) => {
    setLoading(true);
    try {
      if (!nautPrice) {
        throw new Error("Invalid Price!");
      }
      const options = {
        value: nautPrice * nauts,
      };
      console.log(account, options);
      notifyInfo("Your Transaction Has Started");
      const transaction = await nautContract.MintInvestorNFTs(
        account,
        nauts,
        options
      );
      await transaction.wait();
      notifySuccess(`You have successfully minted ${nauts} Nauts`);

      window.location.reload();
    } catch (err) {
      console.log(err.message);
      if (err?.message.includes("user rejected transaction")) {
        notifyError("User Rejected the transaction");
      } else {
        notifyError("Something went wrong!");
      }
    }
    setLoading(false);
  };
  console.log(userNautInfo, nautStakeMint);

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
      <div className="main1">
        <Navbar />
        <img className="an" src={an} alt="nauts" />
        <h2 className="top-txt">Minting & Staking</h2>
        <div className="main-container">
          <NautCard
            banner1={mintImg}
            banner2={stakeImg}
            mintNauts={mintNauts}
            displayInfo={userNautInfo}
            loading={loading}
            nautStakeMint={nautStakeMint}
            nautContract={nautContract}
            percentage={percentage}
            setNautStakeMint={setNautStakeMint}
            calculateTeams={calculateTeams}
            setUserNautInfo={setUserNautInfo}
            isPilot={isPilot}
            nautPrice={nautPrice}
          ></NautCard>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MintStake;
