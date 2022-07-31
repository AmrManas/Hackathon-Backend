const qr = require("qrcode");
const jwt = require("jsonwebtoken");
const User = require("../../models/user/User.model");
const createError = require("http-errors");

const generateQR = async (req, res, next) => {
  const { id } = req.headers;
  console.log(id);
  try {
    // let data = {
    //   link: `http://127.0.0.1:5000?q=${id}`,
    // };

    const decoded = jwt.decode(id, { complete: true });
    console.log("decoded.payload", decoded.payload);

    const userCheck = await User.findOne({
      _id: decoded.payload._id,
    });

    if (!userCheck) {
      throw createError.BadRequest("User not found");
    }

    let strData = JSON.stringify(`http://127.0.0.1:5000/${id}`);
    qr.toString(strData, { type: "terminal" }, function (err, code) {
      if (err) return console.log("error occurred");
      console.log(code);
    });

    qr.toDataURL(strData, function (err, code) {
      if (err) return console.log("error occurred");

      res.status(200).send({
        message: "success",
        data: code,
      });
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = generateQR;
