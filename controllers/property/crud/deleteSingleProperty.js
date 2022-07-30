const Property = require("../../../models/property/Property.model");

const deleteNewProperty = async (req, res, next) => {
  const { params } = req;
  try {
    const deletedProperty = await Property.findOneAndDelete({_id: params.id});
    res.send(deletedProperty);
  } catch (error) {
    next(error);
  }
};

module.exports = deleteNewProperty;
