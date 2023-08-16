import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { notifySuccess, notifyInfo, notifyError } from "./../../notification";
import { calcGas } from "../../calcgas";

import support from "./../../../assets/tm.png";
import { ReactComponent as YourSvg } from "./../../../assets/Preloader.svg";

// -------------------------

const theme1 = createTheme({
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
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, backgroundColor: "#1E2835" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
// -------------------------

export default function FullWidthTabs({
  nautStakeMint,
  setNautStakeMint,
  nautContract,
  loading,
  percentage,
  calculateTeams,
  setUserNautInfo,
}) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const [mintNautIds, setMintNautIds] = React.useState([]); // selected mint nfts
  const [stakeNautIds, setStakeNautIds] = React.useState([]); // slected staked nfts
  const [teamNautIds, setTeamNautIds] = React.useState([]); // selected team nfts

  const [lding, setLding] = React.useState(false);

  // -----------------------
  // UI SELECTOR AND DISPLAY
  const setNautIds = (type, id) => {
    if (type === "mint") {
      setMintNautIds((curr) => {
        if (curr.includes(id)) {
          return curr.filter((x) => x !== id);
        } else {
          return [...curr, id];
        }
      });
    } else if (type === "stake") {
      setStakeNautIds((curr) => {
        if (curr.includes(id)) {
          return curr.filter((x) => x !== id);
        } else {
          return [...curr, id];
        }
      });
    } else if (type === "team") {
      setTeamNautIds((curr) => {
        if (curr.includes(id)) {
          return curr.filter((x) => x !== id);
        } else {
          return [...curr, id];
        }
      });
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  // ----------------------
  // GET ELEMENTS
  function imageElementMint(_id) {
    return (
      <>
        <img
          className={
            _id in nautStakeMint.pilotIds ? "naut-img pil" : "naut-img"
          }
          src={getImageURL(_id)}
          alt="nauts"
        />
        <span
          className={
            _id in nautStakeMint.pilotIds ? "nft-desc grn" : "nft-desc"
          }
        >
          <span>
            {/* {nautStakeMint.pilotIds.includes(_id) */}
            {_id in nautStakeMint.pilotIds
              ? `Pilot #${_id}`
              : `Co-Pilot #${_id}`}
          </span>
          <span>Earns 0.00 %</span>
        </span>
      </>
    );
  }
  function imageElement(_id) {
    const teamFlat = nautStakeMint.teamsIds.flat();
    return (
      <>
        <img
          className={
            _id in nautStakeMint.pilotIds ? "naut-img pil" : "naut-img"
          }
          src={getImageURL(_id)}
          alt="nauts"
        />
        <span
          className={
            _id in nautStakeMint.pilotIds ? "nft-desc grn" : "nft-desc"
          }
        >
          <span>
            {/* {nautStakeMint.pilotIds.includes(_id) */}
            {_id in nautStakeMint.pilotIds
              ? `Pilot #${_id}`
              : `Co-Pilot #${_id}`}
          </span>
          <span>
            Earns{" "}
            {teamFlat.includes(_id)
              ? "0.00"
              : // : nautStakeMint.pilotIds.includes(_id)
              _id in nautStakeMint.pilotIds
              ? percentage.pilot
              : percentage.colPilot}
            %
          </span>
          <span>{teamFlat.includes(_id) ? "(Team)" : ""}</span>
        </span>
      </>
    );
  }
  const getTeamElement = (arr, i) => {
    return (
      <span
        key={i}
        onClick={() => setNautIds("team", arr)}
        className={
          teamNautIds.includes(arr)
            ? "team-group naut-hover selected"
            : "team-group naut-hover"
        }
      >
        <span>
          <img
            className={
              arr[0] in nautStakeMint.pilotIds ? "naut-img pil" : "naut-img"
            }
            src={getImageURL(arr[0])}
            alt=""
          />
          <img src={support} className="supp" alt="" />
          <img
            className={
              arr[1] in nautStakeMint.pilotIds ? "naut-img pil" : "naut-img"
            }
            src={getImageURL(arr[1])}
            alt=""
          />
        </span>
        <span className="nft-desc2">
          Team #{arr[0]} & #{arr[1]} <br /> Earns {percentage.team} %
        </span>
      </span>
    );
  };
  const getLoading = (arr, idx) => {
    let text = "";
    if (idx === 1) {
      text = "No NFTs Found! Try to mint some Naut NFTs";
    } else if (idx === 2) {
      text = "No NFTs Found! Try to stake some minted NFTs";
    } else {
      text = "No NFTs Found! Try to stake some minted NFTs";
    }
    try {
      if (loading) {
        return (
          <>
            <span>
              <YourSvg className="svg" />
            </span>
          </>
        );
      } else if (!loading && arr.length === 0) {
        return (
          <>
            <span className="nf">{text}</span>
          </>
        );
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  //-----------------
  // HELPER NFT FUNCTION

  const getNewTeamArray = (stkIds, mintIds) => {
    const pilot = [];
    const copilot = [];

    for (let i = 0; i < stkIds.length; i++) {
      // if (nautStakeMint.pilotIds.includes(stkIds[i])) {
      if (stkIds[i] in nautStakeMint.pilotIds) {
        pilot.push(stkIds[i]);
      } else {
        copilot.push(stkIds[i]);
      }
    }
    // club 1-1 pilot and co-pilot in one 2d array
    const team = [];
    const sm = Math.min(pilot.length, copilot.length);
    for (let i = 0; i < sm; i++) {
      team.push([pilot[i], copilot[i]]);
    }

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
      return {
        ...curr,
        ownerPercentage: ownerPerc,
        nautsMinted: mintIds.length,
        nautsStaked: stkIds.length,
      };
    });

    return team;
  };

  const updatePage = (newId, type) => {
    let newMintNauts;
    let newStakeNauts;
    let newTeams;

    if (type === "mint") {
      newMintNauts = nautStakeMint.mintedNautIds.filter((curr) => {
        return !newId.includes(curr);
      });
      newStakeNauts = [...nautStakeMint.stakedNautIds, ...newId];
      newTeams = getNewTeamArray(newStakeNauts, newMintNauts);
    } else if (type === "stake") {
      newMintNauts = [...newId, ...nautStakeMint.mintedNautIds];
      newStakeNauts = nautStakeMint.stakedNautIds.filter((curr) => {
        return !newId.includes(curr);
      });
      newTeams = getNewTeamArray(newStakeNauts, newMintNauts);
    }

    setNautStakeMint((curr) => {
      return {
        ...curr,
        teamsIds: newTeams,
        stakedNautIds: newStakeNauts,
        mintedNautIds: newMintNauts,
      };
    });
  };

  const getImageURL = (_id) => {
    return `https://ipfs.io/ipfs/QmVY5DmBVFnGJCGS6gGmZ2xkhmky9jTF5cTH64C5L49JQj/(${_id}).png`;
  };

  const resetNautIds = () => {
    setMintNautIds([]);
    setStakeNautIds([]);
    setTeamNautIds([]);
  };

  // -----------------
  // stake NFTs
  const stakeNfts = async () => {
    setLding(true);
    try {
      if (!mintNautIds) {
        throw new Error("Select valid");
      }
      if (mintNautIds.length === 0) {
        throw new Error("Select valid");
      }
      console.log(mintNautIds);
      notifyInfo("Your Transaction Has Started");

      // remove
      const est = await nautContract.estimateGas.stakeInvestorNFT(mintNautIds);
      const gas = await calcGas(est);

      const transaction = await nautContract.stakeInvestorNFT(mintNautIds, gas);
      await transaction.wait();
      notifySuccess(`You have successfully staked your Nauts`);
      resetNautIds();

      updatePage(mintNautIds, "mint");
    } catch (err) {
      console.log(err);
      if (err?.message.includes("Not the Owner of this tokenID")) {
        notifyError("Not the Owner of this tokenID");
      } else if (err?.message.includes("Select valid")) {
        notifyError("Select a valid NFT to stake");
      } else {
        notifyError("Something went wrong!");
      }
    }
    setLding(false);
  };

  // -----------------
  // un-stake team NFTs
  const unstakeNFTs = async () => {
    setLding(true);
    try {
      if (!stakeNautIds) {
        throw new Error("Select valid");
      }
      if (stakeNautIds.length === 0) {
        throw new Error("Select valid");
      }
      console.log(stakeNautIds);
      notifyInfo("Your Transaction Has Started");

      // remove
      const est = await nautContract.estimateGas.unstakeInvestorNFT(
        stakeNautIds
      );
      const gas = await calcGas(est);
      // ---

      const transaction = await nautContract.unstakeInvestorNFT(
        stakeNautIds,
        gas
      );
      await transaction.wait();
      notifySuccess(`You have successfully un-staked your Nauts`);
      resetNautIds();

      updatePage(stakeNautIds, "stake");
    } catch (err) {
      console.log(err);
      if (err?.message.includes("TokenID not staked")) {
        notifyError("This token is not staked");
      } else if (err?.message.includes("Select valid")) {
        notifyError("Select a valid Team NFT to unstake");
      } else {
        notifyError("Something went wrong!");
      }
    }
    setLding(false);
  };

  // -----------------
  // un-stake team NFTs
  const unstakeTeamNFTs = async () => {
    setLding(true);
    try {
      const selectedIds = teamNautIds.flat();
      // check if selectedIds are valid
      if (!selectedIds) {
        throw new Error("Select valid");
      }
      if (selectedIds.length === 0) {
        throw new Error("Select valid");
      }

      notifyInfo("Your Transaction Has Started");

      // remove
      const est = await nautContract.estimateGas.unstakeInvestorNFT(
        selectedIds
      );
      const gas = await calcGas(est);
      // ---

      const transaction = await nautContract.unstakeInvestorNFT(
        selectedIds,
        gas
      );
      await transaction.wait();
      notifySuccess(`You have successfully un-staked your Teams`);
      resetNautIds();

      updatePage(selectedIds, "stake");
    } catch (err) {
      console.log(err);
      if (err?.message.includes("TokenID not staked")) {
        notifyError("This token is not staked");
      } else if (err?.message.includes("Select valid")) {
        notifyError("Select a valid Team NFT to unstake");
      } else {
        notifyError("Something went wrong!");
      }
    }
    setLding(false);
  };

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <AppBar
        sx={{ backgroundColor: "#233743", padding: "20px" }}
        position="static"
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="MINTED" {...a11yProps(0)} />
          <Tab label="STAKED SINGLE" {...a11yProps(1)} />
          <Tab
            label={`TEAMS (${nautStakeMint.teamsIds.length})`}
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel
          style={Object.assign({
            background: "#1E2835",
          })}
          value={value}
          index={0}
          dir={theme.direction}
        >
          <span>
            <span className="swipe-txt">
              <span className="bld">STAKE MINTED NAUTS</span>
              <span
                onClick={() => {
                  setMintNautIds((curr) => {
                    if (curr.length === nautStakeMint.mintedNautIds.length) {
                      return [];
                    } else {
                      return [...nautStakeMint.mintedNautIds];
                    }
                  });
                }}
              >
                SELECT ALL
              </span>
            </span>
            {getLoading(nautStakeMint.mintedNautIds, 1)}
            <span className="selector">
              {nautStakeMint.mintedNautIds.map((curr, i) => {
                return (
                  <span
                    onClick={() => setNautIds("mint", curr)}
                    className={
                      mintNautIds.includes(curr)
                        ? "naut-hover selected"
                        : "naut-hover"
                    }
                    key={i}
                  >
                    {imageElementMint(curr)}
                  </span>
                );
              })}
            </span>
            <span style={{ textAlign: "center", display: "block" }}>
              <ThemeProvider theme={theme1}>
                <Button
                  sx={{
                    marginTop: "30px",
                    width: "250px",
                    fontWeight: "bolder",
                  }}
                  disabled={loading || lding}
                  variant="contained"
                  color="success"
                  onClick={stakeNfts}
                >
                  STAKE SELECTED NAUTS
                </Button>
              </ThemeProvider>
            </span>
          </span>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <span>
            <span className="swipe-txt">
              <span className="bld">UN-STAKE SINGLE NAUT</span>
              <span
                onClick={() => {
                  setStakeNautIds((curr) => {
                    if (curr.length === nautStakeMint.stakedNautIds.length) {
                      return [];
                    } else {
                      return [...nautStakeMint.stakedNautIds];
                    }
                  });
                }}
              >
                SELECT ALL
              </span>
            </span>
            {getLoading(nautStakeMint.stakedNautIds, 2)}
            <span className="selector">
              {nautStakeMint.stakedNautIds.map((curr, i) => {
                return (
                  <span
                    onClick={() => setNautIds("stake", curr)}
                    className={
                      stakeNautIds.includes(curr)
                        ? "naut-hover selected"
                        : "naut-hover"
                    }
                    key={i}
                  >
                    {imageElement(curr)}
                  </span>
                );
              })}
            </span>
            <span style={{ textAlign: "center", display: "block" }}>
              <ThemeProvider theme={theme1}>
                <Button
                  sx={{
                    marginTop: "30px",
                    width: "250px",
                    fontWeight: "bolder",
                  }}
                  variant="contained"
                  color="success"
                  disabled={loading || lding}
                  onClick={unstakeNFTs}
                >
                  UN-STAKE SELECTED NAUTS
                </Button>
              </ThemeProvider>
            </span>
          </span>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <span>
            <span className="swipe-txt">
              <span className="bld">UN-STAKE NAUTS TEAM</span>
              <span
                className="swipe-txt"
                onClick={() => {
                  setTeamNautIds((curr) => {
                    if (curr.length === nautStakeMint.teamsIds.length) {
                      return [];
                    } else {
                      return [...nautStakeMint.teamsIds];
                    }
                  });
                }}
              >
                SELECT ALL
              </span>
            </span>
            <span style={{ display: "block" }}>
              {getLoading(nautStakeMint.teamsIds, 3)}
            </span>
            <span className="team-img">
              {nautStakeMint.teamsIds.map((curr, i) => {
                return (
                  <span className="team-ele" key={i}>
                    {getTeamElement(curr, i)}
                  </span>
                );
              })}
            </span>
            <span style={{ textAlign: "center", display: "block" }}>
              <ThemeProvider theme={theme1}>
                <Button
                  sx={{
                    marginTop: "30px",
                    width: "250px",
                    fontWeight: "bolder",
                  }}
                  variant="contained"
                  color="success"
                  disabled={loading || lding}
                  onClick={unstakeTeamNFTs}
                >
                  UN-STAKE SELECTED TEAMS
                </Button>
              </ThemeProvider>
            </span>
          </span>
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
