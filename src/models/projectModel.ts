import mongoose, { Schema, Types } from "mongoose";

const projectSchema = new Schema(
  {
    name: { type: String, required: true, minlength:2, maxlength: 50},
    description: {type:String, maxlenght:250},
    owner: { type: Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);
projectSchema.index({name:1, owner:1},{unique:true})

export const ProjectModel = mongoose.model('Project', projectSchema)