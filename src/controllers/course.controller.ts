import { Request, Response } from "express";
import User from "../models/user.model";
import Course from "../models/course.model";
import Flow from "../models/flow.model";
import { CloseEndedQuestionNode, LessonTextNode, MultipleChoiceQuestionNode, OpenQuestionNode, PolyglotNodeModel, ReadMaterialNode, TrueFalseNode } from "../models/node.model";
import { PassFailEdge, PolyglotEdgeModel, UnconditionalEdge } from "../models/edge.models";

export async function createCourse(req: Request, res: Response) {
  const userId = req.user?._id;
  const { title, description, flowsId } = req.body;

  try {
    if (!userId) {
      return res.status(400).send("userId is required");
    }

    if(!title) res.status(400).send("title is required");

    
    if(!description) res.status(400).send("description is required");

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

    if (flowsId) for (const flow of flowsId) if (flow!=null) course.flows.push(flow);

    await course.save();
    const courseRes = await Course.find({title: course.title})
    .populate("author")
    .populate("flows");

    return res.status(201).json(courseRes);
  } catch (err) {
    console.error(err);
    res.status(500).send;
  }
}

export async function editInfo(req: Request, res: Response) {
  const courseId = req.params.id;
  const userId = req.user?._id;
  const {title, description} = req.body;

  try{
    if (!userId) {
      return res.status(400).send("userId is required");
    }

    if (!courseId) {
      return res.status(404).send("courseId is required");
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const dbcourse = await Course.findById(courseId);
    if (!dbcourse) {
      return res.status(404).send("Course not found");
    }

    if (dbcourse.author !== userId && userId != "admin") {
      return res.status(403).send("You are not the author of this course");
    }

    dbcourse.description = description;
    dbcourse.title = title;

    await dbcourse.save();

    res.status(200)
  }catch(error){
    console.error(error);
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
    return res.status(200).send();

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

export async function saveAICourse(req: Request, res: Response) {
  const userId = req.user?._id;
  //const { title, description, lessons } = req.body;
  const { lessons, course } = req.body;
  const title = course.title;
  const description = course.description;

  try {
    if (!userId) {
      return res.status(400).send("userId is required");
    }

    if (!title) return res.status(400).send("title is required");

    if (!description) return res.status(400).send("description is required");

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (await Course.findOne({ title: title })) {
      return res.status(400).send("Course already exists");
    }

    if (!lessons) {
      return res.status(400).send("lessons are required");
    }
    
    var flows = [];

    for (const lesson of lessons) {
      var nodes: any[] = [];
      var edges = [];

      // generate nodes based on the activities
      const nodePromises = lesson.activities.map(async (activity: any, index: number) => {
        var node;
        var nodeType;
        switch(activity.lessonType) {  
          case "Learning":
            node = new ReadMaterialNode({
              description: activity.activityDescription,
              difficulty: 1,
              title: "insert title",
              platform: "WebApp",
              reactFlow: {}
            });
            nodeType = "ReadMaterialNode";
            break;
          case "Assessment":
            switch(activity.activityType) {
              case "Open Question":
                node = new OpenQuestionNode({
                  description: activity.activityDescription,
                  difficulty: 1,
                  title: "insert title",
                  platform: "WebApp",
                  reactFlow: {}
                });
                nodeType = "OpenQuestionNode";
                break;
              case "Short Answer Question":
                node = new CloseEndedQuestionNode({
                  description: activity.activityDescription,
                  difficulty: 1,
                  title: "insert title",
                  platform: "WebApp",
                  reactFlow: {}
                });
                nodeType = "closeEndedQuestionNode";
                break;
              case "Multiple Choice":
                node = new MultipleChoiceQuestionNode({
                  description: activity.activityDescription,
                  difficulty: 1,
                  title: "insert title",
                  platform: "WebApp",
                  reactFlow: {}
                });
                nodeType = "multipleChoiceQuestionNode";
                break;
              case "True or False":
                node = new TrueFalseNode({
                  description: activity.activityDescription,
                  difficulty: 1,
                  title: "insert title",
                  platform: "WebApp",
                  reactFlow: {}
                });
                nodeType = "TrueFalseNode";
                break;
              default:
                node = new MultipleChoiceQuestionNode({
                  description: activity.activityDescription,
                  difficulty: 1,
                  title: "insert title",
                  platform: "WebApp",
                  reactFlow: {}
                });
                nodeType = "multipleChoiceQuestionNode";
                break;
            }
          break;
          default:
            node = new ReadMaterialNode({
              description: activity.activityDescription,
              difficulty: 1,
              title: "insert title",
              reactFlow: {}
            });
            nodeType = "ReadMaterialNode";
            break;
        }

        const savedNode = await node.save();
        
        const reactFlow = {
          id: node._id,
          type: nodeType,
          position: { x: index*20, y: index*20 },
          data: {},
          selected: false,
          dragging: false,
        };
        
        const updatedNode = await PolyglotNodeModel.findByIdAndUpdate(savedNode._id, { $set: { reactFlow } }, { new: true });
        nodes.push((savedNode)._id);
      });
      
      await Promise.all(nodePromises);

      // generate edges based on the activities
      for (var i = 0; i < nodes.length-1; i++) {
        var edge;
        const passEdge = `async Task<(bool, string)> validate(PolyglotValidationContext context) {
          var getMultipleChoiceAnswer = () => {
            var submitted = context.JourneyContext.EventsProduced.OfType<ReturnValueProduced>().FirstOrDefault()?.Value as HashSet<string>;
            var answersCorrect = ((List<object>)context.Exercise.Data.isChoiceCorrect).Select((c, i) => (c, i))
                                                                                            .Where(c => bool.Parse(c.c.ToString()))
                                                                                            .Select(c => (c.i + 1).ToString())
                                                                                            .ToHashSet();
            return submitted.SetEquals(answersCorrect);
          };

          var isSubmissionCorrect = context.Exercise.NodeType switch
          {
            "multipleChoiceQuestionNode" => getMultipleChoiceAnswer(),
            _ => context.Exercise.Data.correctAnswers.Contains(context.JourneyContext.SubmittedCode),
          };

          var conditionKind = context.Condition.Data.conditionKind switch
          {
            "pass" => true,
            "fail" => false,
            _ => throw new Exception("Unknown condition kind")
          };
          return (conditionKind == isSubmissionCorrect, "Pass/Fail edge");
        }`;
        switch(lesson.activities[i].lessonType) {
          case "Learning":
            edge = new UnconditionalEdge({
              code: "async Task<(bool, string)> validate(PolyglotValidationContext context) {return (true, \"Unconditional edge\");}",
            });
          break;
          case "Assessment":
          break;
          default:
            edge = new PassFailEdge({
              code: passEdge,
            });
        }

        if (edge === undefined) {
          console.error("Edge is undefined");
          throw new Error("Edge is undefined");
        }
        
        const reactFlow = {
          id: edge._id,
          source: nodes[i],
          target: nodes[i+1],
          type: "unconditionalEdge",
          markerEnd:{
            type: "arrow",
            width: 25,
            height: 25,
          },
          selected: false,
        }

        const savedEdge = await edge.save();

        await PolyglotEdgeModel.findByIdAndUpdate(savedEdge._id, { $set: { reactFlow } }, { new: true });
        
        edges.push(savedEdge._id);
      }

      const flow = new Flow({
        author: userId,
        title: lesson.title,
        description: lesson.description,
        nodes: nodes,
        edges: edges,
      });

      const savedFlow = await flow.save();
      flows.push(savedFlow._id);
    }
    
    const course = new Course({
      title: title,
      description: description,
      author: userId,
      flows: flows,
    });

    const savedCourse = await course.save();

    return res.status(201).send(savedCourse);
  }
  catch (err) {
    console.error(err);
    res.status(500).send;
  }
}