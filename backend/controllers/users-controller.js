const User = require("./../models/User");
const jwt = require("jsonwebtoken");
const httpError = require("./../models/http-error");

exports.getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    return next(new httpError("Fetching user data failed !", 500));
  }
  res
    .status(200)
    .json({ users: users.map((u) => u.toObject({ getters: true })) });
};

exports.userAuth = async (req, res, next) => {
  const { wallet } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ wallet: wallet });
  } catch (err) {
    return next(new httpError("SignUp failed! Try again.", 500));
  }

  if (existingUser) {
    let token;
    try {
      token = jwt.sign(
        { wallet: existingUser.wallet },
        process.env.PRIVATE_KEY,
        {
          expiresIn: "1h",
        }
      );
    } catch (err) {
      return next(new httpError("Something went wrong. Log in failed!", 500));
    }

    return res.status(201).json({ existingUser, token });
  }

  const newUser = new User({
    wallet: wallet,
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(new httpError("Something went wrong !", 500));
  }

  let token;
  try {
    token = jwt.sign({ wallet }, process.env.PRIVATE_KEY, { expiresIn: "1h" });
  } catch (err) {
    return next(new httpError("Something went wrong !. Sign up failed!", 500));
  }

  res.status(201).send({ wallet, token: token });
};

exports.addUserDetails = async (req, res, next) => {
  const { wallet, name, image } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ wallet: wallet });
  } catch (err) {
    return next(new httpError("Update failed! Try again.", 500));
  }

  if (!existingUser) {
    return next(new httpError("User Not Found.", 500));
  }

  let query = { wallet: wallet };
  let newData = { wallet, name, image };

  User.findOneAndUpdate(query, newData, { upsert: true }, function (err, doc) {
    if (err) {
      return next(new httpError("User Not Found.", 500));
    }

    return res.status(200).json({ msg: "Succesfully saved." });
  });
};
