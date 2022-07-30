const ResetPassword = require("../../models/resetPassword.model");
const User = require("../../models/user/User.model");
const sendEmail = require("../../services/sendEmail");
const bcrypt = require("bcryptjs");
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;

    let buff = Buffer.from(token, "base64");
    let text = buff.toString("ascii");

    const [email, password] = text.split("-");

    const otp = await ResetPassword.findOne({
      email: email,
      isVerified: true,
    }).exec();
    if (!otp) {
      return res
        .status(400)
        .send({ message: "OTP is invalid or it may be expired!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.findOneAndUpdate(
      { email: email },
      { password: hashedPassword }
    ).exec();

    await ResetPassword.findOneAndDelete({ email: email }).exec();

    res.status(200).send({ message: "Password reset successfully" });
  } catch (err) {
    res.status(400).send({ message: "Error occured" });
  }
};
module.exports = resetPassword;
