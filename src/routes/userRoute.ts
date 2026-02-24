import express, {Request, Response} from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { zUserSchema } from "../validation/userValidate";
import { AppError } from "../utils/appError";
import { register } from "../services/userService";


const router = express.Router();

router.post(
  "/register",
  asyncHandler(async (req:Request, res:Response) => {
    const parsed = zUserSchema.safeParse(req.body)
    if(!parsed.success){
        throw new AppError('Registration data is invalid', 400)
    }
    const data = await register(parsed.data)
    res.status(201).json({
      message: 'user registered successfully',
      ...data
    })
  }),
);

export default router