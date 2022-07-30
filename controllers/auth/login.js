const bcrypt = require("bcryptjs");
const createError = require("http-errors");

const User = require("../../models/user/User.model");
const UserLoginMech = require("../../models/UserLoginMech.model");
const Token = require("../../models/Token.model");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../services/generate_token");
const { accessTokenLife, refreshTokenLife } = require("../../config/keys").jwt;

const loginUser = async (req, res, next) => {
  const { apikey } = req.headers;
  try {
    const decoded = Buffer.from(apikey, "base64").toString().split(":");
    [this.email, this.password] = decoded;
    console.log(decoded);

    const userLogin = await UserLoginMech.findOne({
      login_mech_value: this.email,
    });
    console.log(userLogin, "userLogin");
    if (!userLogin) {
      throw createError.BadRequest("User not found");
    }

    const isMatch = await bcrypt.compare(this.password, userLogin.password);

    console.log(isMatch, "isMatch", this.password, userLogin.password);

    if (!isMatch) {
      throw createError.Unauthorized(
        "Please try again! email / password is not correct"
      );
    }

    const { _doc: payload } = await User.findById(userLogin.user).populate(
      "primary_email"
    );

    const accessToken = await generateAccessToken(payload, accessTokenLife);
    const refreshToken = await generateRefreshToken(payload, refreshTokenLife);

    if (accessToken && refreshToken) {
      const token = new Token({
        user: payload._id,
        refreshToken: refreshToken,
      });
      token.save();

      res.status(200).json({
        success: true,
        accessToken,
        refreshToken,
        user: payload,
      });
    }
  } catch (error) {
    console.log("error: ", error);
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = loginUser;
