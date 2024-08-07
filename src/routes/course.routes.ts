import express from "express";
import { checkAuth } from "../middlewares/auth.middleware";
import * as CourseController from "../controllers/course.controller";

const router = express.Router();
// cambiare tutto con flow

router.route("/:id")
  .delete(checkAuth, CourseController.deleteCourse)
  .put(checkAuth, CourseController.editInfo);
router
  .route("/")
  .post(checkAuth, CourseController.createCourse)
  .get(checkAuth, CourseController.getCourses);
router.route("/createAI").post(checkAuth, CourseController.saveAICourse);
// get enrolled courses
export default router;
