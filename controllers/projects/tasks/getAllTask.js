const Task = require("../../../models/project/Task.model");

const getAllTask = async (req, res, next) => {
  // const { panel } = req.query;
  try {
    const getAllTask = await Task.find({
      // panel: panel,
    });

    res.status(200).send({
      message: "success",
      data: getAllTask,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getAllTask;
