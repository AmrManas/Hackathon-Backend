const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const User = require("../../modals/user.modal");

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return next(createError(404, "User not found"));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(500, "Password does not match"));

    const payload = {
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
      },
    };

    res.status(200).send(payload.data);
  } catch (error) {
    next(error);
  }
};
module.exports = loginUser;
