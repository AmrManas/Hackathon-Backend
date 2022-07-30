const User = require("../../models/user/User.model");

const getTopDevelopers = async (req, res, next) => {
  // const { body } = req;
  try {
    const list = await User.find({
      $and: [
        {
          type: "agent",
          is_active: "Accepted",
        },
      ],
    })
      .sort({ experience: "desc" })
      .limit(6);
    res.send(list);
  } catch (e) {
    next(e);
  }
};

module.exports = getTopDevelopers;
