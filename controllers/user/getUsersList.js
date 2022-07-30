const createError = require("http-errors");
const getSingleProperty = require("../property/crud/getSingleProperty");
// import user model
const User = require("../../models/user/User.model");
const convertParams = require("../../helpers/convertParams");

const getUsersList = async (req, res, next) => {
  try {
    const { query } = req;
    const filters = convertParams(User, query);
    const startIndex = (query._start && parseInt(query._start)) || 0;
    const viewSize = (query._limit && parseInt(query._limit)) || 10;
    const searchCriteria = { ...filters.where, ...filters.find };
    const response = await User.aggregate([
      { $match: searchCriteria },
      { $skip: startIndex },
      { $limit: parseInt(viewSize) },
    ]);
    const user = response[0]._id;

    if (!response)
      throw createError.InternalServerError("User details can not be fetched");

    const count = await User.countDocuments();
    res.status(200).json({
      message: "success",
      data: {
        user,
        users: response,
        count: response.length,
        getSingleProperty,
        user_total: count,
      },
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = getUsersList;
