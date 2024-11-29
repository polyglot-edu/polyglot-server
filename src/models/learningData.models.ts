// Guarda migliorie consigliate da chatgpt...

import mongoose, { Schema, model, Document } from "mongoose";
//import { v4 as uuidv4 } from "uuid"; Non mi serve id, no? O azioni uguali nello stesso secondo rischiano di creare problemi?
//import validator from "validator"; 
import * as Types from "../types/LearningData"; //Invece di elenco
/*{   
    BaseAction,
    OpenPageAction,
    ClosePageAction,
    SearchForLPAction,
    LPShownAction,
    LPSelectionAction,
    RemoveLPSelectionAction,
    SigninToPolyGloTAction,
    LPCreationAction,
    LPModificationAction,
    LPEliminationAction,
    OpenLearningPageAction,
    CloseLearningPageAction,
    ChangeTabAction,
    ChangePageAction,
    SubmitAnswerAction,
} from "../types/LearningData"; */

const options = { discriminatorKey: "type" };

//Interfacce per Mongoose
export interface BaseActionDocument extends Types.BaseAction, Document{}
export interface OpenPageActionDocument extends Types.OpenPageAction, Document{}
export interface ClosePageActionDocument extends Types.ClosePageAction, Document{}
export interface SearchForLPActionDocument extends Types.SearchForLPAction, Document{}
export interface LPShownActionDocument extends Types.LPShownAction, Document{}
export interface LPSelectionActionDocument extends Types.LPSelectionAction, Document{}
export interface RemoveLPSelectionActionDocument extends Types.RemoveLPSelectionAction, Document{}
export interface SigninToPolyGloTActionDocument extends Types.SigninToPolyGloTAction, Document{}
export interface LPCreationActionDocument extends Types.LPCreationAction, Document{}
export interface LPModificationActionDocument extends Types.LPModificationAction, Document{}
export interface LPEliminationActionDocument extends Types.LPEliminationAction, Document{}
export interface OpenLearningPageActionDocument extends Types.OpenLearningPageAction, Document{}
export interface CloseLearningPageActionDocument extends Types.CloseLearningPageAction, Document{}
export interface ChangeTabActionDocument extends Types.ChangeTabAction, Document{}
export interface ChangePageActionDocument extends Types.ChangePageAction, Document{}
export interface SubmitAnswerActionDocument extends Types.SubmitAnswerAction, Document{}

//Schema base
export const baseActionSchema = new Schema(
    {
        timestamp: { type: Date, required: true },
        userId: { type: String, required: true },
        zoneId: { type: Types.ZoneId, required: true },
        type: { type: String, required: true },
        
    },
    options,
);

//Schemi specifici
/* STRUTTURA SCHEMA SPECIFICO {
export const - = new Schema(
    {
        ...baseActionSchema.obj,
        action: {
            type: { type: String, required: true, enum: ["-"] },
            -: {type: -, required: - }, 
            -: {type: -, required: - },
        },
    },
    options,
);   }*/

export const openPageActionSchema = new Schema(
    {
        ...baseActionSchema.obj,
        action: {
            
            platform: { type: Types.Platform, required: true },
            pageId: { type: String, required: true },
        },
    },
    options,
);

export const closePageActionSchema = new Schema(
    {
        ...baseActionSchema.obj,
        action: {
            type: { type: String, required: true, enum: ["close_page"] },
            platform: { type: Types.Platform, required: true },
            pageId: { type: String, required: true },
        },
    },
    options,
);

export const searchForLPActionSchema = new Schema(
    {
        ...baseActionSchema.obj,
        action: {
            type: { type: String, required: true, enum: ["search_for_LP"] },
            queryId: {type: String, required: true }, //Da rivedere per l'id
            queryText: {type: String, required: true },
        },
    },
    options,
);

export const LPShownActionSchema = new Schema( //Meglio mettere minuscola? Rename del tipo in "ShowLPAction"?
    {
        ...baseActionSchema.obj,
        action: {
            type: { type: String, required: true, enum: ["LP_shown"] },
            queryId: {type: String, required: true }, //Da rivedere per l'id
            resultIds: {type: [String], required: true }, //Array
        },
    },
    options,
);

export const LPSelectionActionSchema = new Schema(
    {
        ...baseActionSchema.obj,
        action: {
            type: { type: String, required: true, enum: ["LP_selection"] },
            lpId: {type: String, required: true }, 
        },
    },
    options,
);

export const removeLPSelectionActionSchema = new Schema(
    {
        ...baseActionSchema.obj,
        action: {
            type: { type: String, required: true, enum: ["remove_LP_selection"] },
            lpId: {type: String, required: true }, 
        },
    },
    options,
);

export const signinToPolyGloTActionSchema = new Schema(
    {
        ...baseActionSchema.obj,
        action: {
            type: { type: String, required: true, enum: ["signin_to_PolyGloT"] },
            userRole: {type: String, required: true }, //Da rivedere se viene cambiato in enum
        },
    },
    options,
);

