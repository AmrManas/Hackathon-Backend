const bcrypt = require("bcryptjs");
const createError = require("http-errors");

const { generateCryptoKey } = require("../../services/generate_token");

const generateOtp = require("../../services/generateOtp");

// import models
const User = require("../../models/user/User.model");
const ContactMech = require("../../models/ContactMech.model");
const VerifyToken = require("../../models/VerifyToken.model");
const { emailValidation } = require("../../services/validation_schema");

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = await emailValidation.validateAsync(req.body);
    const primary_email = await ContactMech.findOne({
      contact_mech_value: email,
      contact_mech_type: "email",
    });

    const user = await User.findOne({ primary_email });
    if (!user)
      throw createError.BadRequest(
        "This email is not associated to any account. Please register."
      );

    if (user.primary_email) {
      await VerifyToken.findOneAndDelete({
        user: user._id,
        type: "forget-password",
      });
      const otp = generateOtp();
      // console.log(otp)
      const verificationToken = generateCryptoKey();
      const hashedToken = await bcrypt.hash(verificationToken, 10);
      const verification = new VerifyToken({
        user: user._id,
        otp,
        token: hashedToken,
        type: "forget-password",
      });

      await verification.save();

      res.status(200).json({
        success: true,
        otp,
        verificationToken,
        message: "Email sent to reset password",
      });
    }
  } catch (err) {
    if (err.isJoi === true) err.status = 422;
    next(err);
  }
};

module.exports = forgotPassword;
