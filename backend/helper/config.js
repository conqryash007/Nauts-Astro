const ABI = require("./artifacts/ReignABI");

// a44bbee405dd4b29afb8874b2c7975ff

const contractAddress = "0x508e863F8F3be3fA1a863CB4aAC0E45f0A45B217";
const infuraKey = "87bc7c0247e74875a0fc496ed197f24c";
const network = "homestead";
// const network = "goerli";

// const privateKey =
//   "08848e865c6f07e43abf9b6e4ce3dd7364e9d1be450d4d18ef2b558ab8f9b525";
// const network = "rinkeby";

const final = {
  ABI,
  contractAddress,
  network,
  infuraKey,
};

module.exports = { final };
