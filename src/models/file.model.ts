import mongoose, { model, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import validator from "validator";
import { PolyglotFileInfo } from "../types/PolyglotFile";

const fileSchema = new mongoose.Schema<PolyglotFileInfo>({
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

export interface PolyglotFileModel extends Model<PolyglotFileInfo> {}

export default model<PolyglotFileInfo, PolyglotFileModel>("File", fileSchema);
