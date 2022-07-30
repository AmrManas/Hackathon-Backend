// const PropertyType = require("../../../models/property/PropertyTypes.model");
const { propertyForm } = require("../../../config/postProperty/postProperty");

const getPropertyTypes = async (req, res, next) => {
  try {
    // const newType = await PropertyType.find();
    res.send(propertyForm);
  } catch (error) {
    next(error);
  }
};

module.exports = getPropertyTypes;
