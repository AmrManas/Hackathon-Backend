const User = require("../../models/user/User.model");
const createError = require("http-errors");

const updateUser = async (req, res, next) => {
  const fields = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        name: fields.name,
        projectName: fields.projectName,
        list: fields.list,
        avatar_url: fields.url,
        area: fields.area,

        experience: fields.experience,

        language: fields.language,
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
