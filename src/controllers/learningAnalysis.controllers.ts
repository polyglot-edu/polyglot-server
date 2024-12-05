import { Request, Response } from "express";
import * as Models from "../models/learningData.models";
import * as Types from "../types/LearningData";

// Function to create and save an action in the database
export const createAction = async (req: Request, res: Response) => {
  try {
    const type = req.body.type;
    if (!type) {
      return res.status(400).json({ error: "Action type is required." });
    }

    if (!req.body.timestamp || !req.body.userId || !req.body.zoneId || !req.body.platform) { // Controlla che campi siano presenti
      return res.status(400).json({
        error: "Missing required fields: timestamp, userId, zoneId or platform.",
      });
    }

    let action: any; //Problema lasciare any?

    switch (type) {
      case "open_tool":
        const openToolAction = req.body;
        if (!openToolAction.action.flowId || !openToolAction.action.nodeId) {
          return res.status(400).json({
            error: "Missing fields for open_tool: flowId or nodeId.",
          });
        }
        action = await Models.OpenToolActionModel.create(openToolAction);
        break;

      case "close_tool":
        const closeToolAction = req.body;
        if (!closeToolAction.action.flowId || !closeToolAction.action.nodeId) {
          return res.status(400).json({
            error: "Missing fields for close_tool: flowId or nodeId.",
          });
        }
        action = await Models.CloseToolActionModel.create(closeToolAction);
        break;

      case "open_LP_selection":
        const openLPSelection = req.body;
        if (!openLPSelection.action.flowId) {
          return res.status(400).json({
            error: "Missing fields for open_LP_selection: flowId.",
          });
        }
        action = await Models.OpenLPSelectionActionModel.create(openLPSelection);
        break;

      case "close_LP_selection":
        const closeLPSelection = req.body;
        if (!closeLPSelection.action.flowId) {
          return res.status(400).json({
            error: "Missing fields for close_LP_selection: flowId.",
          });
        }
        action = await Models.CloseLPSelectionActionModel.create(closeLPSelection);
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
        action = await Models.RemoveLPSelectionActionModel.create(RemoveLPSelection);
        break;

      case "log_in_to_PolyGloT":
        const LogInToPolyGloT = req.body;
        if (!LogInToPolyGloT.action.userRole) {
          return res.status(400).json({
            error: "Missing fields for log_in_to_PolyGloT: userRole.",
          });
        }
        action = await Models.LogInToPolyGloTActionModel.create(LogInToPolyGloT);
        break;

      case "log_out_to_PolyGloT":
        const LogOutToPolyGloT = req.body;
        if (!LogOutToPolyGloT.action.userRole) {
          return res.status(400).json({
            error: "Missing fields for log_out_to_PolyGloT: userRole.",
          });
        }
        action = await Models.LogOutToPolyGloTActionModel.create(LogOutToPolyGloT);
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
        if (!ChangeNode.action.flowId || !ChangeNode.action.oldNodeId || !ChangeNode.action.newNodeId) {
          return res.status(400).json({
            error: "Missing fields for change_node: flowId, oldNodeId or newNodeId.",
          });
        }
        action = await Models.ChangeNodeActionModel.create(ChangeNode);
        break;

      case "submit_answer":
        const SubmitAnswer = req.body;
        if (!SubmitAnswer.action.flowId || !SubmitAnswer.action.nodeId || !SubmitAnswer.action.exerciseType || !SubmitAnswer.action.answer || !SubmitAnswer.action.result) {
          return res.status(400).json({
            error: "Missing fields for submit_answer: flowId, nodeId, exerciseType, answer or result.",
          });
        }
        action = await Models.SubmitAnswerActionModel.create(SubmitAnswer);
        break;

      default:
        return res
          .status(400)
          .json({ error: `Unsupported action type: ${action.type}` });
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
export async function getActionByUserId(req: Request, res: Response) {
  try {
    const actions = await Models.BaseActionModel.find({ userId: req.params.id });
    if (!actions) {
      return res.status(404).send();
    }
    return res.status(200).send(actions);
  } catch (err: any) {
    return res.status(500).send(err);
  }
}

export async function getActionByType(req: Request, res: Response) {
  try {
    const actions = await Models.BaseActionModel.find({ type: req.params.id });
    if (!actions) {
      return res.status(404).send();
    }
    return res.status(200).send(actions);
  } catch (err: any) {
    return res.status(500).send(err);
  }
}

export async function getActionByZoneId(req: Request, res: Response) {
  try {
    const actions = await Models.BaseActionModel.find({ zoneId: req.params.id });
    if (!actions) {
      return res.status(404).send();
    }
    return res.status(200).send(actions);
  } catch (err: any) {
    return res.status(500).send(err);
  }
}

export async function getActionByPlatform(req: Request, res: Response) {
  try {
    const actions = await Models.BaseActionModel.find({ platform: req.params.id });
    if (!actions) {
      return res.status(404).send();
    }
    return res.status(200).send(actions);
  } catch (err: any) {
    return res.status(500).send(err);
  }
}

export async function getActionByFlowId(req: Request, res: Response) {
  try {
    const actions = await Models.BaseActionModel.find({ flowId: req.params.id });
    if (!actions) {
      return res.status(404).send();
    }
    return res.status(200).send(actions);
  } catch (err: any) {
    return res.status(500).send(err);
  }
}

// getActionByflowId&pageId?

export const calculateTimeOnTool = async (req: Request, res: Response) => {
  try {
    const { userId, platform } = req.query;

    // Verifica che userId e platform siano forniti
    if (!userId || !platform) {
      return res
        .status(400)
        .json({ error: "Missing required query parameters: userId or platform" });
    }

    // Recupera azioni rilevanti
    const actions = await Models.BaseActionModel.find({
      userId,
      platform: platform,
      type: { $in: ["open_tool", "close_tool"] },
    }).sort({ timestamp: -1 }); // Ordina dal più recente al meno

    if (!actions || actions.length === 0) {
      return res
        .status(404)
        .json({ error: "No actions found for the given user and platform." });
    }

    // Distingui aperture e chiusure
    const openActions = actions.filter(action => action.type === "open_tool");
    const closeActions = actions.filter(action => action.type === "close_tool");

    if (openActions.length === 0 || closeActions.length === 0) {
      return res.status(400).json({
        error: "Insufficient data: no open_tool or close_tool actions found.",
      });
    }

    // Trova ultima chiusura
    const lastClose = closeActions[0];

    // Trova ultima apertura (prima della chiusura più recente)
    const lastOpen = openActions.find(
      action => action.timestamp < lastClose.timestamp
    );

    if (!lastOpen) {
      return res.status(400).json({
        error: "No valid open_tool action found before the last close_tool action.",
      });
    }

    // DA FIXARE
    // Calcola differenza di tempo in millisecondi   
    //const timeSpentOnTool = new Date(lastClose.timestamp).getTime() - new Date(lastOpen.timestamp).getTime();
    //const timeSpentOnToolseconds = timeSpentOnTool / 1000;

    return res.status(200).json({
      message: "Time spent on tool calculated successfully.",
    //  timeSpentOnToolseconds,
      openActionTimestamp: lastOpen.timestamp,
      closeActionTimestamp: lastClose.timestamp,
    });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};












// Recupera tutte le azioni (filtro opzionale per userId, zoneId, type, lpId, exerciseType, exerciseId)
/*  IN SOSPESO
export const getActionsByFilter = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      zoneId,
      type,
      lpId,
      exerciseType,
      exerciseId,
      platform,
      pageId,
    } = req.body; //estrae valori di userId e zoneId dalla query string dell'URL
    const filter: any = {};
    if (userId) filter.userId = userId; //Se presente aggiungi filtro, altrimenti ignora
    if (zoneId) filter.zoneId = zoneId;
    if (type) filter.type = type;
    if (lpId) filter.lpId = lpId;
    if (exerciseType) filter.exerciseType = exerciseType;
    if (exerciseId) filter.exerciseId = exerciseId;
    if (platform) filter.platform = platform;
    if (pageId) filter.pageId = pageId;
    const actions = await Models.BaseActionModel.find(filter);
    res.status(200).json(actions); //successo!
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: "Error in returning actions (getAllActions)." });
    }
  }
};  */


//Calcola tempo trascorso tra apertura nodo e avanzamento a pagina successiva

