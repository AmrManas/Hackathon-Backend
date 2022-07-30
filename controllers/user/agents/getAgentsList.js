const createError = require("http-errors");

// import user model
const User = require("../../../models/user/User.model");

const getAgentsList = async (req, res, next) => {
  try {
    const searchCriteria = {};

    // if (req.query.agent) {
    //   searchCriteria["$and"] = [
    //     {
    //       type: req.query.agent,
    //     },
    //   ];
    // }

    if (req.query.popular) {
      searchCriteria["$and"] = [
        {
          popular: req.query.popular === "true" ? true : false,
        },
      ];
    }

    const response = await User.aggregate([
      {
        $match: {
          ...searchCriteria,
          type: "agent",
        },
      },
      { $sort: { created_at: -1 } },

      {
        $lookup: {
          from: "property",
          let: { user_id: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$user", "$$user_id"] } } },
            { $sort: { created_at: -1 } },
          ],
          as: "properties",
        },
      },
      {
        $lookup: {
          from: "contactmech",
          localField: "primary_email",
          foreignField: "_id",
          as: "primary_email",
        },
      },
      {
        $unwind: {
          path: "$primary_email",
        },
      },
      { $addFields: { latestProperty: { $first: "$properties" } } },
    ]);
    if (!response)
      throw createError.InternalServerError("User details can not be fetched");

    const count = await User.countDocuments();
    res.status(200).json({
      message: "success",
      data: { users: response, count: response.length, user_total: count },
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = getAgentsList;
