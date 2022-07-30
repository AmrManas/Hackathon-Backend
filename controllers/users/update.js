const User = require("../../models/user/User.model");
const createError = require("http-errors");

const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updatedUser)
      throw createError.InternalServerError(
        "Your request could not be processed. Please contact support or try again after some time."
      );

    return res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.log("error in updating user: ", error);
    next(error);
  }
};

module.exports = updateUser;
