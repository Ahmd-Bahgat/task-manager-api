import { UserModel } from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AppError } from "../utils/appError";
import { RegisterInput } from "../validation/userValidate";

export const register = async (data: RegisterInput) => {
  const exists = await UserModel.findOne({ email: data.email });
  if (exists) {
    throw new AppError("User already exists", 400);
  }
  const hashedPassword = await bcrypt.hash(data.password, 12);
  const user = await UserModel.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: hashedPassword,
  });
  return {
    token: generateJWT(user._id.toString()),
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  };
};

const generateJWT = (payload: string) => {
  if (!process.env.SECRET_KEY) {
    throw new AppError("SECRET_KEY is not defined", 500);
  }
  if (!payload) {
    throw new AppError("payload not found", 400);
  }
  return jwt.sign({ userId: payload }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
};
