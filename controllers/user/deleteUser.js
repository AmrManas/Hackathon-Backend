const User = require("../../models/user/User.model");

const deleteUser = async (req, res, next) => {
  const { params } = req;
  try {
    const user = await User.deleteOne({ _id: params.id });
    res.send(user);
  } catch (error) {
    next(error);
  }
};

module.exports = deleteUser;
