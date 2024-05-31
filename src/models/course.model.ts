import mongoose, { Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import validator from "validator";

export type CourseDocument = Document & {
  title: string;
  description: string;
  author: string;
  flows: string[];
};

const courseSchema = new mongoose.Schema<CourseDocument>({
  _id: {
    type: String,
    required: true,
    default: () => uuidv4(),
    validate: {
      validator: (id: string) => validator.isUUID(id),
      message: "Invalid UUID-v4",
    },
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true, ref: "User" },
  flows: [{ type: String, ref: "Flow" }],
});

const Course = mongoose.model<CourseDocument>("Course", courseSchema);

export default Course;
