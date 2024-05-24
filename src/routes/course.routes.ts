import express from 'express';
import * as CourseController from '../controllers/course.controller';

const router = express.Router();
// cambiare tutto con flow
router.post("/:userId/create", CourseController.createCourse);
router.delete("/:userId/delete/:courseId", CourseController.deleteCourse);
router.put("/:userId/update/:courseId", CourseController.updateCourse);
router.put("/:userId/add/:courseId/:flow", CourseController.addFlow);
router.put("/:userId/enroll/:courseId", CourseController.enrollCourse);
router.put("/:userId/unenroll/:courseId", CourseController.unenrollCourse);
router.get("/", CourseController.getCourses);
// get enrolled courses
export default router;