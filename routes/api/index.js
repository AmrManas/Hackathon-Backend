const router = require("express").Router();

const authRoutes = require("./Auth.route");
const userRoutes = require("./User.route");
const propertyRoutes = require("./Property.route");
const validateAccessToken = require("../../middlewares/jwt_validation");
const LikeProperty = require("./likeProperty");
const Common = require("./Common.route");
const Project = require("./Project.route");

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/property", propertyRoutes);
router.use("/likeproperty", LikeProperty);
router.use("/common", Common);
router.use("/project", Project);

// test route
router.get("/test", validateAccessToken, (req, res) => {
  res.status(200).json({
    message: "success",
  });
});

router.get("/ping", (req, res) => {
  res.json({ success: "true", message: "successful request" });
});

module.exports = router;
