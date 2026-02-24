import {Request, Response} from 'express'
import { login, register } from "../services/userService";
import { AppError } from "../utils/appError";
import { zLoginSchema, zUserSchema } from "../validation/userValidate";

export const userRegisterController = async (req: Request, res: Response) => {
  const parsed = zUserSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError("Registration data is invalid", 400);
  }
  const data = await register(parsed.data);
  res.status(201).json({
    message: "user registered successfully",
    ...data,
  });
};

export const userLoginController = async (req: Request, res: Response) => {
  const parsed = zLoginSchema.safeParse(req.body)
  if(!parsed.success){
    throw new AppError('Login data is invalid', 400)
  }
  const data = await login(parsed.data)
  res.status(200).json({
    message: "login user successfully",
    ...data
  })
}

