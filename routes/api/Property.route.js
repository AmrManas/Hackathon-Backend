const getAllProperty = require("../../controllers/property/crud/getAllProperty");
const createNewProperty = require("../../controllers/property/crud/createNewProperty");
const getSingleProperty = require("../../controllers/property/crud/getSingleProperty");
const deleteSingleProperty = require("../../controllers/property/crud/deleteSingleProperty");
const updateSingleProperty = require("../../controllers/property/crud/updateSingleProperty");
const createPropertyCallback = require("../../controllers/property/propertyCallbacks/createCallback");
const getCallbacksForUser = require("../../controllers/property/propertyCallbacks/getCallbacksForUser");
const roleCheck = require("../../middlewares/roleCheck");
const getAgentProperty = require("../../controllers/property/crud/getAgentProperty");
const updatePropertyCallback = require("../../controllers/property/propertyCallbacks/UpdateCallback");
const getPropertyFavorite = require("../../controllers/property/crud/getPropertyFavorite");
const approveOrRejectProperty = require("../../controllers/property/crud/approveOrRejectProperty");

const validateAccessToken = require("../../middlewares/jwt_validation");
const createPropertyFavorite = require("../../controllers/property/crud/createPropertyFavorite");
const getPropertyFavoriteOwner = require("../../controllers/property/crud/getPropertyFavoriteOwner");
const router = require("express").Router();

// TODO: Fix route names. Get single property should be like below example
router.get("/single/:id", getSingleProperty);
router.get("/all", getAllProperty);
router.post("/create", validateAccessToken, createNewProperty);
router.delete("/:id", deleteSingleProperty);

router.post("/callback/:id", createPropertyCallback);
router.put("/callback/:id", validateAccessToken, updatePropertyCallback);
router.get(
  "/agent/:id",
  validateAccessToken,
  (req, res, next) => roleCheck(req, res, next, ["agent", "user"]),
  getAgentProperty
);
router.put(
  "/update/:propertyId/favorite/:userId",
  validateAccessToken,
  createPropertyFavorite
);
router.get("/favorite/:userId", getPropertyFavorite);
router.get("/favorite/agent/:id", getPropertyFavoriteOwner);
router.get("/callback/:id", getCallbacksForUser);
router.put("/update/:id", validateAccessToken, updateSingleProperty);
router.put("/:id", approveOrRejectProperty);

module.exports = router;
