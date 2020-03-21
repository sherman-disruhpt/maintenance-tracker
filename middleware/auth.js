const jwt = require("jsonwebtoken");
const AccessControl = require("accesscontrol");
const bcrypt = require("bcrypt");
const User = require("models/userModel");
const url = require("url");

const roles = (() => {
  const ac = new AccessControl();

  ac.grant("view").readAny("records");

  ac.grant("search").readAny("records");

  ac.grant("list").readAny("records");

  ac.grant("add").createAny("records");

  ac.grant("update").updateAny("records");

  ac.grant("delete").deleteAny("records");

  ac.grant("read-only")
    .extend("view")
    .extend("search")
    .extend("list");

  ac.grant("write")
    .extend("read-only")
    .extend("add")
    .extend("update")
    .extend("delete");

  ac.grant("admin")
    .extend("read-only")
    .extend("write")
    .createAny("users")
    .readAny("users")
    .updateAny("users")
    .deleteAny("users");

  return ac;
})();

const validatePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

function PermissionException() {
  this.message = "You don't have enough permission to perform this action";
  this.name = "Permission";
}

function AuthenticationException() {
  this.message = "You need to be authenticated in to access this route";
  this.name = "Authentication";
}

exports.authenticate = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new Error("Email does not exist"));
    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) return next(new Error("Password is not correct"));
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });
    await User.findByIdAndUpdate(user._id, { accessToken });
    res.status(200).json({
      data: { email: user.email, role: user.role },
      accessToken
    });
  } catch (error) {
    next(error);
  }
};

exports.allowIfAuthenticated = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser;
    if (!user) throw new AuthenticationException();
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

exports.checkAccess = async (req, res, next) => {
  const route = url.parse(req.url, false, true).pathname.split("/")[1];

  let action;

  switch (req.method) {
    case "POST":
      action = "createAny";
      break;
    case "PUT":
      action = "updateAny";
      break;
    case "GET":
      action = "readAny";
      break;
    case "DELETE":
      action = "deleteAny";
      break;
    default:
      break;
  }

  try {
    const permission = roles.can(req.user.role)[action](route);
    if (!permission.granted) {
      throw new PermissionException();
    }
    next();
  } catch (error) {
    next(error);
  }
};
