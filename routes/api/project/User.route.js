const router = require("express").Router();
const getAllUser = require("../../../controllers/projects/user/getAllUser");

router.get("/getAllUser", getAllUser);

module.exports = router;
