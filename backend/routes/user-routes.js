const express = require("express");
const router = express.Router();
const usersController = require("./../controllers/users-controller");
// const authUser = require("./../middleware/user-auth");

router.get("/", usersController.getUsers);
router.post("/auth", usersController.userAuth);
router.post("/updateuser", usersController.addUserDetails);

module.exports = router;
