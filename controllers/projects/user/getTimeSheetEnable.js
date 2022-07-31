const User = require("../../../models/user/User.model");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const getTimeSheetEnable = async (req, res, next) => {
  const { id } = req.headers;

  try {
    const decoded = jwt.decode(id, { complete: true });
    console.log("decoded.payload", decoded.payload);

    const getTimeSheetEnable = await User.findOne({
      _id: decoded.payload?._id,
    });

    if (!getTimeSheetEnable) {
      throw createError.BadRequest("User not found");
    }

    res.status(200).send({
      message: "success",
      enabled: getTimeSheetEnable?.is_time_active,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = getTimeSheetEnable;
