const Property = require("../../../models/property/Property.model");

const getPropertyFavorite = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const getPropertyFavorite = await Property.findOne({ user: userId });

    if (!getPropertyFavorite) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const propertyFavorite = await Property.find({
      favorite: true,
    });

    return res.status(200).json({
      message: "Property favorite fetched successfully",
      data: propertyFavorite,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = getPropertyFavorite;
