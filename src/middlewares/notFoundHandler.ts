import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server`, 404),
  );
};
