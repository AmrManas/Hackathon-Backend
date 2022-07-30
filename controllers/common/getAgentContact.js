const AgentContact = require("../../models/agentContact/agentContact.model");
var ObjectId = require("mongoose").Types.ObjectId;

const getAgentContact = async (req, res, next) => {
  const { id } = req.params;

  try {
    const getAgentContact = await AgentContact.find({ user: ObjectId(id) });

    res.status(200).json({
      message: "success",
      data: getAgentContact,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = getAgentContact;
