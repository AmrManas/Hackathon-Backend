const User = require("../../../models/user/User.model");
const createError = require("http-errors");

const updateTimeSheet = async (req, res, next) => {
  const { id } = req.headers;
  const { body } = req;

  try {
    const decryptedId = atob(id);
    const updateTimeSheet = await User.findOneAndUpdate(
      {
        _id: decryptedId,
      },
      body
    );

    if (!updateTimeSheet) {
      throw createError.BadRequest("User not found");
    }

    res.status(200).send({
      message: "success",
      data: updateTimeSheet,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = updateTimeSheet;
