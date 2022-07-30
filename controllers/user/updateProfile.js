var ObjectId = require("mongoose").Types.ObjectId;
const User = require("../../models/user/User.model");

const updateProfile = async (req, res, next) => {
  const { id } = req.params;
  const fields = req.body;

  try {
    const updateProfile = await User.findOneAndUpdate(
      {
        _id: ObjectId(id),
      },
      {
        name: fields.name,
        companyName: fields.companyName,
        experience: fields.experience,
        reraNumber: fields.reraNumber,
        employees: fields.employees,
        address: {
          state: fields.address.state,
          city: fields.address.city,
          officeAddress: fields.address.officeAddress,
        },
        interests: {
          specialization: fields.interests.specialization,
          languagePreference: fields.interests.languagePreference,
          interest: fields.interests.interest,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updateProfile,
    });
  } catch (error) {
    console.log("error in updating profile: ", error);
    next(error);
  }
};

module.exports = updateProfile;
