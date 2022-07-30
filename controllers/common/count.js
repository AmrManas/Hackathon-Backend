const Property = require("../../models/property/Property.model");
const User = require("../../models/user/User.model");

const count = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id });

    const a = [
      async () => {
        const totalProperty = await Property.countDocuments({
          user: user._id,
        });
        return { totalProperty };
      },
      async () => {
        const totalAgents = await User.countDocuments({
          type: "agent",
        });
        return { totalAgents };
      },
      async () => {
        const verifiedProperty = await Property.countDocuments({
          $and: [
            {
              user: user._id,
            },
            {
              verifyStatus: "verified",
            },
          ],
        });
        return { verifiedProperty };
      },
      async () => {
        const pendindProperty = await Property.countDocuments({
          $and: [
            {
              user: user._id,
            },
            {
              verifyStatus: "pending",
            },
          ],
        });
        return { pendindProperty };
      },
      async () => {
        const totalUser = await User.countDocuments({});
        return { totalUser };
      },
      async () => {
        const totalCustomer = await User.countDocuments({
          type: "customer",
        });
        return { totalCustomer };
      },
      // async () => {
      //   const totalAgents = await User.countDocuments({ type: "agent" });
      //   return { totalAgents };
      // },
      async () => {
        const totalBuilder = await User.countDocuments({
          type: "builder",
        });
        return { totalBuilder };
      },
      async () => {
        const totalOwner = await User.countDocuments({ type: "developer" });
        return { totalOwner };
      },
    ];

    const data = await Promise.all(a.map(async (f) => f()));
    const response = {};
    data.forEach((d) => {
      Object.assign(response, d);
    });

    res.status(200).json({
      data: response,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = count;
