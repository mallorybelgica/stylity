require("dotenv").config();
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    profile_pic: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
  },
  { collection: "users" }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

userSchema.statics.activateWithToken = async function (token) {
  try {
    const decoded = jwt.decode(token, JWT_KEY);
    const user = await this.findOneAndUpdate(
      { _id: decoded.user, role: ROLES.DISABLED },
      { role: decoded.role, createdAt: decoded.createdAt },
      { new: true }
    );

    return user;
  } catch (err) {
    throw error({ status: 400, err, message: "Invalid activation token" });
  }
};

userSchema.statics.checkDuplicateEmail = async function (email) {
  const user = await this.findOne({ email });

  if (user) {
    throw error({
      status: httpStatus.CONFLICT,
      message: "user already exists",
    });
  }
};

userSchema.method({
  getActivationToken: async function (role) {
    try {
      const user = this;
      if (user) {
        const payload = {
          iat: Date.now(),
          exp: Date.now() + 60 * 60 * 24,
          createdAt: user.createdAt,
          user: user._id,
          role: role,
        };
        return jwt.sign(payload, JWT_KEY);
      }
    } catch (err) {
      throw err;
    }
  },
  createToken: function () {
    const user = this;
    const payload = {
      iat: Date.now(),
      exp: Date.now() + 60 * 60 * 24,
      user: user._id,
    };
    return jwt.sign(payload, JWT_KEY);
  },
  passwordMatches: function (password) {
    return bcrypt.compare(password, this.password);
  },
  transform: function () {
    const user = this;
    const transformed = {};

    const fields = [
      "_id",
      "first_name",
      "last_name",
      "email",
      "telephone",
      "authToken",
      "role",
      "createdAt",
    ];

    fields.forEach((field) => {
      transformed[field] = user[field];
    });

    return transformed;
  },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
