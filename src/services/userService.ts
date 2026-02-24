import { UserModel } from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AppError } from "../utils/appError";
import { LoginInput, RegisterInput } from "../validation/userValidate";

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

export const login = async (data: LoginInput) => {
  const user = await UserModel.findOne({ email: data.email }).select('+password');
  if (!user) {
    throw new AppError("Incorrect email or password", 400);
  }
  const isMatch =
    data.password && user.password
      ? await bcrypt.compare(data.password, user.password)
      : false;
  if (!isMatch) {
    throw new AppError("Incorrect email or password", 400);
  }
  return {
    token: generateJWT(user._id.toString()),
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  };
};

const generateJWT = (userId: string): string => {
  if (!process.env.SECRET_KEY) {
    throw new AppError("SECRET_KEY is not defined", 500);
  }
  if (!userId) {
    throw new AppError("payload not found", 400);
  }
  return jwt.sign({ userId: userId }, process.env.SECRET_KEY as string, {
    expiresIn: "7d",
  });
};
