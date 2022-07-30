const User = require("../../models/user/User.model");

const me = async (req, res) => {
  const { _id: userId } = req.user;
  const user = await User.findById(userId).populate("primary_email");
  res.send({
    success: true,
    user: {
      _id: user._id,
      name: user.name,
      is_time_active: user.is_time_active,
      role: user.role,
      type: user.type,
      email: user.primary_email.contact_mech_value,
      accessToken: user.accessToken,
      address: {
        state: user.address.state,
        city: user.address.city,
        officeAddress: user.address.officeAddress,
      },
    },
  });
};

module.exports = me;
