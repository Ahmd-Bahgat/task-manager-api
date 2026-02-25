import { ProjectModel } from "../models/projectModel";
import { TaskModel } from "../models/taskModel";
import { AppError } from "../utils/appError";
import { ITask } from "../validation/taskValidate";

export const addTask = async (data: ITask, userId: string) => {
  const project = await ProjectModel.findOne({_id:data.projectId, owner:userId});

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  const task = await TaskModel.create({
    title: data.title,
    description: data.description,
    projectId: data.projectId,
    dueDate: data.dueDate,
    createdBy: userId,
  });
  return task;
};
