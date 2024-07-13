const User = require("../models/user");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + 3 * 60 * 60 * 1000);

      // Set cookies with expiration date
      res.cookie("full_name", user.full_name, {
        httpOnly: true,
        sameSite: "None",
        secure: false,
        expires: expirationDate,
      });
      res.cookie("email", user.email, {
        httpOnly: true,
        sameSite: "None",
        secure: false,
        expires: expirationDate,
      });
      res.cookie("role", user.user_type, {
        httpOnly: true,
        sameSite: "None",
        secure: false,
        expires: expirationDate,
      });
      res.cookie("id", user.id, {
        httpOnly: true,
        sameSite: "None",
        secure: false,
        expires: expirationDate,
      });

      return res.status(200).send({ user });
    } else {
      return res.status(401).send({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const createAccount = async (req, res) => {
  try {
    const { email, password, full_name } = req.body;

    // to validate email format is correct or not
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({ message: "Invalid email format" });
    }

    if (!password) {
      return res.status(400).send({ message: "Password is required" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).send({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      email,
      full_name,
      password: hashedPassword,
      user_type: "user", // Default to 'user' type
    });

    return res.status(201).send({ message: "True" }); //userId: newUser.id
  } catch (error) {
    console.error("Error creating user account:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const listUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "full_name"],
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error listing users:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { loginUser, createAccount, listUsers };
