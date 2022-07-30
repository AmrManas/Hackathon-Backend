const PropertyType = require("../../../models/property/PropertyTypes.model");

const createPropertyType = async (req, res, next) => {
  const { params } = req;
  try {
    const deletedType = await PropertyType.findOneAndDelete(params.id);
    res.send(deletedType);
  } catch (error) {
    next(error);
  }
};

module.exports = createPropertyType;
