const bcrypt = require("bcryptjs");
const createError = require("http-errors");

const Token = require("../../models/Token.model");

const User = require("../../models/user/User.model");
const UserLoginMech = require("../../models/UserLoginMech.model");

const resetPassword = async (req, res, next) => {
  try {
    const { payload } = req.headers;
    const decoded = Buffer.from(payload, "base64").toString().split(":");
    [this.email, this.password] = decoded;
    console.log(decoded);

    const userContact = await UserLoginMech.findOne({
      login_mech_value: this.email,
    });
    console.log(userContact, "userContact");
    const user = await User.findOne({ _id: userContact.user });
    if (!user)
      throw createError.BadRequest(
        "We were unable to find a user for this verification. Please SignUp!"
      );

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    if (!hashedPassword) {
      throw createError.BadRequest(
        "Your request could not be processed. Please try again after some time."
      );
    }
    const loginMerch = await UserLoginMech.findOneAndUpdate(
      { login_mech_value: this.email },
      { password: hashedPassword },
      { new: true }
    );
    console.log(loginMerch, "loginMerch");
    if (!loginMerch)
      throw createError.BadRequest(
        "Your request could not be processed. Please try again after some time."
      );

    const deleted = await Token.deleteMany({ _userId: user._id });
    if (!deleted) throw createError.InternalServerError();

    res.status(200).json({
      success: true,
      message: "Password reset Successfully ",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resetPassword;
