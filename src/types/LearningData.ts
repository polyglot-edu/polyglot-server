import { Date } from "mongoose"

export enum ZoneId {    
    FreeZone, OutsideZone, SilentZone, LearningPathSelectionZone,
    InstructionWebpageZone, WebAppZone, MeetingRoomZone, PolyGlotLearningZone,
    PolyGlotLearningPathCreationZone, PapyrusWebZone, VirtualStudioZone  
}

export enum ExerciseType {
    OpenEndedQuestion, CloseEndedQuestion, MultipleChoiceQuestion, TrueFalseQuestion
}

export enum Platform {
    PolyGlot, VirtualStudio, Papyrus, WebApp
}

// Tipo base di tutte le azioni
export type BaseAction = {
    timestamp: Date;
    userId: string;
    zoneId: ZoneId;
    type: String; //fixa gli altri
    platform: Platform; //uguale
};

// Azioni comuni di tutte le pagine
// Azione di apertura pagina
export type OpenToolAction = BaseAction & { //controllsa
    action:{
        platform: Platform;
        type: 'open_page';
        pageId: string; 
    }  
};

export type CloseToolAction = BaseAction & { //controlla
    action:{
        platform: Platform;
        type: 'close_page';
        pageId: string;
    }
};

export type OpenLPSelectionAction = BaseAction & { //Apertura schermata di info aggiuntive nella selezione LP
    action:{
        platform: Platform;
        type: 'open_page';
        flowId: string; 
    }  
};
  
// Azione di chiusura pagina
export type CloseLPSelectionAction = BaseAction & {
    action:{
        platform: Platform;
        type: 'close_page';
        flowId: string;
    }
};

// Azione di ricerca di un LearningPath (LP)
export type SearchForLPAction = BaseAction & {
    action:{
        type: 'search_for_LP';
        queryId: string;
        queryText: string;
    }
};
  
// Azione di mostrare i risultati di una ricerca di LP
export type ShowLPAction = BaseAction & { //Risultati ritornati dalla ricerca, ma si può usare per tutti gli LP mostrati
    action:{
        type: 'LP_shown';
        queryId: string;
        resultIds: string[];
    }
};

// Azioni comuni della pagina di selezione del Learning Path (LP)
// Azione di selezione di un LP
export type SelectLPAction = BaseAction & {
    action:{
        type: 'LP_selection';
        flowId: string; //learningPathId: string; più chiaro?
    }
};
  
// Azione di rimozione di una selezione
export type RemoveLPSelectionAction = BaseAction & {
    action:{
        type: 'remove_LP_selection';
        flowId: string; //learningPathId: string; più chiaro?
    }
};

// Azioni comuni della pagina di creazione/modifica dei Learning Path (LP)
// Azione di Sign in to PoliGloT
export type SigninToPolyGloTAction = BaseAction & {
    action:{
        type: 'signin_to_PolyGloT';
        userRole: string; //enum?
    }
};

export type LogOutToPolyGloTAction = BaseAction & {
    action:{
        type: 'logout_to_PolyGloT';
        userRole: string; //enum?
    }
};

//Azione di creazione LP
export type LPCreationAction = BaseAction & {
    action:{
        type: 'lp_creation';
        lpId: string; //learningPathId
    }
};

//Azione di modifica LP
export type LPModificationAction = BaseAction & {
    action:{
        type: 'lp_modification';
        lpId: string; //learningPathId
        //Any info about the old version of the LP?
    }
};

//Azione di eliminazione LP
export type LPEliminationAction = BaseAction & {
    action:{
        type: 'lp_elimination';
        lpId: string; //learningPathId
        //Any info about the old version of the LP?
    }
};

// Azioni comuni delle pagine delle attività di apprendimento
// Azione di apertura di una pagina di appendimento (Si può unificare con l'open page generale?)
export type OpenNodeAction = BaseAction & { //inizio esecuzione del node
    action:{
        type: 'open_learning_page';
        lpId: string;
        nodeId: string;
        activity: string; //Attributo per differenziare in base al tipo di attività. Forse non necessario avendo pageId, lo intendo per identificare l'attività senza dover andare a vedere dall'id della pagina
    }
};

// Azione di chiusura di una pagina di appendimento (Si può unificare con il close page generale?)
export type CloseNodeAction = BaseAction & { //chiusura node senza submit
    action:{
        type: 'close_learning_page';
        lpId: string;
        nodeId: string;
        activity: string; //Attributo per differenziare in base al tipo di attività. Forse non necessario avendo pageId, lo intendo per identificare l'attività senza dover andare a vedere dall'id della pagina
    }
};

// Azione di cambiamento di tab nel browser -> Da discutere idea
export type ChangeTabAction = BaseAction & {
    action:{
        type: 'changed_tab';
        lpId: string;
        nodeId: string;
        //altro?
    }
} 

// Azione di passaggio alla pagina successiva/precedente durante un'attività di learning.
export type ChangePageAction = BaseAction & {
    action:{
        type: 'changed_page';
        lpId: string;
        oldNodeId: string;
        newNodeId: string;
    }
};

// Azione di invio della risposta fornita 
export type SubmitAnswerAction = BaseAction & {
    action:{
        type: 'submitted_answer';
        lpId: string;
        exerciseType: ExerciseType;
        nodeId: string; //exercise type
        answer: string;
        result: boolean;
    }
};

//export type SubmitAnswerAction = BaseAction & {
//uguale con array su answer
//}

// Tipo unione per tutte le azioni possibili dell'utente
/*export?*/ type UserAction =
    | OpenPageAction
    | ClosePageAction
    | SearchForLPAction
    | LPShownAction
    | LPSelectionAction
    | RemoveLPSelectionAction
    | SigninToPolyGloTAction
    | LPCreationAction
    | LPModificationAction
    | LPEliminationAction
    | OpenLearningPageAction
    | CloseLearningPageAction
    | ChangeTabAction
    | ChangePageAction
    | SubmitAnswerAction;












/* TESTO DEL JSON DI ESEMPIO, DA CANCELLARE {
{
    "timestamp": "2024-11-15T10:00:00Z",
    "userId": "user1",
    "zoneId": "LearningPathSelectionZone",
    "action": {
        "platform": "PolyGloT",
        "type": "open_page",
        "pageId": "page01"
    }
},
{
    "timestamp": "2024-11-15T10:05:00Z",
    "userId": "user1",
    "zoneId": "LearningPathSelectionZone",
    "action": {
        "type": "search_for_LP",
        "queryId": "query1",
        "queryText": "machine learning"
    }
},
{
    "timestamp": "2024-11-15T10:05:10Z",
    "userId": "user1",
    "zoneId": "LearningPathSelectionZone",
    "action": {
        "type": "LP_shown",
        "queryId": "query1",
        "resultIds": ["LP101", "LP102", "LP103"]
    }
},
{
    "timestamp": "2024-11-15T10:12:00Z",
    "userId": "user3",
    "zoneId": "PolyGloTLearningZone",
    "action": {
        "type": "submitted_answer",
        "lpId": "LP107",
        "pageId": "page5",
        "exerciseType": "MultipleChoiceQuestion",
        "exerciseId": "exercise3",
        "answer": "42",
        "result": true
    }
}   }*/
    
