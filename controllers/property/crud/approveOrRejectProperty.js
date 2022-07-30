var ObjectId = require("mongoose").Types.ObjectId;
const PropertyNew = require("../../../models/property/PropertyNew.model");

const ApproveOrRejectProperty = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const ApproveOrRejectProeprty = await PropertyNew.findOneAndUpdate(
    {
      _id: ObjectId(id),
    },
    body
  );

  res.status(200).json({
    message: "success",
    data: ApproveOrRejectProeprty,
  });
};

module.exports = ApproveOrRejectProperty;
