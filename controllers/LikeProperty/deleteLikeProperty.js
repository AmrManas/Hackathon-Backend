var ObjectId = require("mongoose").Types.ObjectId;
const createError = require("http-errors");
const LikeProperty = require("../../models/likeProperty/LikeProperty.model");

const deleteLikeProperty = async (req, res, next) => {
  const { userId, propertyId } = req.body;
  try {
    const userExist = await LikeProperty.findOne({
      userId: ObjectId(userId),
    });

    if (!userExist) {
      throw createError.BadRequest("user does not exist");
    }

    const propertyExist = await LikeProperty.findOne({
      propertyId: ObjectId(propertyId),
    });

    if (!propertyExist) {
      throw createError.BadRequest("property does not exist");
    }

    const deleteLikeProperty = await LikeProperty.findOneAndDelete({
      userId: ObjectId(userId),
      propertyId: ObjectId(propertyId),
    });

    res.status(200).json({
      message: "like property deleted",
      data: deleteLikeProperty,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteLikeProperty;
