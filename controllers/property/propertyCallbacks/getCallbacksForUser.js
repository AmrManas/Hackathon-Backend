var ObjectId = require("mongoose").Types.ObjectId;
const PropertyCallback = require("../../../models/property/PropertyCallback.model");

const getCallbacksForUser = async (req, res, next) => {
  const { id } = req.params;

  const searchCriteria = {};

  if (req.query.status) {
    searchCriteria["$and"] = [
      {
        status: req.query.status,
      },
    ];
  }

  try {
    const callbacks = await PropertyCallback.aggregate([
      {
        $match: {
          ...searchCriteria,
          agent: ObjectId(id),
        },
      },
      {
        $facet: {
          count: [
            {
              $count: "total_count",
            },
          ],
          data: [
            { $sort: { created_at: -1 } },

            {
              $lookup: {
                from: "property",
                localField: "property",
                foreignField: "_id",
                as: "property",
              },
            },
            {
              $unwind: {
                path: "$property",
              },
            },
          ],
        },
      },
    ]);
    res.status(200).json({
      success: true,
      data: callbacks[0].data,
      // count: callbacks[0].count[0].total_count,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCallbacksForUser;
