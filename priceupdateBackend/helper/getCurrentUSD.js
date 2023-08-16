const { final } = require("./config");
const ethers = require("ethers");
const { default: axios } = require("axios");

const getCurrentUSD = async () => {
  try {
    // mainnet
    // const provider = new ethers.providers.InfuraProvider(
    //   final.network,
    //   final.infuraKey
    // );

    // testnet
    const provider = new ethers.providers.JsonRpcProvider(
      "https://polygon-mumbai.g.alchemy.com/v2/4UA7f8bHykMEEFhQrzD5ywYgN3y9bxJB"
    );

    const nauts = new ethers.Contract(
      final.contractAddress,
      final.ABI,
      provider
    );

    const nftPriceWei = await nauts.NFTprice();
    const nftPrice = Number(ethers.utils.formatEther(nftPriceWei));

    let currPrice = await axios.get(
      "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
    );
    currPrice = currPrice?.data?.USD;

    const nftUSD = currPrice * nftPrice;

    return { nftUSD, currPrice };
  } catch (err) {
    throw new Error(err?.message || "Something Went Wrong");
  }
};

module.exports = { getCurrentUSD };
