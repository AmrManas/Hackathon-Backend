const createError = require("http-errors");
const Task = require("../../../models/project/Task.model");

const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const updateTask = await Task.findByIdAndUpdate(
      {
        _id: id,
      },
      body
    );

    if (!updateTask) {
      throw createError.InternalServerError(
        "Your request could not be processed. Please contact support or try again after some time."
      );
    }

    res.status(200).send({
      message: "success",
      data: updateTask,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = updateTask;
