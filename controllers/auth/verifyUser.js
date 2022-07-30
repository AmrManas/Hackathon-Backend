const bcrypt = require("bcryptjs");
const createError = require("http-errors");

const Token = require("../../models/Token.model");

const User = require("../../models/user/User.model");
const ContactMech = require("../../models/ContactMech.model");
const VerifyTokenModel = require("../../models/VerifyToken.model");

const verifyUser = async (req, res, next) => {
  try {
    const { payload } = req.headers;
    const decoded = Buffer.from(payload, "base64").toString().split(":");
    [this.email, this.otp, this.verificationToken] = decoded;
    console.log(decoded);

    const userContact = await ContactMech.findOne({
      contact_mech_value: this.email,
    });
    console.log(userContact, "userContact");
    const tokenDetails = await VerifyTokenModel.findOne({
      user: userContact?.user,
      type: "verify-email",
    });
    console.log(
      tokenDetails,
      "tokenDetails",
      tokenDetails?.otp !== this.otp,
      tokenDetails?.otp,
      this.otp,
      typeof this.otp,
      typeof tokenDetails.otp
    );

    if (!tokenDetails) {
      throw createError.BadRequest("Token expired");
    }

    if (tokenDetails?.otp !== this.otp) {
      throw createError.BadRequest("OTP didn't match");
    }

    const user = await User.findOne({ _id: tokenDetails.user });
    if (!user)
      throw createError.BadRequest(
        "We were unable to find a user for this verification. Please SignUp!"
      );

    const isMatch = await bcrypt.compare(
      this.verificationToken,
      tokenDetails.token
    );
    if (!isMatch) throw createError.BadRequest("User didn't match");

    const deleted = await Token.deleteMany({ _userId: user._id });
    if (!deleted) throw createError.InternalServerError();

    res.status(200).json({
      success: true,
      message: "User Created Successfully ",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyUser;
