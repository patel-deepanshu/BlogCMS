import { StatusCodes } from "http-status-codes";
import UserModel from "../models/userModel.js";
import {
  BadRequestError,
  UnAuthorizedError,
  UnauthenticatedError,
} from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const Register = async (req, res) => {
  const user = await UserModel.findOne();

  if (user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Admin already Exits" });
  }
  try {
    await UserModel.create(req.body);
  } catch (error) {
    console.log(error);
  }
  res.status(StatusCodes.OK).json({ msg: "Register Successful" });
};
export const Login = async (req, res) => {
  const user = await UserModel.findOne({ username: req.body.username });

  if (!user) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Username not found" });
  }
  const isValidUser = user && req.body.password === user.password;

  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

  const token = createJWT({ userId: user._id });

  const sevenDays = 1000 * 60 * 60 * 24 * 7;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + sevenDays),
    secure: process.env.NODE_ENV === "production",
    ...(process.env.NODE_ENV === "production" ? { sameSite: "none" } : {}),
  });
  res.status(StatusCodes.OK).json({ msg: "Login Successful" });
};

export const GetUser = async (req, res) => {
  const user = await UserModel.findById(req.user.userId);
  if (!user) {
    throw new UnAuthorizedError("Cannot Get User");
  } else {
    return res.status(200).json({ user });
  }
};

export const Logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
