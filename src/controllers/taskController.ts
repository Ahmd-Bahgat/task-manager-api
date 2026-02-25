import { Request, Response } from "express";
import { zTaskSchema } from "../validation/taskValidate";
import { AppError } from "../utils/appError";
import { addTask } from "../services/taskService";

export const taskController = async (req: Request, res: Response) => {
  const userId = req.userId;
  const parsed = zTaskSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError("Input task data is invalid", 400);
  }

  const data = await addTask(parsed.data, userId as string);

  res.status(201).json({
    message: `created task successfully`,
    data,
  });
};
