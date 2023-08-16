const express = require("express");
const router = express.Router();

const passController = require("./../controllers/pass-controller");

router.get("/:id", passController.returnJson);

router.post("/newPass", passController.addNewPass);

router.patch("/mutatePass", passController.updateStatus);

module.exports = router;
