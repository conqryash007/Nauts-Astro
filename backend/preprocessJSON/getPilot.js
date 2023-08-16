const fs = require("fs");

const json = fs.readFileSync("./mod1.json");
const data = JSON.parse(json);

const obj = {};
for (let i = 0; i < 1969; i++) {
  if (data.collection[i].attributes[1].trait_type !== "Co-Pilot Bodies") {
    obj[i + 1] = true;
  }
}

console.log(Object.keys(obj).length);
fs.writeFileSync("./pilot.json", JSON.stringify(obj), "utf-8");
