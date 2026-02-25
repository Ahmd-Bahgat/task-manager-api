import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import jwt from "jsonwebtoken";


const validateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorizationHeader = req.get("authorization");
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    throw new AppError("Unauthorized", 401);
  }
  const token = authorizationHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY as string) as {
      userId: string;
    };
    req.userId = payload.userId;
    next();
  } catch (error) {
    return next(new AppError("Unauthorized", 401));
  }
};

export default validateJWT;
