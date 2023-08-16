const ABI = require("./artifacts/ReignABI");

const contractAddress = "0x33299E27b7f7caB765d048fA9A1E8Dfeb499C550";

const infuraKey = "a44bbee405dd4b29afb8874b2c7975ff";

const privateKey =
  "da72fd15155fcba871c9988affacf312d8e8afbf3fd03b1f32e386242e38e56a";

// const network = "homestead";
// const network = "rinkeby";
const network = "goerli";

const final = {
  ABI,
  contractAddress,
  infuraKey,
  privateKey,
  network,
};

module.exports = { final };