export const LPCreationActionSchema = new Schema(
    {
        ...baseActionSchema.obj,
        action: {
            type: { type: String, required: true, enum: ["lp_creation"] },
            lpId: {type: String, required: true },
        },
    },
    options,
);

export const LPModificationActionSchema = new Schema(
    {
        ...baseActionSchema.obj,
        action: {
            type: { type: String, required: true, enum: ["lp_modification"] },
            lpId: {type: String, required: true },
        },
    },
    options,
);

export const LPEliminationActionSchema = new Schema(
    {
        ...baseActionSchema.obj,
        action: {
            type: { type: String, required: true, enum: ["lp_elimination"] },
            lpId: {type: String, required: true },
        },
    },
    options,
);

export const openLearningPageActionSchema = new Schema(
    {
        ...baseActionSchema.obj,
        action: {
            type: { type: String, required: true, enum: ["open_learning_page"] },
            lpId: {type: String, required: true },
            pageId: {type: String, required: true },
            activity: {type: String, required: true },
        },
    },
    options,
);

export const closeLearningPageActionSchema = new Schema(
    {
        ...baseActionSchema.obj,
        action: {
            type: { type: String, required: true, enum: ["close_learning_page"] },
            lpId: {type: String, required: true },
            pageId: {type: String, required: true },
            activity: {type: String, required: true },
        },
    },
    options,
);

export const changeTabActionSchema = new Schema(
    {
        ...baseActionSchema.obj,
        action: {
            type: { type: String, required: true, enum: ["changed_tab"] },
            lpId: {type: String, required: true },
            pageId: {type: String, required: true },
        },
    },
    options,
);

export const changePageActionSchema = new Schema(
    {
        ...baseActionSchema.obj,
        action: {
            type: { type: String, required: true, enum: ["changed_page"] },
            lpId: {type: String, required: true },
            oldPageId: {type: String, required: true },
            newPageId: {type: String, required: true },
        },
    },
    options,
);

export const submitAnswerActionSchema = new Schema(
    {
        ...baseActionSchema.obj,
        action: {
            type: { type: String, required: true, enum: ["submitted_answer"] },
            lpId: {type: String, required: true },
            pageId: {type: String, required: true },
            exerciseType: {type: Types.ExerciseType, required: true },
            exerciseId: {type: String, required: true },
            answer: {type: String, required: true },
            result: {type: Boolean, required: true },
        },
    },
    options,
);

// MODELLO BASE
export const BaseActionModel = model<BaseActionDocument>("BaseAction", baseActionSchema);

// MODELLI SPECIFICI CON DISCRIMINATORE
export const OpenPageActionModel = BaseActionModel.discriminator<OpenPageActionDocument>(
    "OpenPageAction",
    openPageActionSchema
);

export const ClosePageActionModel = BaseActionModel.discriminator<ClosePageActionDocument>(
    "ClosePageAction",
    closePageActionSchema
);

export const SearchForLPActionModel = BaseActionModel.discriminator<SearchForLPActionDocument>(
    "SearchForLPAction",
    searchForLPActionSchema
);

export const LPShownActionModel = BaseActionModel.discriminator<LPShownActionDocument>(
    "LPShownAction",
    LPShownActionSchema
);

export const LPSelectionActionModel = BaseActionModel.discriminator<LPSelectionActionDocument>(
    "LPSelectionAction",
    LPSelectionActionSchema
);

export const RemoveLPSelectionActionModel = BaseActionModel.discriminator<RemoveLPSelectionActionDocument>(
    "RemoveLPSelectionAction",
    removeLPSelectionActionSchema
);

export const SigninToPolyGloTActionModel = BaseActionModel.discriminator<SigninToPolyGloTActionDocument>(
    "SigninToPolyGloTAction",
    signinToPolyGloTActionSchema
);

export const LPCreationActionModel = BaseActionModel.discriminator<LPCreationActionDocument>(
    "LPCreationAction",
    LPCreationActionSchema
);

export const LPModificationActionModel = BaseActionModel.discriminator<LPModificationActionDocument>(
    "LPModificationAction",
    LPModificationActionSchema
);

export const LPEliminationActionModel = BaseActionModel.discriminator<LPEliminationActionDocument>(
    "LPEliminationAction",
    LPEliminationActionSchema
);

export const OpenLearningPageActionModel = BaseActionModel.discriminator<OpenLearningPageActionDocument>(
    "OpenLearningPageAction",
    openLearningPageActionSchema
);

export const CloseLearningPageActionModel = BaseActionModel.discriminator<CloseLearningPageActionDocument>(
    "CloseLearningPageAction",
    closeLearningPageActionSchema
);

export const ChangeTabActionModel = BaseActionModel.discriminator<ChangeTabActionDocument>(
    "ChangeTabAction",
    changeTabActionSchema
);

export const ChangePageActionModel = BaseActionModel.discriminator<ChangePageActionDocument>(
    "ChangePageAction",
    changePageActionSchema
);

export const SubmitAnswerActionModel = BaseActionModel.discriminator<SubmitAnswerActionDocument>(
    "SubmitAnswerAction",
    submitAnswerActionSchema
);