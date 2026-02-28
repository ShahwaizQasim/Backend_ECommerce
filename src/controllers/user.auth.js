import { UserModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ENV } from "../config/constant.js";

const UserRegister = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName) {
      res
        .status(400)
        .send({ status: 400, message: "userName is required", error: true });
    }
    if (!email) {
      res
        .status(400)
        .send({ status: 400, message: "email is required", error: true });
    }
    if (!password) {
      res
        .status(400)
        .send({ status: 400, message: "password is required", error: true });
    }
    const existedUser = await UserModel.findOne({ email });
    if (existedUser) {
      res
        .status(400)
        .send({ status: 400, message: "User Already Exist", error: true });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    let addUser = await UserModel({
      userName,
      email,
      password: passwordHash,
    });
    addUser = await addUser.save();
    res
      .status(201)
      .send({ status: 201, message: "User Register Successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ status: 500, message: error.message || "", error: true });
  }
};

const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      res
        .status(400)
        .send({ status: 400, message: "email is required", error: true });
    }
    if (!password) {
      res
        .status(400)
        .send({ status: 400, message: "password is required", error: true });
    }
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // 2. password compare karo

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      ENV.JWT_SECRET_KEY,
      { expiresIn: "7d" },
    );
     res
      .status(201)
      .send({ status: 201, message: "User Login Successfully", token:token});
  } catch (error) {
       res
      .status(500)
      .send({ status: 500, message: error.message || "", error: true });
    console.log(error);
    
  }
};

export { UserRegister, UserLogin };
