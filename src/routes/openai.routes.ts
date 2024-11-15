import express from "express";
import * as OpenAiControllers from "../controllers/openai.controllers";

const router = express.Router();

router.post("/genRes", OpenAiControllers.genResource);
router.post("/genGraph", OpenAiControllers.genConceptMap);
router.post("/MaterialAnalyser", OpenAiControllers.genResource);
router.post("/LearningObjectiveGenerator", OpenAiControllers.genResource);
router.post("/MaterialGenerator", OpenAiControllers.genResource);
router.post("/Summarizer", OpenAiControllers.genResource);
router.post("/ActivityGenerator", OpenAiControllers.genResource);

export default router;
