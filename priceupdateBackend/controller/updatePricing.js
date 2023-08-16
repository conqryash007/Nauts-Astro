const axios = require("axios");
const { ethers } = require("ethers");

const { updateContractPrices } = require("./../helper/updateContractPrice");
const { getCurrentUSD } = require("./../helper/getCurrentUSD");

const setPriceNaut = 100;
const setDiscPriceNaut = 80;

const updatePrice = async (req, res) => {
  try {
    // TIMER FOR WAITING GIVEN SECONDS
    const wait = async (sec) => {
      const ms = sec * 1000;
      await new Promise((resolve) => setTimeout(resolve, ms));
    };

    while (1) {
      try {
        // get current USD prices of NFTs from contract
        const { nftUSD, currPrice } = await getCurrentUSD();

        // calculate % deviation
        const percDev = (Math.abs(nftUSD - setPriceNaut) / setPriceNaut) * 100;

        console.log("^^^^^^^^^");
        console.log(
          "nft_usd",
          nftUSD,
          "curr_ETH/USD",
          currPrice,
          "perc",
          percDev,
          "%"
        );

        if (percDev > 10) {
          let newNautPriceETH = setPriceNaut / currPrice;
          let newDiscPriceETH = setDiscPriceNaut / currPrice;

          await updateContractPrices(newNautPriceETH, newDiscPriceETH);
        }

        await wait(30);
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

updatePrice(1, 1);

module.exports = { updatePrice };
