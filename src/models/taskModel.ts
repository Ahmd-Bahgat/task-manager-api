import mongoose, { Schema, Types } from "mongoose";

const taskSchema = new Schema(
  {
    title: { type: String, required: true, minlength: 3, maxlength: 100 },
    description: { type: String, maxlength: 300 },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
      required: true,
    },
    projectId: { type: Types.ObjectId, ref: "Project", required: true },
    createdBy: { type: Types.ObjectId, ref: "User", required: true },
    dueDate: Date,
  },
  { timestamps: true },
);

taskSchema.index({ projectId: 1, title: 1 }, { unique: true });
taskSchema.index({ projectId: 1, status: 1 });

export const TaskModel = mongoose.model("Task", taskSchema);
