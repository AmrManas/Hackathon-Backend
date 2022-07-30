const User = require("../../../models/user/User.model");

const getAllUser = async (req, res, next) => {
  try {
    const getAllUser = await User.find();

    res.status(200).json({
      message: "success",
      data: getAllUser,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = getAllUser;
