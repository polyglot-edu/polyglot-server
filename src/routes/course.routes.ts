import express from "express";
import { checkAuth } from "../middlewares/auth.middleware";
import * as CourseController from "../controllers/course.controllers";

const router = express.Router();
// cambiare tutto con flow

router.route("/:id").delete(checkAuth, CourseController.deleteCourse);
router
  .route("/")
  .post(checkAuth, CourseController.createCourse)
  .get(checkAuth, CourseController.getCourses);

// get enrolled courses
export default router;
