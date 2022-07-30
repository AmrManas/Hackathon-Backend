const Property = require("../../../models/property/Property.model");
var ObjectId = require("mongoose").Types.ObjectId;

const getPropertyFavoriteOwner = async (req, res) => {
  const { userId } = req.params;

  const getAgentProperty = await Property.find({
    user: ObjectId(userId),
  });

  if (!getAgentProperty) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const propertyFavorite = await Property.find({
    favorite: true,
  });

  res.status(200).json({
    message: "Property favorite fetched successfully",
    data: propertyFavorite,
  });
};

module.exports = getPropertyFavoriteOwner;
