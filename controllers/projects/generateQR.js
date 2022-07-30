const qr = require("qrcode");
const User = require("../../models/user/User.model");
const createError = require("http-errors");

const generateQR = async (req, res, next) => {
  const { id } = req.params;
  try {
    const checkUser = await User.findOne({
      _id: id,
    });

    if (!checkUser) {
      throw createError.Unauthorized(
        "Please try again! email / password is not correct"
      );
    }

    let data = {
      link: `http://localhost:5000/${checkUser?.accessToken}`,
    };

    let strData = JSON.stringify(data);
    console.log(checkUser?.accessToken);

    qr.toString(strData, { type: "terminal" }, function (err, code) {
      if (err) return console.log("error occurred");
      console.log(code);
    });

    qr.toDataURL(strData, function (err, code) {
      if (err) return console.log("error occurred");

      res.status(200).send({
        message: "success",
        data: code,
        accessToken: checkUser?.accessToken,
      });
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = generateQR;
