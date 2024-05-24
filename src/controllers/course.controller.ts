import { Request, Response } from "express";
import  User from "../models/user.model";
import Course from "../models/course.model";
import Flow from "../models/flow.model";


export async function createCourse(req: Request, res: Response) {
    const { userId } = req.params;
    const { title, description, flows } = req.body;
    try {
        if (!userId) {
            return res.status(400).send("userId is required");
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        if(await Course.findOne({title: title})) {
            return res.status(400).send("Course already exists");
        }

        let flowsNotFound: string[] = [];
        
        for (const flow of flows) {
            const dbflow = await Flow.findOne({ _id: flow });
            if (!dbflow) {
                flowsNotFound.push(flow);
            }
        }
        
        if (flowsNotFound.length > 0) {
            return res.status(404).send("Flows " + flowsNotFound.join(", ") + " not found");
        }

        const course = new Course({
            title: title,
            description: description,
            author: userId,
        });

        for (const flow of flows) {
            course.flows.push(flow);
        }
        await course.save();


        return res.status(201).json(course);
    } catch (err) {
        console.error(err);
        res.status(500).send;
    }
}

export async function deleteCourse(req: Request, res: Response) {
    const { userId, courseId } = req.params;
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

        if (dbcourse.author !== userId) {
            return res.status(403).send("You are not the author of this course");
        }

        await Course.deleteOne({ _id:courseId});

        return res.status(204).send();
    } catch (err) {
        res.status(500).send;
    }
}

export async function updateCourse(req: Request, res: Response) {
    const { userId, courseId } = req.params;
    const { title, description } = req.body;
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

        if (dbcourse.author != userId) {
            return res.status(403).send("You are not the author of this course");
        }

        await dbcourse.updateOne({
            title: title,
            description: description,
        });

        return res.status(200).send(dbcourse);
    } catch (err) {
        console.error(err);
        res.status(500).send;
    }
}

export async function addFlow(req: Request, res: Response) {
    const { userId, courseId, flow } = req.params;
    try {
        if (!userId) {
            return res.status(400).send("userId is required");
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        
        if (!courseId) {
            return res.status(404).send("CourseId is required");
        }

        const dbcourse = await Course.findById(courseId);
        if (!dbcourse) {
            return res.status(404).send("Course not found");
        }

        if (dbcourse.author != userId) {
            return res.status(403).send("You are not the author of this course");
        }

        const dbflow = await Flow.findOne({_id: flow});
        if (!dbflow) {
            return res.status(404).send("Flow not found");
        }

        await dbcourse.updateOne({
            $push: { flows: flow }
        });

        return res.status(204).send(dbcourse);
    } catch (err) {
        res.status(500).send;
    }
}

export async function enrollCourse(req: Request, res: Response) {
    const { userId, courseId } = req.params;
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

        await user.updateOne({
            $push: { courses: courseId }
        });

        return res.status(204).send(user);
    } catch (err) {
        res.status(500).send;
    }
}

export async function unenrollCourse(req: Request, res: Response) {
    const { userId, courseId } = req.params;
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

        await user.updateOne({
            $pull: { courses: courseId }
        });

        return res.status(204).send(user);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
}

export async function getCourses(req: Request, res: Response) {
    try {
        const courses = await Course.find().populate("flows",{_id:1, title:1});
        return res.json(courses);
    } catch (err) {
        console.error(err);
        return res.status(500).send
    }
}
