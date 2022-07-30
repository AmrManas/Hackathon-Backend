const router = require("express").Router();

// bring in models and controllers
//const validateAccessToken = require("../../middlewares/jwt_validation");
const getUser = require("../../controllers/user/getUser");
const me = require("../../controllers/user/me");
const getUsersList = require("../../controllers/user/getUsersList");
const getAgentsList = require("../../controllers/user/agents/getAgentsList");
const deleteUser = require("../../controllers/user/deleteUser");
const updateProfile = require("../../controllers/user/updateProfile");
const getCallbacksForUser = require("../../controllers/property/propertyCallbacks/getCallbacksForUser");
const userCallback = require("../../controllers/user/userCallback");
const userDetails = require("../../controllers/user/userDetails");
const userCallbackUpdate = require("../../controllers/user/UserCallbackUpdate");
const popularAgents = require("../../controllers/user/agents/popularAgents");
const validateAccessToken = require("../../middlewares/jwt_validation");
const getTopDevelopers = require("../../controllers/common/getTopDevelopers");
const getDeveloperList = require("../../controllers/user/developer/getDeveloperList");
const getBuilderList = require("../../controllers/user/builder/getBuilderList");
const getPopularAgentList = require("../../controllers/user/agents/getpopularAgentList");
const typeCheck = require("../../middlewares/typeCheck");

router.get(
  "/callbacks",
  validateAccessToken,
  (req, res, next) => typeCheck(req, res, next, ["agent", "developer"]),
  getCallbacksForUser
);

// get user details

// get all user details
router.get("/agents", getAgentsList);
router.get("/popular", getPopularAgentList);
router.get("/developer", getDeveloperList);
router.get("/builder", getBuilderList);
router.get("/", validateAccessToken, getUsersList);
// router.get("/agents", getAgentsList);
router.get("/me", validateAccessToken, me);

router.put("/me/popular/:id", validateAccessToken, popularAgents);
router.get("/getTopDevelopers", getTopDevelopers);
router.post("/userCallback", userCallback);
router.put("/userCallbackUpdate/:id", userCallbackUpdate);

router.delete("/:id", deleteUser);
router.get("/userDetail/:email", userDetails);
router.put("/:id", validateAccessToken, updateProfile);
router.get("/:id", validateAccessToken, getUser);

module.exports = router;
