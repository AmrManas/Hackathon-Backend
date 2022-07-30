const User = require("../../../models/user/User.model");

const updateTimeSheet = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req.body;

  try {
    const updateTimeSheet = await User.findOneAndUpdate(
      {
        _id: id,
      },
      body
    );

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
