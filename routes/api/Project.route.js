const router = require("express").Router();
const createProject = require("../../controllers/projects/createProject");

router.post("/createProject", createProject);

module.exports = router;
