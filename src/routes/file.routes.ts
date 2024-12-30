import express from "express";
import * as FileControllers from "../controllers/file.controllers";
import { checkAuth } from "../middlewares/auth.middleware";

const router = express.Router();
router.post("/upload/:id", checkAuth, FileControllers.uploadFile);
router.get("/download/:id", checkAuth, FileControllers.download);
router
  .route("/:password/serverClean") //API to clean the server from empty flows
  .get(FileControllers.fileCleanUp);

export default router;
