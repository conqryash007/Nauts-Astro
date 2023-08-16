const ABI = require("./artifacts/ReignABI");

// a44bbee405dd4b29afb8874b2c7975ff

const contractAddress = "0x33299E27b7f7caB765d048fA9A1E8Dfeb499C550";
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
