const User = require("models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

exports.signup = async (req, res, next) => {
  try {
    const { firstName, lastName, role, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || "view",
      isActive: true
    });

    await newUser.save();

    res.send(`${newUser.firstName} ${newUser.lastName} account creation was successful`);

  } catch (error) {
    next(error);
  }
};
