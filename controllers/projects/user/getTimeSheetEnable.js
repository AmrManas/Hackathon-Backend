const User = require("../../../models/user/User.model");

const getTimeSheetEnable = async (req, res, next) => {
  const { id } = req.params;

  try {
    const getTimeSheetEnable = await User.findOne({
      _id: id,
    });

    res.status(200).send({
      message: "success",
      enabled: getTimeSheetEnable?.is_time_active,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = getTimeSheetEnable;
