// const createError = require("http-errors");
const PropertyType = require("../../../models/property/PropertyTypes.model");

const createPropertyType = async (req, res, next) => {
  const { body } = req;
  try {
    const newType = await PropertyType.create(body);
    res.send(newType);
  } catch (error) {
    next(error);
  }
};

module.exports = createPropertyType;
