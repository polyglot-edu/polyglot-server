import express from "express";
import { checkAuth } from "../middlewares/auth.middleware";
import * as LearningDataController from "../controllers/learningAnalysis.controllers";

const router = express.Router();

// DA FIXARE

router.route("/").post(checkAuth, LearningDataController.createAction);

router
  .route("/filterActions")
  .get(checkAuth, LearningDataController.getActionsByFilter);

router
  .route("/:id/user")
  .get(checkAuth, LearningDataController.getActionByUser);

router
  .route("/:id/type")
//  .get(checkAuth, LearningDataController.getActionByType);

router
  .route("/:password/serverClean") //API to clean the server from empty flows
//  .get(LearningDataController.serverCleanUp);

router
  .route("/:id/runFirst") //first version of the notebook (run the execution from the first call)
//  .get(LearningDataController.downloadNotebookVSC);

router
  .route("/:ctxId/run/:filename") // version of notebook with only ctx information
//  .get(LearningDataController.downloadNotebookVSCCTX);

router
  .route("/:id/:ctxId/run/:filename") //2nd version of notebook with ctx information and flowId
//  .get(LearningDataController.downloadNotebookVSC2);

router
  .route("/:id/publish") //function to publish the flow
//  .put(checkAuth, LearningDataController.publishFlow);

export default router;
