import { Request, Response } from "express";
import * as Models from "../models/learningData.models";
import * as Types from "../types/LearningData";

// Function to create and save an action in the database
export const createAction = async (req: Request, res: Response) => {
  try {
    const actionType = req.body.actionType;
    if (!actionType) {
      return res.status(400).json({ error: "actionType is required." });
    }

    if (
      !req.body.timestamp ||
      !req.body.userId ||
      !req.body.actionType ||
      !req.body.zoneId ||
      !req.body.platform
    ) {
      // Controlla che campi siano presenti
      return res.status(400).json({
        error:
          "Missing required fields: timestamp, userId, zoneId or platform.",
      });
    }

    let action: any; //Problema lasciare any?

    switch (actionType) {
      case "registration_to_WorkAdventure":
        const RegistrationToWorkAdventure = req.body;
        if (!RegistrationToWorkAdventure.action.userRole) {
          return res.status(400).json({
            error:
              "Missing fields for registration_to_WorkAdventure: userRole.",
          });
        }
        action = await Models.RegistrationToWorkAdventureActionModel.create(
          RegistrationToWorkAdventure,
        );
        break;

      case "log_in_to_WorkAdventure":
        const LogInToWorkAdventure = req.body;
        if (!LogInToWorkAdventure.action.userRole) {
          return res.status(400).json({
            error: "Missing fields for log_in_to_WorkAdventure: userRole.",
          });
        }
        action =
          await Models.LogInToWorkAdventureActionModel.create(
            LogInToWorkAdventure,
          );
        break;

      case "log_out_to_WorkAdventure":
        const LogOutToWorkAdventure = req.body;
        if (!LogOutToWorkAdventure.action.userRole) {
          return res.status(400).json({
            error: "Missing fields for log_out_to_WorkAdventure: userRole.",
          });
        }
        action = await Models.LogOutToWorkAdventureActionModel.create(
          LogOutToWorkAdventure,
        );
        break;

      case "log_in_to_PolyGloT":
        const LogInToPolyGloT = req.body;
        if (!LogInToPolyGloT.action.userRole) {
          return res.status(400).json({
            error: "Missing fields for log_in_to_PolyGloT: userRole.",
          });
        }
        action =
          await Models.LogInToPolyGloTActionModel.create(LogInToPolyGloT);
        break;

      case "log_out_to_PolyGloT":
        const LogOutToPolyGloT = req.body;
        if (!LogOutToPolyGloT.action.userRole) {
          return res.status(400).json({
            error: "Missing fields for log_out_to_PolyGloT: userRole.",
          });
        }
        action =
          await Models.LogOutToPolyGloTActionModel.create(LogOutToPolyGloT);
        break;

      case "open_tool":
        const openToolAction = req.body;
        //if (!openToolAction.action.flowId || !openToolAction.action.nodeId) {  //IN SOSPESO!
        //  return res.status(400).json({
        //    error: "Missing fields for open_tool: flowId or nodeId.",
        //  });
        //}
        action = await Models.OpenToolActionModel.create(openToolAction);
        break;

      case "close_tool":
        const closeToolAction = req.body;
        //if (!closeToolAction.action.flowId || !closeToolAction.action.nodeId) { //IN SOSPESO!
        //  return res.status(400).json({
        //    error: "Missing fields for close_tool: flowId or nodeId.",
        //  });
        //}
        action = await Models.CloseToolActionModel.create(closeToolAction);
        break;

      case "open_node":
        const OpenNode = req.body;
        if (!OpenNode.action.flowId || !OpenNode.action.nodeId) {
          return res.status(400).json({
            error: "Missing fields for open_node: flowId or nodeId.",
          });
        }
        action = await Models.OpenNodeActionModel.create(OpenNode);
        break;

      case "close_node":
        const CloseNode = req.body;
        if (!CloseNode.action.flowId || !CloseNode.action.nodeId) {
          return res.status(400).json({
            error: "Missing fields for close_node: flowId or nodeId.",
          });
        }
        action = await Models.CloseNodeActionModel.create(CloseNode);
        break;

      case "change_node":
        const ChangeNode = req.body;
        if (
          !ChangeNode.action.flowId ||
          !ChangeNode.action.oldNodeId ||
          !ChangeNode.action.newNodeId
        ) {
          return res.status(400).json({
            error:
              "Missing fields for change_node: flowId, oldNodeId or newNodeId.",
          });
        }
        action = await Models.ChangeNodeActionModel.create(ChangeNode);
        break;

      case "open_LP_selection":
        const openLPSelection = req.body;
        if (!openLPSelection.action.flowId) {
          return res.status(400).json({
            error: "Missing fields for open_LP_selection: flowId.",
          });
        }
        action =
          await Models.OpenLPSelectionActionModel.create(openLPSelection);
        break;

      case "close_LP_selection":
        const closeLPSelection = req.body;
        if (!closeLPSelection.action.flowId) {
          return res.status(400).json({
            error: "Missing fields for close_LP_selection: flowId.",
          });
        }
        action =
          await Models.CloseLPSelectionActionModel.create(closeLPSelection);
        break;

      case "search_for_LP":
        const SearchForLP = req.body;
        if (!SearchForLP.action.queryId || !SearchForLP.action.queryText) {
          return res.status(400).json({
            error: "Missing fields for search_for_LP: queryId or queryText.",
          });
        }
        action = await Models.SearchForLPActionModel.create(SearchForLP);
        break;

      case "show_LP":
        const ShowLP = req.body;
        if (!ShowLP.action.queryId || !ShowLP.action.resultId) {
          return res.status(400).json({
            error: "Missing fields for show_LP: queryId or resultId.",
          });
        }
        action = await Models.ShowLPActionModel.create(ShowLP);
        break;

      case "select_LP":
        const SelectLP = req.body;
        if (!SelectLP.action.flowId) {
          return res.status(400).json({
            error: "Missing fields for select_LP: flowId.",
          });
        }
        action = await Models.SelectLPActionModel.create(SelectLP);
        break;

      case "remove_LP_selection":
        const RemoveLPSelection = req.body;
        if (!RemoveLPSelection.action.flowId) {
          return res.status(400).json({
            error: "Missing fields for remove_LP_selection: flowId.",
          });
        }
        action =
          await Models.RemoveLPSelectionActionModel.create(RemoveLPSelection);
        break;

      case "create_LP":
        const CreateLP = req.body;
        if (!CreateLP.action.flowId) {
          return res.status(400).json({
            error: "Missing fields for create_LP: flowId.",
          });
        }
        action = await Models.CreateLPActionModel.create(CreateLP);
        break;

      case "modify_LP":
        const ModifyLP = req.body;
        if (!ModifyLP.action.flowId) {
          return res.status(400).json({
            error: "Missing fields for modify_LP: flowId.",
          });
        }
        action = await Models.ModifyLPActionModel.create(ModifyLP);
        break;

      case "delete_LP":
        const DeleteLP = req.body;
        if (!DeleteLP.action.flowId) {
          return res.status(400).json({
            error: "Missing fields for delete_LP: flowId.",
          });
        }
        action = await Models.DeleteLPActionModel.create(DeleteLP);
        break;

      case "submit_answer":
        const SubmitAnswer = req.body;
        if (
          !SubmitAnswer.action.flowId ||
          !SubmitAnswer.action.nodeId ||
          !SubmitAnswer.action.exerciseType ||
          !SubmitAnswer.action.answer ||
          !SubmitAnswer.action.result
        ) {
          return res.status(400).json({
            error:
              "Missing fields for submit_answer: flowId, nodeId, exerciseType, answer or result.",
          });
        }
        action = await Models.SubmitAnswerActionModel.create(SubmitAnswer);
        break;

      default:
        return res
          .status(400)
          .json({ error: `Unsupported actionType: ${action.actionType}` });
    }

    // Ritorna i dati salvati
    res
      .status(200)
      .json({ message: "Action created successfully", data: action });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// GET functions
export async function getAllActions(req: Request, res: Response) {
  try {
    const actions = await Models.BaseActionModel.find({});
    if (!actions || actions.length === 0) {
      return res.status(404).send();
    }
    return res.status(200).send(actions);
  } catch (err: any) {
    return res.status(500).send({ err });
  }
}

export async function getActionByUserId(req: Request, res: Response) {
  try {
    const actions = await Models.BaseActionModel.find({
      userId: req.params.id,
    });
    if (!actions) {
      return res.status(404).send();
    }
    return res.status(200).send(actions);
  } catch (err: any) {
    return res.status(500).send(err);
  }
}

export async function getActionsByUserIds(req: Request, res: Response) {
  try {
    const userIds: string[] = req.params.ids.split(",");
    if (userIds.length === 0) {
      return res.status(400).send();
    }
    const actions = await Models.BaseActionModel.find({
      userId: { $in: userIds },
    });
    if (actions.length === 0) {
      return res.status(404).send();
    }
    return res.status(200).send(actions);
  } catch (err: any) {
    return res.status(500).send(err);
  }
}

export async function getActionByActionType(req: Request, res: Response) {
  try {
    const actions = await Models.BaseActionModel.find({
      actionType: req.params.id,
    });
    if (!actions) {
      return res.status(404).send();
    }
    return res.status(200).send(actions);
  } catch (err: any) {
    return res.status(500).send(err);
  }
}

export async function getActionsByActionTypes(req: Request, res: Response) {
  try {
    const actionTypes: string[] = req.params.ids.split(",");
    if (actionTypes.length === 0) {
      return res.status(400).send();
    }
    const actions = await Models.BaseActionModel.find({
      actionType: { $in: actionTypes },
    });
    if (actions.length === 0) {
      return res.status(404).send();
    }
    return res.status(200).send(actions);
  } catch (err: any) {
    return res.status(500).send(err);
  }
}

export async function getActionByZoneId(req: Request, res: Response) {
  try {
    const actions = await Models.BaseActionModel.find({
      zoneId: req.params.id,
    });
    if (!actions) {
      return res.status(404).send();
    }
    return res.status(200).send(actions);
  } catch (err: any) {
    return res.status(500).send(err);
  }
}

export async function getActionsByZoneIds(req: Request, res: Response) {
  try {
    const zoneIds: string[] = req.params.ids.split(",");
    if (zoneIds.length === 0) {
      return res.status(400).send();
    }
    const actions = await Models.BaseActionModel.find({
      zoneId: { $in: zoneIds },
    });
    if (actions.length === 0) {
      return res.status(404).send();
    }
    return res.status(200).send(actions);
  } catch (err: any) {
    return res.status(500).send(err);
  }
}

export async function getActionByPlatform(req: Request, res: Response) {
  try {
    const actions = await Models.BaseActionModel.find({
      platform: req.params.id,
    });
    if (!actions) {
      return res.status(404).send();
    }
    return res.status(200).send(actions);
  } catch (err: any) {
    return res.status(500).send(err);
  }
}

export async function getActionsByPlatforms(req: Request, res: Response) {
  try {
    const platforms: string[] = req.params.ids.split(",");
    if (platforms.length === 0) {
      return res.status(400).send();
    }
    const actions = await Models.BaseActionModel.find({
      platform: { $in: platforms },
    });
    if (actions.length === 0) {
      return res.status(404).send();
    }
    return res.status(200).send(actions);
  } catch (err: any) {
    return res.status(500).send(err);
  }
}

export async function getActionByFlowId(req: Request, res: Response) {
  try {
    const actions = await Models.BaseActionModel.find({
      "action.flowId": req.params.id,
    });
    if (!actions || actions.length === 0) {
      return res.status(404).send();
    }
    return res.status(200).send(actions);
  } catch (err: any) {
    return res.status(500).send(err);
  }
}

export async function getActionsByFlowIds(req: Request, res: Response) {
  try {
    const flowIds: string[] = req.params.ids.split(",");
    if (flowIds.length === 0) {
      return res.status(400).send();
    }
    const actions = await Models.BaseActionModel.find({
      "action.flowId": { $in: flowIds },
    });
    if (actions.length === 0) {
      return res.status(404).send();
    }
    return res.status(200).send(actions);
  } catch (err: any) {
    return res.status(500).send(err);
  }
}

export const calculateTimeOnTool = async (req: Request, res: Response) => {
  try {
    const { userId, platform } = req.query;

    if (!userId || !platform) {
      return res
        .status(400)
        .json({
          error: "Missing required query parameters: userId or platform",
        });
    }

    const actions = await Models.BaseActionModel.find({
      userId,
      platform: platform,
      actionType: { $in: ["open_tool", "close_tool"] },
    })
      .sort({ timestamp: -1 }) // Ordina dal più recente al meno
      .limit(10); // Limite per performance

    if (!actions || actions.length === 0) {
      return res
        .status(404)
        .json({ error: "No actions found for the given user and platform." });
    }

    const lastClose = actions.find(  // Trova ultima chiusura
      (action) => action.actionType === "close_tool",
    );
    if (!lastClose) {
      return res.status(400).json({
        error: "No valid close_tool action found for given user and platform.",
      });
    }

    const lastOpen = actions.find(  // Trova ultima apertura (prima della chiusura più recente)
      (action) =>
        action.actionType === "open_tool" &&
        action.timestamp < lastClose.timestamp,
    );
    if (!lastOpen) {
      return res.status(400).json({
        error:
          "No valid open_tool action found before the last close_tool action.",
      });
    }

    const timeSpentOnTool =  // Calcola differenza di tempo in millisecondi
      Number(lastClose.timestamp) - Number(lastOpen.timestamp);
    const timeSpentOnToolseconds = timeSpentOnTool / 1000;

    return res.status(200).json({
      message: "Time spent on tool calculated successfully.",
      timeSpentOnToolseconds,
      openActionTimestamp: lastOpen.timestamp,
      closeActionTimestamp: lastClose.timestamp,
    });
  } catch (error) {
    console.error("Error calculating time on tool:", error);
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const getActionsByFilters = async (req: Request, res: Response) => {  // GET con vari array di filtri facoltativi
  try {
    console.log("Query:", req.query);
    const {
      userId,
      actionType,
      zoneId,
      platform,
      startDate,
      endDate,
      userRole,
      flowId,
      nodeId,
      exerciseType,
    } = req.query;
    console.log("UserIds:", userId);
    const filter: any = {};

    const parseQueryParam = (param: any) =>
      typeof param === "string" ? param.split(",") : param; //trasforma stringa separata da virgole in array

    if (userId) filter.userId = { $in: parseQueryParam(userId) };
    if (zoneId) filter.zoneId = { $in: parseQueryParam(zoneId) };
    if (actionType) filter.actionType = { $in: parseQueryParam(actionType) };
    if (platform) filter.platform = { $in: parseQueryParam(platform) };
    if (userRole)
      filter["action.userRole"] = { $in: parseQueryParam(userRole) };
    if (flowId) filter["action.flowId"] = { $in: parseQueryParam(flowId) };
    if (nodeId) filter["action.nodeId"] = { $in: parseQueryParam(nodeId) };
    if (exerciseType)
      filter["action.exerciseType"] = { $in: parseQueryParam(exerciseType) };
    if (startDate || endDate) {  //Permette intervallo di tempo
      filter.timestamp = {};
      if (startDate) filter.timestamp.$gte = new Date(startDate as string);
      if (endDate) filter.timestamp.$lte = new Date(endDate as string);
    }

    const actions = await Models.BaseActionModel.find(filter);
    if (actions.length === 0) {
      return res.status(404).send();
    }

    res.status(200).send(actions);
  } catch (err: any) {
    return res.status(500).send(err);
  }
};
