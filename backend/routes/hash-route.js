const express = require("express");
const router = express.Router();

const hashController = require("./../controllers/hash-controller");

router.get("/", hashController.getCurrentHashesOfAllAddress);

router.post("/generateHash", hashController.generateHashesForAllAddress);

module.exports = router;
