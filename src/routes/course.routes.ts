import express from 'express';
import { checkAuth } from '../middlewares/auth.middleware';
import * as CourseController from '../controllers/course.controller';

const router = express.Router();
// cambiare tutto con flow

router.route("/:id")
    .delete(checkAuth, CourseController.deleteCourse);
router.put("/:userId/update/:courseId", CourseController.updateCourse);
router.put("/:userId/add/:courseId/:flow", CourseController.addFlow);
router.put("/:id/enroll", checkAuth, CourseController.enrollCourse);
router.put("/:userId/unenroll/:courseId", CourseController.unenrollCourse);
router.route("/")
    .post(checkAuth, CourseController.createCourse)
    .get(checkAuth, CourseController.getCourses);
// get enrolled courses
export default router;