import mongoose, { model, Model } from "mongoose";
import { PolyglotFlow } from "../types/PolyglotFlow";
import { v4 as uuidv4 } from "uuid";
import validator from "validator";

export const flowSchema = new mongoose.Schema<PolyglotFlow>({
  _id: {
    type: String,
    required: true,
    default: () => uuidv4(),
    validate: {
      validator: (id: string) => validator.isUUID(id),
      message: "Invalid UUID-v4",
    },
  },
  author: {
    type: String,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
    default: " ",
  },
  publish: {
    type: Boolean,
    required: true,
    default: false,
  },
  learningContext: {
    type: String,
    required: false,
    default: " ",
  },
  duration: {
    type: Number,
    required: false,
    default: 0,
  },
  topics: [
    {
      type: String,
      required: false,
      default: " ",
    },
  ],
  tags: [
    {
      type: {
        name: { type: String },
        color: { type: String },
      },
      default: [],
    },
  ],
  nodes: [{ type: String, required: true, ref: "Node" }],
  edges: [{ type: String, required: true, ref: "Edge" }],
  execution: {
    type: {
      algo: { type: String, default: "Random Execution" },
    },
  },
  overallGrade: { type: Number, required: false, default: null },
  executedTimes: { type: Number, required: false, default: null }
});

export interface PolyglotFlowModel extends Model<PolyglotFlow> {}

export default model<PolyglotFlow, PolyglotFlowModel>("Flow", flowSchema);
