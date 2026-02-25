import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import jwt from "jsonwebtoken";
import { AnyBulkWriteOperation } from "mongoose";


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

  // jwt.verify(token, process.env.SECRET_KEY as string, (err, payload) => {
  //   if(!process.env.SECRET_KEY){
  //     throw new AppError('SECRET_KEY is not defined', 404)
  //   }
  //   if(err || !payload || typeof payload === 'string'){
  //     throw new AppError('Unauthorized', 401)
  //   }
  //   req.userId = payload.userId
  //   next()
  // })
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY as string) as {
      userId: string;
    };
    req.userId = payload.userId;
    next();
  } catch (error:any) {
    return next(new AppError(`Unauthorized ${error.message}`, 401));
  }
};

export default validateJWT;
