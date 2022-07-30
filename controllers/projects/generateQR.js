const qr = require("qrcode");

const generateQR = async (req, res, next) => {
  try {
    let data = {
      id: 1,
      name: "User",
      email: "user@gmail.com",
    };

    let strData = JSON.stringify(data);

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
