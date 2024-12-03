import { Date } from "mongoose";

export enum ZoneId {
  FreeZone,
  OutsideZone,
  SilentZone,
  LearningPathSelectionZone,
  InstructionWebpageZone,
  WebAppZone,
  MeetingRoomZone,
  PolyGlotLearningZone,
  PolyGlotLearningPathCreationZone,
  PapyrusWebZone,
  VirtualStudioZone,
}

export enum ExerciseType {
  OpenEndedQuestion,
  CloseEndedQuestion,
  MultipleChoiceQuestion,
  TrueFalseQuestion,
}

export enum Platform {
  PolyGlot,
  VirtualStudio,
  Papyrus,
  WebApp,
}

// Tipo base di tutte le azioni
export type BaseAction = {
  timestamp: Date;
  userId: string;
  zoneId: ZoneId;
  type: String;
  platform: Platform;
};

// Azione di apertura di un tool
export type OpenToolAction = BaseAction & {
  action: {
    pageId: string;
    //flowId: string; ?
  };
};

export type CloseToolAction = BaseAction & {
  action: {
    pageId: string;
    //flowId: string; ?
  };
};

//Apertura schermata di info aggiuntive nella selezione LP
export type OpenLPSelectionAction = BaseAction & {
  action: {
    flowId: string;
  };
};

// Chiusura schermata di info aggiuntive riguardo un LP (serve?)
export type CloseLPSelectionAction = BaseAction & {
  action: {
    flowId: string;
  };
};

// Azione di ricerca di un LearningPath (LP)
export type SearchForLPAction = BaseAction & {
  action: {
    queryId: string;
    queryText: string;
  };
};

// Azione di mostrare i risultati di una ricerca di LP
export type ShowLPAction = BaseAction & {
  action: {
    queryId: string;
    resultIds: string[];
  };
};

// Azioni comuni della pagina di selezione del Learning Path (LP)
// Azione di selezione di un LP
export type SelectLPAction = BaseAction & {
  action: {
    flowId: string;
  };
};

// Azione di rimozione di una selezione
export type RemoveLPSelectionAction = BaseAction & {
  action: {
    flowId: string;
  };
};

// Azioni di LogIn e LogOut to PoliGloT
export type LogInToPolyGloTAction = BaseAction & {
  action: {
    userRole: string; //enum?
  };
};

export type LogOutToPolyGloTAction = BaseAction & {
  action: {
    userRole: string; //enum?
  };
};

//Azione di creazione LP
export type CreateLPAction = BaseAction & {
  action: {
    flowId: string;
  };
};

//Azione di modifica LP
export type ModifyLPAction = BaseAction & {
  action: {
    flowId: string;
    //Any info about the old version of the LP?
  };
};

//Azione di eliminazione LP
export type DeleteLPAction = BaseAction & {
  action: {
    flowId: string;
    //Any info about the old version of the LP?
  };
};

// Azioni comuni delle pagine delle attività di apprendimento
// Azione di apertura di un node di appendimento (inizio esecuzione del node)
export type OpenNodeAction = BaseAction & {
  action: {
    flowId: string;
    nodeId: string;
    //activity: string; //Attributo per differenziare in base al tipo di attività. Forse non necessario avendo pageId, lo intendo per identificare l'attività senza dover andare a vedere dall'id della pagina
  };
};

// Azione di chiusura di un node di appendimento (termine esecuzione del node)
export type CloseNodeAction = BaseAction & {
  action: {
    flowId: string;
    nodeId: string;
    //activity: string; //Attributo per differenziare in base al tipo di attività. Forse non necessario avendo pageId, lo intendo per identificare l'attività senza dover andare a vedere dall'id della pagina
  };
};

// Azione di cambiamento di tab nel browser -> Da discutere idea
/*    IN SOSPESO...
export type ChangeTabAction = BaseAction & {
  action: {
    type: "changed_tab";
    lpId: string;
    nodeId: string;
    //altro?
  };
}; */

// Azione di passaggio al node successivo/precedente durante un'attività di learning.
export type ChangeNodeAction = BaseAction & {
  action: {
    flowId: string;
    oldNodeId: string;
    newNodeId: string;
  };
};

// Azione di invio della risposta fornita
export type SubmitAnswerAction = BaseAction & {
  action: {
    flowId: string;
    nodeId: string;
    exerciseType: ExerciseType;
    answer: string[];
    result: boolean;
  };
};

// Tipo unione per tutte le azioni possibili dell'utente
export type UserAction =
  | OpenToolAction
  | CloseToolAction
  | OpenLPSelectionAction
  | CloseLPSelectionAction
  | SearchForLPAction
  | ShowLPAction
  | SelectLPAction
  | RemoveLPSelectionAction
  | LogInToPolyGloTAction
  | LogOutToPolyGloTAction
  | CreateLPAction
  | ModifyLPAction
  | DeleteLPAction
  | OpenNodeAction
  | CloseNodeAction
  | ChangeNodeAction
  | SubmitAnswerAction;
