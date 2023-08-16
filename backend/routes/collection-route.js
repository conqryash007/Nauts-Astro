const express = require("express");
const router = express.Router();

const collectionController = require("./../controllers/collection-controller");

router.get("/:id", collectionController.getNauts);
router.post("/ispilot/", collectionController.isPilot);

router.get("/claimstatus/:proj/:addr", collectionController.getClaimStatus);
router.post("/claim/:proj/:addr", collectionController.changeClaimStatus);

module.exports = router;
