const router = require("express").Router();

router.get("/login", () => {
  console.log("logged in");
});

module.exports = router;
