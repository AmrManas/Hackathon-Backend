const User = require("../../models/user/User.model");

const me = async (req, res) => {
  const { _id: userId } = req.user;
  const user = await User.findById(userId).populate("primary_email");
  res.send({
    success: true,
    user: {
      _id: user._id,
      is_active: user.is_active,
      name: user.name,
      popular: user.popular,
      companyName: user.companyName,
      experience: user.experience,
      reraNumber: user.reraNumber,
      employees: user.employees,
      role: user.role,
      type: user.type,
      email: user.primary_email.contact_mech_value,
      address: {
        state: user.address.state,
        city: user.address.city,
        officeAddress: user.address.officeAddress,
      },
      interests: {
        specialization: user.interests.specialization,
        languagePreference: user.interests.languagePreference,
        interest: user.interests.interest,
      },
    },
  });
};

module.exports = me;
