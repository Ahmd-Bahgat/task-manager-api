import { ProjectModel } from "../models/projectModel";
import { AppError } from "../utils/appError";

interface ProjectInput {
  name: string;
  description: string;
  owner: string;
}
export const createProject = async ({
  name,
  description,
  owner,
}: ProjectInput) => {
  const project = await ProjectModel.create({ name, description, owner });
  return project;
};
