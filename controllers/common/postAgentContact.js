const AgentContact = require("../../models/agentContact/agentContact.model");

const postAgentContact = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  try {
    const postAgentContact = new AgentContact({
      user: id,
      name,
      email,
      phone,
    });

    await postAgentContact.save();

    res.status(200).json({
      message: "success",
      data: postAgentContact,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = postAgentContact;
