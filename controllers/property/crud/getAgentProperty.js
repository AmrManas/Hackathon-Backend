var ObjectId = require("mongoose").Types.ObjectId;
const PropertyNew = require("../../../models/property/PropertyNew.model");

const getAgentProperty = async (req, res, next) => {
  const { id } = req.params;
  const { verifyStatus } = req.query;

  try {
    const getAgentProperty = await PropertyNew.find({
      user: ObjectId(id),
      verifyStatus: verifyStatus,
    });
    res.status(200).json({
      success: true,
      data: getAgentProperty,
    });
  } catch (error) {
    console.log("error in getting property: ", error);
    next(error);
  }
};

module.exports = getAgentProperty;
