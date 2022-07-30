const createError = require("http-errors");

const Task = require("../../../models/project/Task.model");

const createTask = async (req, res, next) => {
  const { title, description, panel } = req.body;

  try {
    const createTask = new Task({
      title: title,
      description: description,
      panel: panel,
    });

    const createdTask = await createTask.save();

    if (!createdTask) {
      throw createError.InternalServerError(
        "Your request could not be processed. Please contact support or try again after some time."
      );
    }

    res.status(200).send({
      message: "success",
      data: createTask,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = createTask;
