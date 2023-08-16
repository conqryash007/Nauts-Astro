const { final } = require("./config");
const ethers = require("ethers");

const updateContractPrices = async (newPrice, newDiscPrice) => {
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

    const signer = new ethers.Wallet(final.privateKey, provider);

    const nauts = new ethers.Contract(final.contractAddress, final.ABI, signer);

    // naut price update
    const tx1 = await nauts.updtateNFTPice(
      false,
      ethers.utils.parseEther(String(newPrice))
    );
    await tx1.wait();

    // discount naut price update
    const tx2 = await nauts.updtateNFTPice(
      true,
      ethers.utils.parseEther(String(newDiscPrice))
    );

    await tx2.wait();
  } catch (err) {
    console.log(err);
    throw new Error(err?.message || "Something Went Wrong");
  }
};

module.exports = { updateContractPrices };
