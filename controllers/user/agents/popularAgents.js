var ObjectId = require("mongoose").Types.ObjectId;
const User = require("../../../models/user/User.model");

const popularAgents = async (req, res, next) => {
  const { id } = req.params;
  const field = req.body;

  try {
    const popularAgents = await User.findOneAndUpdate(
      { _id: ObjectId(id) },
      {
        popular: field.popular,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      popularAgents,
    });
  } catch (error) {
    console.log("error in updating popular: ", error);
    next(error);
  }
};

module.exports = popularAgents;
