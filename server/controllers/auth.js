import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../model/User.js";

export const SignUp = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordhash = await bcrypt.hash(password, salt);
    const newUser = new UserModel({ username, password: passwordhash, email });
    const savedUser = await newUser.save();
    delete savedUser.password;
    res.json(savedUser).status(201);
  } catch (error) {
    res.json(error.message).status(500);
  }
};

export const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await UserModel.findOne({ email: email });
    if (!user) return res.status(400).json({ error: "Invaild email" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invaild password" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.json({ token, user }).status(200);
  } catch (error) {
    res.send(error).status(500);
  }
};
