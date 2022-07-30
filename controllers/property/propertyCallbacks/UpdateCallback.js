const PropertyCallback = require("../../../models/property/PropertyCallback.model");

const updatePropertyCallback = async (req, res, next) => {
  const { params, body } = req;

  try {
    const updatedCallback = await PropertyCallback.findOneAndUpdate(
      { _id: params.id },
      body,
      { new: true }
    );
    res.status(200).json({
      updatedCallback,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = updatePropertyCallback;
