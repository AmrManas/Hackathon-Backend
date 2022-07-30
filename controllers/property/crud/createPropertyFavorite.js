const PropertyNew = require("../../../models/property/PropertyNew.model");
const User = require("../../../models/user/User.model");

const createPropertyFavorite = async (req, res, next) => {
  const { propertyId, userId } = req.params;
  const { favorite } = req.body;

  try {
    const user = await User.find({ _id: userId });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const propertyFavorite = await PropertyNew.findOneAndUpdate(
      { _id: propertyId },
      { favorite: favorite },
      { new: true }
    );

    if (!propertyFavorite) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    return res.status(200).json({
      message: "Property favorite updated successfully",
      propertyFavorite,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = createPropertyFavorite;
