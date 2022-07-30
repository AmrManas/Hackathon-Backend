const User = require("../../models/user/User.model");

const convertParams = require("../../helpers/convertParams");
const getUsersProperty = async (req, res, next) => {
  try {
    const { query } = req;

    const filters = convertParams(User, query);

    const startIndex = (query._start && parseInt(query._start)) || 0;

    const viewSize = (query._limit && parseInt(query._limit)) || 50;

    const searchCriteria = { ...filters.where, ...filters.find };

    const response = await User.aggregate([
      { $match: searchCriteria },
      { $skip: startIndex },
      { $limit: parseInt(viewSize) },
    ]);
    const users = response[1]._id;

    const user = await User.findById({ users });
    res.send(user);
    console.log(user, "user");
  } catch (error) {
    next(error);
  }
};
module.exports = getUsersProperty;
