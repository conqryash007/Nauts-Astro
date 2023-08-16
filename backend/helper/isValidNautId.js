const { final } = require("./config");
const ethers = require("ethers");

const isValidNautId = async (_id) => {
  try {
    const provider = new ethers.providers.InfuraProvider(
      final.network,
      final.infuraKey
    );

    const reignContract = new ethers.Contract(
      final.contractAddress,
      final.ABI,
      provider
    );

    let totalSupply = await reignContract.totalSupply();
    totalSupply = parseInt(totalSupply._hex);

    return totalSupply;
  } catch (err) {
    console.error(err);
    throw new Error(err?.message || "Something Went Wrong");
  }
};

module.exports = { isValidNautId };
