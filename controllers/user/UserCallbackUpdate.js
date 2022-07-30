const User = require("../../models/user/User.model");

const userCallbackUpdate = async (req, res, next) => {
  const { id } = req.params;
  const { is_active } = req.body;

  try {
    const userCallbackUpdate = await User.findOneAndUpdate(
      { _id: id },
      { is_active },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "User callback updated successfully",
      userCallbackUpdate,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = userCallbackUpdate;
