import express, { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { zUserSchema } from "../validation/userValidate";
import { AppError } from "../utils/appError";
import { register } from "../services/userService";
import {
  userLoginController,
  userRegisterController,
} from "../controllers/userController";
import validateJWT from "../middlewares/validateJWT";

const router = express.Router();

router.post("/register", asyncHandler(userRegisterController));

router.post("/login" ,asyncHandler(userLoginController));

export default router;
