const createLikeProperty = require("../../controllers/LikeProperty/createLikeProperty");
const deleteLikeProperty = require("../../controllers/LikeProperty/deleteLikeProperty");
const getLikeProperty = require("../../controllers/LikeProperty/getLikeProperty");

const router = require("express").Router();

router.post("/create", createLikeProperty);
router.delete("/delete", deleteLikeProperty);
router.get("/getlike/:userId", getLikeProperty);

module.exports = router;
