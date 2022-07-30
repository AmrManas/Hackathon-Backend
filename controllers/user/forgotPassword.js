const ResetPassword = require("../../models/resetPassword.model");
const ContactMech = require("../../models/ContactMech.model");
const sendEmail = require("../../services/sendEmail");
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await ContactMech.find({
      contact_mech_value: email,
      contact_mech_type: "email",
    }).exec();

    if (!user) {
      return res.status(400).send({ message: "This email is not registered" });
    }
    await ResetPassword.findOneAndDelete({ email: email }).exec();

    const otp = sendEmail.generateOTP();
    const resetotp = new ResetPassword({
      otp,
      email,
    });
    await resetotp.save();

    res.status(200).send({ message: "OTP sent successfully", otp });
  } catch (err) {
    res.status(400).send({ message: "Error occured" });
  }
};

module.exports = forgotPassword;
