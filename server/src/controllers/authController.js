const User = require("../models/userModel");
const { ROLES } = require("../utils/global");

exports.register = async (req, res, next) => {
  const { email, password, full_name, display_name } = req.body;

  try {
    await User.checkDuplicateEmail(email);

    const user = await new User({
      email,
      password,
      full_name,
      display_name,
      role: ROLES.USER,
      createdAt: new Date(),
    }).save();

    const token = await user.createToken();
    const authUser = await user.transform();

    return res.json({ authUser, token });

    // const activationToken = await user.getActivationToken(ROLES.USER);

    // return res.json({
    //   activationToken,
    //   activationLink: `https://${req.get(
    //     "host"
    //   )}/v1/auth/activate?token=${activationToken}`,
    //   user,
    // });
  } catch (err) {
    return next(err);
  }
};

exports.activate = async (req, res, next) => {
  try {
    const { token } = req.query;

    const user = await User.activateWithToken(token);

    return res.json({
      user,
      message: "Account is successfully activated",
    });
  } catch (err) {
    return next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, role: { $ne: ROLES.DISABLED } });

    if (user) {
      if (await user.passwordMatches(password)) {
        const token = await user.createToken();
        const authUser = await user.transform();

        return res.json({ authUser, token });
      } else {
        throw error({
          status: httpStatus.UNAUTHORIZED,
          message: "Invalid password",
        });
      }
    } else {
      throw error({
        status: httpStatus.UNAUTHORIZED,
        message: "Invalid email - user does not exist",
      });
    }
  } catch (err) {
    return next(err);
  }
};
