const router = require("express").Router();
const passport = require("passport");

const registerUser = require("../../controllers/auth/register");
const loginUser = require("../../controllers/auth/login");
const logoutUser = require("../../controllers/auth/logout");
const verifyEmail = require("../../controllers/auth/verify");
const forgotPassword = require("../../controllers/auth/forgotPassword");
const verifyUser = require("../../controllers/auth/verifyUser");
const verifyOtp = require("../../controllers/auth/verifyOtp");
const resetPassword = require("../../controllers/auth/resetPassword");
const updateUser = require("../../controllers/users/update");

router.post("/login", loginUser);

router.delete("/logout", logoutUser);

router.post("/verify", verifyEmail);

router.post("/register", registerUser);
router.put("/update", updateUser);

router.post("/forgotPassword", forgotPassword);
router.post("/verifyUser", verifyUser);
router.post("/verifyotp", verifyOtp);
router.post("/resetpassword", resetPassword);

router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

module.exports = router;
