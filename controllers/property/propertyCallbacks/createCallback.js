const PropertyCallback = require("../../../models/property/PropertyCallback.model");
const Property = require("../../../models/property/Property.model");

const createPropertyCallback = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone, message } = req.body;
  try {
    const propertyFromDB = await Property.findOne({ _id: id });
    if (!propertyFromDB) {
      return res.status(404).send({
        message: "Property not found",
      });
    }
    const callback = await PropertyCallback.create({
      customer: {
        name,
        email,
        phone,
        message,
      },
      agent: propertyFromDB?.user,
      property: propertyFromDB._id,
    });

    // res.status(callback);
    res.status(200).json({
      success: true,
      callback,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createPropertyCallback;
