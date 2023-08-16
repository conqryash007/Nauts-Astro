const { isValidNautId } = require("./../helper/isValidNautId");
const fs = require("fs");

exports.getNauts = async (req, res) => {
  try {
    let { id } = req.params;
    id = Number(id);

    const boolId = await isValidNautId(id);
    if (id > boolId || id <= 0) {
      return res
        .status(400)
        .json({ ok: false, message: "Invalid request! Id is not minted yet" });
    }

    let resData;
    try {
      let requiredJson;
      if (process.env.PRODUCTION === "true") {
        requiredJson = fs.readFileSync(
          `${__dirname}\/assets\/currentInUse.json`
        );
      } else {
        requiredJson = fs.readFileSync(
          `${__dirname}\\assets\\currentInUse.json`
        );
      }

      const requiredData = JSON.parse(requiredJson);

      resData = requiredData.collection[id - 1];
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ ok: false, message: "Cannot access json files" });
    }

    res.status(200).json(resData);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ ok: false, messsage: err?.message || "Something went wrong!" });
  }
};

// Pilot Ids Object
const piltIdObject = {
  13: true,
  45: true,
  46: true,
  70: true,
  146: true,
  155: true,
  173: true,
  196: true,
  242: true,
  245: true,
  261: true,
  300: true,
  301: true,
  317: true,
  368: true,
  410: true,
  431: true,
  488: true,
  539: true,
  575: true,
  588: true,
  591: true,
  627: true,
  654: true,
  659: true,
  679: true,
  697: true,
  726: true,
  738: true,
  786: true,
  862: true,
  968: true,
  972: true,
  980: true,
  998: true,
  1022: true,
  1061: true,
  1070: true,
  1099: true,
  1136: true,
  1213: true,
  1229: true,
  1251: true,
  1253: true,
  1260: true,
  1282: true,
  1291: true,
  1366: true,
  1391: true,
  1409: true,
  1442: true,
  1501: true,
  1531: true,
  1534: true,
  1549: true,
  1565: true,
  1585: true,
  1608: true,
  1615: true,
  1617: true,
  1633: true,
  1678: true,
  1707: true,
  1763: true,
  1769: true,
  1836: true,
  1912: true,
  1960: true,
  1961: true,
};

exports.isPilot = async (req, res) => {
  try {
    let { naughtIds } = req.body;

    const validLimit = await isValidNautId();

    for (let i = 0; i < naughtIds.length; i++) {
      if (naughtIds[i] > validLimit) {
        return res.status(400).json({
          ok: false,
          message: "Invalid request! Id is not minted yet",
        });
      }
    }

    let pilotData = {};
    try {
      for (let i = 0; i < naughtIds.length; i++) {
        if (naughtIds[i] in piltIdObject) {
          pilotData[naughtIds[i]] = true;
        }
      }
    } catch (err) {
      res.status(500).json({ ok: false, messsage: "Canoot read file" });
    }

    res.status(200).json({ ok: true, pilotData });
  } catch (err) {
    console.log(err);

    res
      .status(500)
      .json({ ok: false, messsage: err?.message || "Something went wrong!" });
  }
};

exports.getClaimStatus = (req, res) => {
  try {
    const { addr, proj } = req.params;

    let reqiredData;

    if (proj === "moose") {
      try {
        let requiredJson;

        if (process.env.PRODUCTION === "true") {
          requiredJson = fs.readFileSync(
            `${__dirname}\/ProjectAddress\/MooseAddressObject.json`
          );
        } else {
          requiredJson = fs.readFileSync(
            `${__dirname}\\ProjectAddress\\MooseAddressObject.json`
          );
        }
        reqiredData = JSON.parse(requiredJson);
      } catch (err) {
        return res
          .status(500)
          .json({ ok: false, message: "Cannot access json files" });
      }
    } else if (proj === "alpha") {
      let requiredJson;
      try {
        if (process.env.PRODUCTION === "true") {
          requiredJson = fs.readFileSync(
            `${__dirname}\/ProjectAddress\/AlphaAddressObject.json`
          );
        } else {
          requiredJson = fs.readFileSync(
            `${__dirname}\\ProjectAddress\\AlphaAddressObject.json`
          );
        }
        reqiredData = JSON.parse(requiredJson);
      } catch (err) {
        return res
          .status(500)
          .json({ ok: false, message: "Cannot access json files" });
      }
    } else {
      return res
        .status(404)
        .json({ ok: false, message: "Project not enlisted" });
    }

    if (typeof reqiredData[addr.toLowerCase()] !== "boolean") {
      return res.status(400).json({ ok: false, message: "Address not listed" });
    }

    const data = { ok: true, res: reqiredData[addr.toLowerCase()] };

    res.status(200).json(data);
  } catch (err) {
    res
      .status(500)
      .json({ ok: false, messsage: err?.message || "Something went wrong!" });
  }
};

exports.changeClaimStatus = (req, res) => {
  try {
    const { addr, proj } = req.params;

    let reqiredData;

    if (proj === "moose") {
      try {
        let requiredJson;

        if (process.env.PRODUCTION === "true") {
          requiredJson = fs.readFileSync(
            `${__dirname}\/ProjectAddress\/MooseAddressObject.json`
          );
        } else {
          requiredJson = fs.readFileSync(
            `${__dirname}\\ProjectAddress\\MooseAddressObject.json`
          );
        }
        reqiredData = JSON.parse(requiredJson);
      } catch (err) {
        return res
          .status(500)
          .json({ ok: false, message: "Cannot access json files" });
      }
    } else if (proj === "alpha") {
      let requiredJson;
      try {
        if (process.env.PRODUCTION === "true") {
          requiredJson = fs.readFileSync(
            `${__dirname}\/ProjectAddress\/AlphaAddressObject.json`
          );
        } else {
          requiredJson = fs.readFileSync(
            `${__dirname}\\ProjectAddress\\AlphaAddressObject.json`
          );
        }
        reqiredData = JSON.parse(requiredJson);
      } catch (err) {
        return res
          .status(500)
          .json({ ok: false, message: "Cannot access json files" });
      }
    } else {
      return res
        .status(404)
        .json({ ok: false, message: "Project not enlisted" });
    }

    console.log(typeof reqiredData[addr]);
    if (typeof reqiredData[addr] !== "boolean") {
      return res.status(400).json({ ok: false, message: "Address not listed" });
    } else if (reqiredData[addr] === true) {
      return res.status(400).json({ ok: false, message: "Already claimed" });
    } else {
      reqiredData[addr] = true;

      try {
        if (proj === "moose") {
          fs.writeFileSync(
            `${__dirname}\/ProjectAddress\/MooseAddressObject.json`,
            JSON.stringify(reqiredData),
            "utf-8"
          );
        } else {
          fs.writeFileSync(
            `${__dirname}\/ProjectAddress\/AlphaAddressObject.json`,
            JSON.stringify(reqiredData),
            "utf-8"
          );
        }
      } catch (err) {
        res.status(500).json({ ok: false, message: "Error in saving file" });
      }
    }

    res.status(200).json({ ok: true, message: "Updated Successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ ok: false, messsage: err?.message || "Something went wrong!" });
  }
};
