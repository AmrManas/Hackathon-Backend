// const createError = require("http-errors");
var ObjectId = require("mongoose").Types.ObjectId;
const LikeProperty = require("../../models/likeProperty/LikeProperty.model");
const createError = require("http-errors");

const createLikeProperty = async (req, res, next) => {
  const { body } = req;

  const { userId, propertyId } = body;
  try {
    const user = await LikeProperty.find({
      userId: ObjectId(userId),
    });

    if (!user) {
      throw createError.BadRequest("user does not exist");
    }

    const property = await LikeProperty.find({
      propertyId: ObjectId(propertyId),
    });

    if (!property) {
      throw createError.BadRequest("property does not exist");
    }

    const existingItem = await LikeProperty.findOne({
      userId: userId,
      propertyId: propertyId,
    });

    if (existingItem) {
      throw createError.BadRequest("already liked");
    }

    const createLikeProperty = new LikeProperty({
      userId,
      propertyId,
    });

    createLikeProperty.save();

    res.status(200).json({
      message: "like property created",
      data: createLikeProperty,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createLikeProperty;
