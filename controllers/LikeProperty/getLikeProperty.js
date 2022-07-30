var ObjectId = require("mongoose").Types.ObjectId;
const LikeProperty = require("../../models/likeProperty/LikeProperty.model");

const getLikeProperty = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const getLikeProperty = await LikeProperty.find({
      userId: ObjectId(userId),
    });

    res.status(200).json({
      message: "like property get",
      data: getLikeProperty,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getLikeProperty;
