const Profile = require("../../models/profile/Profile.model");

const profile = async (req, res, next) => {
  const { body } = req;

  try {
    const profile = await Profile.create(body);
    res.send(profile);
  } catch (error) {
    next(error);
  }
};

module.exports = profile;
