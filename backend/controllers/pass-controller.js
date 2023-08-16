const UserPass = require("./../models/UserPass");
const httpError = require("./../models/http-error");
const bcrypt = require("bcryptjs");

const data = [
  {
    description: "Founders Pass Reign Labs",
    name: "Basic Pass",
    image:
      "https://ipfs.io/ipfs/QmWDrcczqt5XCqfizoLg3Ms78hZVNqkyEm7fKRAiExXtkv",
    attributes: [
      {
        trait_type: "Type",
        value: "Basic",
      },
      {
        trait_type: "Sales Fee",
        value: "5%",
        display_type: "string",
      },
      {
        trait_type: "Status",
        value: "",
        display_type: "string",
      },
    ],
  },
  {
    description: "Founders Pass Reign Labs",
    name: "Elite Pass",
    image:
      "https://ipfs.io/ipfs/QmR7vmGv7AkJiRhDuKYVjoPKpUjvQLyVC9sH1eMppGrZRt",
    attributes: [
      {
        trait_type: "Type",
        value: "Elite",
      },
      {
        trait_type: "Sales Fee",
        value: "2%",
        display_type: "string",
      },
      {
        trait_type: "Status",
        value: "",
        display_type: "string",
      },
    ],
  },
  {
    description: "Founders Pass Reign Labs",
    name: "Pro Pass",
    image: "https://ipfs.io/QmfR8Ymrog9kXgfPSz2dhSJHEQ1s5a26Ubzdz8MLo27LPy",
    attributes: [
      {
        trait_type: "Type",
        value: "Pro",
      },
      {
        trait_type: "Sales Fee",
        value: "0%",
        display_type: "string",
      },
      {
        trait_type: "Status",
        value: "",
        display_type: "string",
      },
    ],
  },
];
const bound = [0, 5000, 8000, 10000];
const status_string = ["Inactive", "Active", "Expired"];

const getIndex = (id) => {
  if (id >= bound[0] && id < bound[1]) {
    return 0;
  } else if (id >= bound[1] && id < bound[2]) {
    return 1;
  } else {
    return 2;
  }
};

exports.returnJson = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (id >= bound[0] && id < bound[3]) {
      let existingPass;
      existingPass = await UserPass.findOne({ token_id: id });

      if (!existingPass) {
        return res
          .status(200)
          .json({ ok: false, message: "The given Token Id is not minted" });
      }

      const status_indx = Number(existingPass.active);
      const indx = getIndex(id);
      let return_data = { ...data[indx] };
      return_data.name = `${return_data.name} #${id}`;
      return_data.attributes[2].value = status_string[status_indx];

      return res.status(200).json(return_data);
    } else {
      return res.status(200).json({ message: "No such id present" });
    }
  } catch (err) {
    console.log(err);
    return next(new httpError(err?.message || "Something went wrong.", 500));
  }
};

exports.addNewPass = async (req, res, next) => {
  try {
    const { t_id, transactionHash } = req.body;

    let existingPass;
    existingPass = await UserPass.findOne({ token_id: t_id });

    if (existingPass) {
      return res
        .status(200)
        .json({ ok: false, message: "The given Token Id already exist" });
    }

    const newPass = new UserPass({
      token_id: t_id,
      transactionHash: transactionHash,
      active: 0,
    });

    await newPass.save();

    return res
      .status(200)
      .json({ ok: true, newPass: newPass.toObject({ getters: true }) });
  } catch (err) {
    console.log(err);
    return next(new httpError(err?.message || "Something went wrong.", 500));
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { t_id, active, password } = req.body;

    let isValid;
    try {
      isValid = await bcrypt.compare(password, process.env.HASHED_PASSWORD);
    } catch (err) {
      return next(new httpError("Failed! Try again.", 500));
    }

    if (!isValid) {
      return next(new httpError("INVALID USER", 403));
    }

    let existingPass;
    existingPass = await UserPass.findOne({ token_id: t_id });

    if (!existingPass) {
      return res
        .status(200)
        .json({ ok: false, message: "The given Token Id is not minted" });
    }

    existingPass.active = active;

    await existingPass.save();

    res
      .status(200)
      .json({ ok: true, pass: existingPass.toObject({ getters: true }) });
  } catch (err) {
    console.log(err);
    return next(new httpError(err?.message || "Something went wrong.", 500));
  }
};
