import express from "express";
import { checkAuth } from "../middlewares/auth.middleware";
import * as LearningDataController from "../controllers/learningAnalysis.controllers";

const router = express.Router();

// DA FIXARE

router
  .route("/")
  .post(checkAuth, LearningDataController.createAction)
  .get(checkAuth, LearningDataController.getAllAction);

/* IN SOSPESO
router
  .route("/filterActions")
  .get(checkAuth, LearningDataController.getActionsByFilter);
*/
router
  .route("/userId/:id")
  .get(checkAuth, LearningDataController.getActionByUserId);

router
  .route("/userIds/:ids")
  .get(checkAuth, LearningDataController.getActionsByUserIds);

router
  .route("/actionType/:id")
  .get(checkAuth, LearningDataController.getActionByActionType);

router
  .route("/actionTypes/:ids")
  .get(checkAuth, LearningDataController.getActionsByActionTypes);

router
  .route("/zoneId/:id")
  .get(checkAuth, LearningDataController.getActionByZoneId);

router
  .route("/zoneIds/:ids")
  .get(checkAuth, LearningDataController.getActionsByZoneIds);

router
  .route("/platform/:id")
  .get(checkAuth, LearningDataController.getActionByPlatform);

router
  .route("/platforms/:ids")
  .get(checkAuth, LearningDataController.getActionsByPlatforms);

router
  .route("/flowId/:id")
  .get(checkAuth, LearningDataController.getActionByFlowId);

router
  .route("/flowIds/:ids")
  .get(checkAuth, LearningDataController.getActionsByFlowIds);

router
  .route("/calcTimeOnTool")
  .get(checkAuth, LearningDataController.calculateTimeOnTool);

/*
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
*/
export default router;
