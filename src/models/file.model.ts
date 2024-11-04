import mongoose, { model, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import validator from "validator";

const fileSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    default: "",
  },
  filename: {
    type: String,
    required: true,
    default: "test",
  },
  path: {
    type: String,
    required: true,
    default: "path/",
  },
  uploadedAt: { type: Date, default: Date.now },
});

const FileMaterial = mongoose.model("File", fileSchema);

export default FileMaterial;
