const createError = require("http-errors");

// import user model
const User = require("../../../models/user/User.model");

const getBuilderList = async (req, res, next) => {
  try {
    const { query } = req;
    const startIndex = (query._start && parseInt(query._start)) || 0;
    const viewSize = (query._limit && parseInt(query._limit)) || 100;
    const searchCriteria = {};

    if (req.query.builder) {
      searchCriteria["$and"] = [
        {
          type: req.query.builder,
        },
      ];
    }
    if (req.query.popular) {
      searchCriteria["$or"] = [
        {
          popular: { $regex: `^${req.query.popular}`, $options: "i" },
        },
      ];
    }

    const response = await User.aggregate([
      { $match: { type: "builder" } },
      { $sort: { created_at: -1 } },
      { $skip: startIndex },
      { $limit: parseInt(viewSize) },
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

module.exports = getBuilderList;
