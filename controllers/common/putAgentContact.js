const AgentContact = require("../../models/agentContact/agentContact.model");

const putAgentContact = async (req, res, next) => {
  const { id } = req.params;
  const { isContacted, remarks } = req.body;

  try {
    const putAgentContact = await AgentContact.findOneAndUpdate(
      { _id: id },
      { isContacted: isContacted, remarks: remarks }
    );

    res.status(200).json({
      message: "success",
      data: putAgentContact,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports = putAgentContact;
