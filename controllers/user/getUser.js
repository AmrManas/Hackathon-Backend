//const createError = require("http-errors");
const User = require("../../models/user/User.model");

const convertParams = require("./convertParams");

const getUser = async (req, res, next) => {
  try {
    const filters = await convertParams(User, req.query);
    const skip =
      req.query._start && req.query._start
        ? (filters.start - 1) * filters.limit
        : 0;
    await User.find({ _id: req.params?.id })
      .where(filters.where)
      .sort({ created_at: "desc" })
      .skip(skip)
      .limit(filters.limit)
      .exec((error, data) => {
        if (error) {
          res.status(400);
          res.send(error);
        } else {
          User.countDocuments(
            { ...filters.where, ...filters.find },
            function (error, count) {
              if (error) {
                res.status(400);
                res.send(error);
              }
              res.status(200).send({
                categories: data,
                total: count,
              });
            }
          );
        }
      });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = getUser;
