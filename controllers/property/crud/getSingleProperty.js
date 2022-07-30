const Property = require("../../../models/property/Property.model");
const createError = require("http-errors");
const { ObjectId } = require("mongoose").Types;
const getSingleProperty = async (req, res, next) => {
  const { params } = req;
  try {
    const getSingleId = await Property.aggregate([
      {
        $match: { _id: ObjectId(params.id) },
      },
      {
        $lookup: {
          from: "property",
          let: { agent: "$user", property: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$user", "$$agent"] },
                    { $eq: ["$verifyStatus", "verified"] },
                    { $ne: ["$_id", "$$property"] },
                  ],
                },
              },
            },
            {
              $limit: 3,
            },
          ],
          as: "similarProperties",
        },
      },
    ]);
    if (getSingleId.length === 0)
      throw createError.NotFound("This property does not exist!");
    res.status(200).json(getSingleId[0]);
  } catch (error) {
    next(error);
  }
};
module.exports = getSingleProperty;
