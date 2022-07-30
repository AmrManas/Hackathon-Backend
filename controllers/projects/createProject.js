const createError = require("http-errors");

const Project = require("../../models/project/Project.model");

const CreateProject = async (req, res, next) => {
  const { title, description } = req.body;

  try {
    const createProject = new Project({
      title: title,
      description: description,
    });

    const createdProject = await createProject.save();

    if (!createdProject) {
      throw createError.InternalServerError(
        "Your request could not be processed. Please contact support or try again after some time."
      );
    }

    return res.status(200).json({
      success: true,
      data: createdProject,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = CreateProject;
