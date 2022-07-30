const bcrypt = require("bcryptjs");
const createError = require("http-errors");

// import models and helpers
const User = require("../../models/user/User.model");
const ContactMech = require("../../models/ContactMech.model");
const UserLoginMech = require("../../models/UserLoginMech.model");
const VerifyTokenModel = require("../../models/VerifyToken.model");

const { generateCryptoKey } = require("../../services/generate_token");
// const { registerValidation } = require("../../services/validation_schema");
const sendEmail = require("../../services/sendEmail");
const generateOtp = require("../../services/generateOtp");
// const verifyEmailTemplate = require("../../config/emailTemplates/verifyEmail");

const registerUser = async (req, res, next) => {
  const { payload } = req.headers;

  const decoded = Buffer.from(payload, "base64").toString().split(":");
  [this.name, this.email, this.password, this.type, this.role] = decoded;
  console.log(decoded);
  try {
    if (!this.email) {
      throw createError.BadRequest(
        "Email or phone number is required for registration."
      );
    }

    const { email, password, name, type, role } = this;

    if (email) {
      const existingEmail = await ContactMech.findOne({
        contact_mech_type: "email",
        contact_mech_value: email,
      });
      if (existingEmail) {
        throw createError.Conflict(
          `${email} is already registered. Please login.`
        );
      }
    }

    const user = new User({
      name,
      type: [type],
      role,
    });

    const createdUser = await user.save();
    if (!createdUser)
      throw createError.InternalServerError(
        "Your request could not be processed. Please contact support or try again after some time."
      );

    if (email) {
      const emailContactMech = new ContactMech({
        user: createdUser._id,
        contact_mech_type: "email",
        contact_mech_value: email,
      });

      const savedEmailContactMech = await emailContactMech.save();
      createdUser.primary_email = savedEmailContactMech._id;
    }

    createdUser.save();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (email) {
      const userEmailLoginMech = new UserLoginMech({
        user: createdUser._id,
        login_mech_type: "email",
        login_mech_value: email,
        password: hashedPassword,
      });
      userEmailLoginMech.save();
    }
    console.log(email);
    // generate verify email token and save to db
    if (email) {
      const otp = generateOtp();
      const verificationToken = generateCryptoKey();
      const hashedToken = await bcrypt.hash(verificationToken, 10);
      const verification = new VerifyTokenModel({
        user: createdUser._id,
        token: hashedToken,
        otp,
        type: "verify-email",
      });

      let message = `<h1>Welcome to the Property Yards</h1>
    <p>Please verify the OTP</p>
    <p>OTP: ${otp}</p>`;

      await verification.save();
      sendEmail([email], "OTP Verification for propertyYards", message);

      res.status(200).json({
        success: true,
        otptoken: verificationToken,
        otp,
      });
    }
    // send response
  } catch (error) {
    console.log("error register: ", error);
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = registerUser;
