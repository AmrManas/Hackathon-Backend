const User = require("../../models/user/User.model");
const ContactMech = require("../../models/ContactMech.model");

const userDetails = async (req, res, next) => {
  const { email } = req.params;

  console.log(req.body);

  const user = await ContactMech.findOne({ contact_mech_value: email });

  console.log(user);

  try {
    const userDetails = await User.findOne({ _id: user.user });

    res.status(200).send({
      success: true,
      userDetails,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = userDetails;
