const createError = require("http-errors");
const bcrypt = require("bcryptjs");

const ContactMech = require("../../models/ContactMech.model");
const VerifyToken = require("../../models/VerifyToken.model");
const { generateCryptoKey } = require("../../services/generate_token");

const VerifyOtp = async (req, res, next) => {
  try {
    const { payload } = req.headers;
    const decoded = Buffer.from(payload, "base64").toString().split(":");
    [this.email, this.otp, this.verificationToken] = decoded;
    console.log(decoded);

    const userContact = await ContactMech.findOne({
      contact_mech_value: this.email,
    });

    await VerifyToken.findOneAndDelete({
      user: userContact?.user,
      otp: this.otp,
      token: hashedToken,
      type: "forget-password",
    });

    console.log(userContact, "userContact");
    const verificationToken = generateCryptoKey();
    const hashedToken = await bcrypt.hash(verificationToken, 10);
    const verification = new VerifyToken({
      user: userContact?.user,
      otp: this.otp,
      token: hashedToken,
      type: "forget-password",
    });
    await verification.save();

    if (!verification) {
      throw createError.BadRequest("Token expired");
    }

    //verify otp
    if (verification?.otp !== this.otp) {
      throw createError.BadRequest("OTP didn't match");
    }

    res.status(200).json({
      success: true,
      message: "OTP Verified Successfully ",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = VerifyOtp;
