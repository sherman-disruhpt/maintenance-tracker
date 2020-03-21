const jwt = require("jsonwebtoken");
const User = require("models/userModel");

function ExpiredException() {
  this.message =
    "JWT token has expired, please authenticate to obtain a new one";
  this.name = "Expired";
}

module.exports = async (req, res, next) => {
  if (req.headers["x-access-token"]) {
    try {
      const accessToken = req.headers["x-access-token"];

      const { userId, exp } = await jwt.verify(
        accessToken,
        process.env.JWT_SECRET
      );
      // If token has expired
      if (exp < Date.now().valueOf() / 1000) {
        throw new ExpiredException();
      }
      res.locals.loggedInUser = await User.findById(userId);

      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
};
