import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import FormControlLabel from "@mui/material/FormControlLabel";

//
import FullWidthTabs from "./TabPanel";
import "./card.css";
import LinearProgress from "@mui/material/LinearProgress";
import { ReactComponent as YourSvg } from "./../../../assets/Preloader.svg";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ethers } from "ethers";

import a1 from "./../../../assets/a1.png";
import a4 from "./../../../assets/a4.png";
import a3 from "./../../../assets/a3.png";
import a5 from "./../../../assets/a5.png";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    action: {
      disabledBackground: "rgb(4, 27, 114,0.5)",
      disabled: "rgb(169, 181, 250,0.5)",
    },
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

export default function NautCard({
  banner1,
  banner2,
  mintNauts,
  displayInfo,
  loading,
  nautStakeMint,
  nautContract,
  percentage,
  setNautStakeMint,
  calculateTeams,
  setUserNautInfo,
  isPilot,
  nautPrice,
}) {
  const [progress, setProgress] = React.useState(0);
  const [prog2, setProg2] = React.useState(0);
  const [mintNum, setMintNum] = React.useState(1);
  const [maxProg, setMaxProg] = React.useState({ card1: 0, card2: 0 });

  let x = 0.1;
  const run1 = (val1) => {
    if (Math.floor(x) === val1) return 0;
    setProgress(() => x);
    x++;
    run1(val1);
  };
  let y = 0.1;
  const run2 = (val) => {
    if (Math.floor(y) === val) return 0;
    setProg2(() => y);
    y++;
    run2(val);
  };
  React.useEffect(() => {
    const val1 = Math.floor((displayInfo.totalSupply * 100) / 1968);
    const val2 =
      Math.floor(
        (displayInfo.nautsStaked * 100) /
          (displayInfo.nautsMinted + displayInfo.nautsStaked)
      ) || 0;
    setMaxProg((curr) => {
      return {
        ...curr,
        card1: val1,
        card2: val2,
      };
    });
    if (val1 > 0) {
      run1(val1);
    }
    if (val2 > 0) {
      run2(val2);
    }
  }, [
    displayInfo.nautsStaked,
    displayInfo.nautsMinted,
    displayInfo.totalSupply,
  ]);

  // ui
  const [offset, setOffset] = React.useState(0);
  const [up, setUp] = React.useState({ one: false, two: false });

  React.useEffect(() => {
    const onScroll = () => {
      return setOffset(window.pageYOffset);
    };
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (offset > 200) {
    if (up.one === false) {
      setUp((curr) => {
        return { ...curr, one: true };
      });
    }
  }
  if (offset > 600) {
    if (up.two === false) {
      setUp((curr) => {
        return { ...curr, two: true };
      });
    }
  }

  console.log(offset);

  return (
    <div>
      <div className="pop-naut1">
        <h1 className="bold-tt">MINTING</h1>
        <Box>
          <Box>
            <Slide
              direction="up"
              in={up.one}
              timeout={1000}
              mountOnEnter
              unmountOnExit
            >
              <div>
                <img src={a1} alt="" />
                <img src={a4} alt="" />
              </div>
            </Slide>
          </Box>
        </Box>
      </div>
      <Card sx={{ borderRadius: "20px", zIndex: 2, position: "relative" }}>
        {/* <CardMedia
          component="img"
          height="140"
          image={banner1}
          alt="green iguana"
        /> */}
        <CardContent sx={{ backgroundColor: "#1E2835", paddingTop: "30px" }}>
          <div className="left">
            <p className="bold">NAUTS Minted</p>
            <p className="bold">{`${maxProg.card1}%`}</p>
          </div>
          <ThemeProvider theme={theme}>
            <LinearProgress
              sx={{ height: "10px", borderRadius: "5px", textAlign: "center" }}
              variant="determinate"
              value={progress}
              color="success"
            />
          </ThemeProvider>
        </CardContent>
        <div className="cardbottom">
          <div className="bottom-cont">
            <div>
              <h1>Valuation</h1>
              <h2>200K</h2>
            </div>
            <Divider color="grey" orientation="vertical" flexItem />
            <div>
              <h1>Available</h1>
              <h2>{1968 - displayInfo.totalSupply} / 1969</h2>
            </div>
            <Divider color="grey" orientation="vertical" flexItem />
            <div>
              <h1>Dynamic Mint Price</h1>
              <h2>
                {nautPrice ? ethers.utils.formatEther(String(nautPrice)) : 0.0}{" "}
                eth
              </h2>
            </div>
          </div>
          <div className="quant-cont">
            <h1 className="qun">Quantity</h1>
            <Select
              label="Quantity"
              fullWidth
              sx={{ width: "auto", backgroundColor: "white" }}
              value={mintNum}
              onChange={(e) => {
                setMintNum(e.target.value);
              }}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
            <ThemeProvider theme={theme}>
              <Button
                sx={{ marginTop: "30px", width: "150px", fontWeight: "bolder" }}
                variant="contained"
                color="success"
                onClick={() => mintNauts(mintNum)}
                disabled={loading}
              >
                Mint A Naut
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </Card>
      <div className="pop-naut2" style={{ marginTop: "100px" }}>
        <Box>
          <Box>
            <Slide
              direction="up"
              in={up.two}
              timeout={1000}
              mountOnEnter
              unmountOnExit
            >
              <div>
                <img src={a3} alt="" />
                <img src={a5} alt="" />
              </div>
            </Slide>
          </Box>
        </Box>
        <h1 className="bold-tt">STAKING</h1>
      </div>
      <Card
        sx={{ borderRadius: "30px 30px 0 0", zIndex: 2, position: "relative" }}
      >
        {/* <CardMedia
          component="img"
          height="140"
          image={banner2}
          alt="green iguana"
        /> */}

        <CardContent sx={{ backgroundColor: "#1E2835", paddingTop: "30px" }}>
          <div className="left">
            <p className="bold">NAUTS STAKED VS NAUTS MINTED</p>
            <p className="bold">{maxProg.card2}%</p>
          </div>
          <ThemeProvider theme={theme}>
            <LinearProgress
              sx={{ height: "10px", borderRadius: "5px", textAlign: "center" }}
              variant="determinate"
              value={prog2}
              color="success"
            />
          </ThemeProvider>
          {loading ? (
            <>
              <YourSvg className="ld-num" />
            </>
          ) : (
            ""
          )}
        </CardContent>
        <div className="cardbottom2">
          <div className="bottom-cont2">
            <div className="sub-cont2">
              <div>
                <h1>$ 0.00</h1>
                <h2>Current Rewards</h2>
                <ThemeProvider theme={theme}>
                  <Button
                    sx={{
                      marginTop: "30px",
                      width: "250px",
                      fontWeight: "bolder",
                    }}
                    variant="contained"
                    color="success"
                    disabled={true}
                  >
                    Claim Reward
                  </Button>
                </ThemeProvider>
              </div>
              <Divider color="grey" orientation="vertical" flexItem />
              <div>
                <h1>
                  {Math.round(displayInfo.ownerPercentage * 1000) / 1000} %
                </h1>
                <h2>Ownership Percentage</h2>
              </div>
            </div>
            <div className="sub-cont2">
              <div>
                <h1>{displayInfo.nautsMinted + displayInfo.nautsStaked}</h1>
                <h2>NAUTS Owned</h2>
              </div>
              <Divider color="grey" orientation="vertical" flexItem />
              <div>
                <h1>{displayInfo.nautsStaked}</h1>
                <h2>NAUTS Staked</h2>
              </div>
              <Divider color="grey" orientation="vertical" flexItem />
              <div>
                <h1>$ 0.00</h1>
                <h2>YTD Rewards</h2>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <FullWidthTabs
        nautStakeMint={nautStakeMint}
        nautContract={nautContract}
        loading={loading}
        percentage={percentage}
        setNautStakeMint={setNautStakeMint}
        calculateTeams={calculateTeams}
        setUserNautInfo={setUserNautInfo}
        isPilot={isPilot}
      />
    </div>
  );
}
