import { Request, Response } from "express";
import * as Models from "../models/learningData.models"; //va bene?
//import { BaseAction, OpenLearningPageAction, CloseLearningPageAction, ChangeTabAction, ChangePageAction } from "../types/LearningData";
import * as Types from "../types/LearningData";

// DA FIXARE CON NUOVI TIPI E MODELLI

// Funzione per creazione di azione nel database
export const createAction = async (req: Request, res: Response) => {
  try {
    const type = req.body.type;
    if (!type) {
      return res.status(400).json({ error: "Action type is required." });
    }

    if (!req.body.timestamp || !req.body.userId || !req.body.zoneId) {
      // Controlla che campi siano presenti
      return res.status(400).json({
        error: "Missing required fields: timestamp, userId, or zoneId.",
      });
    }

    let action: any;

    // Specifiche per i tipi di azioni (puoi espandere con più validazioni per ogni tipo)
    switch (
      type //case per ogni tipo di azione? Non c'è modo migliore??
    ) {
      case "open_learning_page":
        const openAction = req.body; // as OpenLearningPageAction;
        if (!openAction.action.lpId || !openAction.action.pageId) {
          return res.status(400).json({
            error: "Missing fields for open_learning_page: lpId or pageId.",
          });
        }
        action = await Models.OpenNodeActionModel.create(openAction); //to be checked
        res
          .status(200)
          .json({ message: "Action created successfully", data: action });
        break;

      case "close_learning_page":
        const closeAction = action; // as CloseLearningPageAction;
        if (!closeAction.action.lpId || !closeAction.action.pageId) {
          return res.status(400).json({
            error: "Missing fields for close_learning_page: lpId or pageId.",
          });
        }
        break;

      case "changed_tab":
        const tabAction = action; //as ChangeTabAction;
        if (!tabAction.action.lpId || !tabAction.action.pageId) {
          return res
            .status(400)
            .json({ error: "Missing fields for changed_tab: lpId or pageId." });
        }
        break;

      case "changed_page":
        const pageAction = action; // as ChangePageAction;
        if (!pageAction.action.oldPageId || !pageAction.action.newPageId) {
          return res.status(400).json({
            error: "Missing fields for changed_page: oldPageId or newPageId.",
          });
        }
        break;

      default:
        return res
          .status(400)
          .json({ error: `Unsupported action type: ${action.type}` });
    }

    // Rispondere con i dati salvati
    res
      .status(200)
      .json({ message: "Action created successfully", data: action });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Recupera tutte le azioni (filtro opzionale per userId, zoneId, type, lpId, exerciseType, exerciseId)
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
};

export async function getActionByUser(req: Request, res: Response) {
  try {
    const actions = await Models.BaseActionModel.find({ user: req.params.id });
    if (!actions) {
      return res.status(404).send();
    }
    return res.status(200).send(actions);
  } catch (err: any) {
    return res.status(500).send(err);
  }
}

//Calcola tempo trascorso tra apertura e avanzamento a pagina successiva

/*TO BE IMPLEMENTED
// Calcola tempo trascorso in caso di open-close, open-changeTab e open-nextPage chiamando rispettive funzioni 
export const calculateTimeSpent = async (req: Request, res: Response) => {
    try {
        const { userId, lpId, pageId } = req.query;
  
        if (!userId || !lpId || !pageId) {
            return res.status(400).json({ error: "userId, lpId, and pageId are required." });
        }
  
        // Filtra azioni dell'utente sulla pagina specificata, ordinando per timestamp
        const actions = await Models.BaseActionModel.find({
            userId,
            "action.lpId": lpId,
            "action.pageId": pageId,
       }).sort({ timestamp: 1 });
  
        if (!actions || actions.length === 0) {
            return res.status(404).json({ error: "No action found for the given user and page." });
        }
  
        // Divide azioni per tipo
        const openActions = actions.filter(a => a.type === "open_learning_page");
        const closeActions = actions.filter(a => a.type === "close_learning_page");
        const tabChanges = actions.filter(a => a.type === "changed_tab");
        const pageChanges = actions.filter(a => a.type === "changed_page");
  
        // Analizza i tre casi
       
        const timeSpentOnPage = analyzeOpenClose(openActions, closeActions);
        const timeSpentDuringTabChanges = analyzeTabChanges(openActions, tabChanges);
        const timeSpentDuringPageChanges = analyzePageChanges(openActions, pageChanges);
        
        res.status(200).json({
            timeSpentOnPage,
            timeSpentDuringTabChanges,
            timeSpentDuringPageChanges,
        });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
};*/
