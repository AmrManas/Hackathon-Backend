const router = require("express").Router();
const getAllUser = require("../../../controllers/projects/user/getAllUser");
const createTask = require("../../../controllers/projects/tasks/createTask");
const getAllTask = require("../../../controllers/projects/tasks/getAllTask");
const updateTask = require("../../../controllers/projects/tasks/updateTask");
const generateQR = require("../../../controllers/projects/generateQR");
const updateTimeSheet = require("../../../controllers/projects/user/updateTimeSheet");
const getTimeSheetEnable = require("../../../controllers/projects/user/getTimeSheetEnable");
const validateAccessToken = require("../../../middlewares/jwt_validation");
const me = require("../../../controllers/user/me");

router.get("/me", validateAccessToken, me);
router.get("/getAllUser", getAllUser);
router.post("/createTask", createTask);
router.get("/getAllTask", getAllTask);
router.put("/updateTask/:id", updateTask);

// QR
router.get("/generateQR", generateQR);

//timeSheet
router.put("/updateTime/:id", updateTimeSheet);
router.put("/getTime/:id", getTimeSheetEnable);

module.exports = router;
