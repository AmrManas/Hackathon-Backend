const router = require("express").Router();

const getSingleProperty = require("../../controllers/property/crud/getSingleProperty");
const postAgentContact = require("../../controllers/common/postAgentContact");
const getAgentContact = require("../../controllers/common/getAgentContact");
const putAgentContact = require("../../controllers/common/putAgentContact");
const count = require("../../controllers/common/count");

router.get("/single/:id", getSingleProperty);
router.get("/count/:id", count);
router.post("/contact/agent/:id", postAgentContact);
router.get("/agent/:id", getAgentContact);
router.put("/agent/user/:id", putAgentContact);

module.exports = router;
