const User = require("../../../models/user/User.model");

const getPopularAgentList = async (req, res, next) => {
  const { popular } = req.query;

  try {
    const getPopularAgentList = await User.find({
      popular: popular,
    });

    res.status(200).send({
      message: "Success",
      data: getPopularAgentList,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = getPopularAgentList;
