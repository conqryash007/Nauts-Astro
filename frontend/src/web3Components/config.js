import { ABI, balance } from "./artifacts/PassABI";

// const network = { name: "homestead", chainId: 1 };
// const network = { name: "rinkeby", chainId: 4 };
// const network = { name: "goerli", chainId: 5 };
const network = { name: "mumbai", chainId: 80001 };
const url = "http://54.199.240.37";

let passContractAddress;
let mooseSocietyAddress;
let alphaHerdAddress;

if (network.name === "rinkeby") {
  passContractAddress = "";
} else if (network.name === "homestead") {
  passContractAddress = "";
} else if (network.name === "goerli") {
  passContractAddress = "0x9312B1b2436208bb1227DD48a7824cCe1F3C67a5";
  mooseSocietyAddress = "";
  alphaHerdAddress = "";
} else if (network.name === "mumbai") {
  passContractAddress = "0x33299E27b7f7caB765d048fA9A1E8Dfeb499C550";
  mooseSocietyAddress = "0xC0485b2005a6840180937A7cc6b89BBed2281b94";
  alphaHerdAddress = "0x91133E3BB20a9183eED2c9cf8DaD28D2d268BACb";
}

const final = {
  ABI: ABI,
  balance,
  passContractAddress,
  mooseSocietyAddress,
  alphaHerdAddress,
  network: network,
  url,
};

export { final };
