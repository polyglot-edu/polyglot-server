import { Request, Response } from "express";
import User from "../models/user.model";
import Course from "../models/course.model";
import Flow from "../models/flow.model";

export async function createCourse(req: Request, res: Response) {
  const userId = req.user?._id;
  const { title, description, flowsId } = req.body;

  try {
    if (!userId) {
      return res.status(400).send("userId is required");
    }

    if (!title) res.status(400).send("title is required");

    if (!description) res.status(400).send("description is required");

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (await Course.findOne({ title: title })) {
      return res.status(400).send("Course already exists");
    }
    /*      IMPLEMENT THIS LATER
        let flowsNotFound: string[] = [];
        console.log(flowsId);
        if(flowsId.length > 0){
            for (const flow of flowsId) {
                const dbflow = await Flow.findOne({ _id: flow });
                if (!dbflow) {
                    flowsNotFound.push(flow);
                }
            }
        }
     
        if (flowsNotFound.length > 0) {
            return res.status(404).send("Flows " + flowsNotFound.join(", ") + " not found");
        }
*/
    const course = new Course({
      title: title,
      description: description,
      author: userId,
    });

    if (flowsId)
      for (const flow of flowsId) if (flow != null) course.flows.push(flow);

    console.log(course);
    await course.save();
    const courseRes = await Course.find({ title: course.title })
      .populate("author")
      .populate("flows");

    return res.status(201).json(courseRes);
  } catch (err) {
    console.error(err);
    res.status(500).send;
  }
}

export async function deleteCourse(req: Request, res: Response) {
  const courseId = req.params.id;
  const userId = req.user?._id;
  try {
    if (!userId) {
      return res.status(400).send("userId is required");
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (!courseId) {
      return res.status(404).send("courseId is required");
    }

    const dbcourse = await Course.findById(courseId);
    if (!dbcourse) {
      return res.status(404).send("Course not found");
    }

    if (dbcourse.author !== userId && userId != "admin") {
      return res.status(403).send("You are not the author of this course");
    }

    await Course.deleteOne({ _id: courseId });

    return res.status(204).send();
  } catch (err) {
    res.status(500).send;
  }
}

export async function getCourses(req: Request, res: Response) {
  try {
    const q = req.query?.q?.toString();
    const me = req.query?.me?.toString();
    const query: any = q ? { title: { $regex: q, $options: "i" } } : {};

    if (me) {
      query.author = req.user?._id;
    }

    const courses = await Course.find(query)
      .populate("author")
      .populate("flows");
    return res.json(courses);
  } catch (err) {
    console.error(err);
    return res.status(500).send;
  }
}
