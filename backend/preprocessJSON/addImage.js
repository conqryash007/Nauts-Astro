const fs = require("fs");

const data = fs.readFileSync("./originalMetadata.json");
const json = JSON.parse(data);

for (let i = 0; i < 1969; i++) {
  json.collection[
    i
  ].image = `https://gateway.pinata.cloud/ipfs/QmaQu8cSuEH1kVmZ2FsNThM6teRaKy867ZsddfBqGUBym4/${
    i + 1
  }.webp`;

  json.collection[i].name = `Astro-NAUT #${i + 1}`;
}

fs.writeFileSync("./mod1.json", JSON.stringify(json), "utf-8");
