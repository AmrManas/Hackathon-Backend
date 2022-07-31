const User = require("../../../models/user/User.model");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const updateTimeSheet = async (req, res, next) => {
  const { id } = req.headers;
  const { body } = req;

  const decoded = jwt.decode(id, { complete: true });
  console.log("decoded.payload", decoded.payload);

  try {
    const updateTimeSheet = await User.findOneAndUpdate(
      {
        _id: decoded.payload?._id,
      },
      body
    );

    if (!updateTimeSheet) {
      throw createError.BadRequest("User not found");
    }

    res.status(200).send({
      message: "success",
      data: updateTimeSheet,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = updateTimeSheet;
