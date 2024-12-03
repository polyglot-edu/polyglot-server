import mongoose, { Schema, model, Document } from "mongoose";
//import { v4 as uuidv4 } from "uuid";   //Do we need this?
//import validator from "validator";
import * as Types from "../types/LearningData";

const options = { discriminatorKey: "type" };

//Interfacce per Mongoose
export interface BaseActionDocument extends Types.BaseAction, Document {}
export interface OpenToolActionDocument
  extends Types.OpenToolAction,
    Document {}
export interface CloseToolActionDocument
  extends Types.CloseToolAction,
    Document {}
export interface OpenLPSelectionActionDocument
  extends Types.OpenLPSelectionAction,
    Document {}
export interface CloseLPSelectionActionDocument
  extends Types.CloseLPSelectionAction,
    Document {}
export interface SearchForLPActionDocument
  extends Types.SearchForLPAction,
    Document {}
export interface ShowLPActionDocument extends Types.ShowLPAction, Document {}
export interface SelectLPActionDocument
  extends Types.SelectLPAction,
    Document {}
export interface RemoveLPSelectionActionDocument
  extends Types.RemoveLPSelectionAction,
    Document {}
export interface LogInToPolyGloTActionDocument
  extends Types.LogInToPolyGloTAction,
    Document {}
export interface LogOutToPolyGloTActionDocument
  extends Types.LogOutToPolyGloTAction,
    Document {}
export interface CreateLPActionDocument
  extends Types.CreateLPAction,
    Document {}
export interface ModifyLPActionDocument
  extends Types.ModifyLPAction,
    Document {}
export interface DeleteLPActionDocument
  extends Types.DeleteLPAction,
    Document {}
export interface OpenNodeActionDocument
  extends Types.OpenNodeAction,
    Document {}
export interface CloseNodeActionDocument
  extends Types.CloseNodeAction,
    Document {}
export interface ChangeNodeActionDocument
  extends Types.ChangeNodeAction,
    Document {}
export interface SubmitAnswerActionDocument
  extends Types.SubmitAnswerAction,
    Document {}

//Schema base
export const baseActionSchema = new Schema(
  {
    timestamp: { type: Date, required: true },
    userId: { type: String, required: true },
    zoneId: { type: Types.ZoneId, required: true },
    type: { type: String, required: true },
    platform: { type: Types.Platform, required: true },
  },
  options,
);

//Schemi specifici
export const openToolActionSchema = new Schema(
  {
    ...baseActionSchema.obj,
    action: {
      pageId: { type: String, required: true },
    },
  },
  options,
);

export const closeToolActionSchema = new Schema(
  {
    ...baseActionSchema.obj,
    action: {
      pageId: { type: String, required: true },
    },
  },
  options,
);

export const openLPSelectionActionSchema = new Schema(
  {
    ...baseActionSchema.obj,
    action: {
      flowId: { type: String, required: true },
    },
  },
  options,
);

export const closeLPSelectionActionSchema = new Schema(
  {
    ...baseActionSchema.obj,
    action: {
      flowId: { type: String, required: true },
    },
  },
  options,
);

export const searchForLPActionSchema = new Schema(
  {
    ...baseActionSchema.obj,
    action: {
      queryId: { type: String, required: true }, //Aggiungere id?
      queryText: { type: String, required: true },
    },
  },
  options,
);

export const showLPActionSchema = new Schema(
  {
    ...baseActionSchema.obj,
    action: {
      queryId: { type: String, required: true }, //Da rivedere per l'id
      resultIds: { type: [String], required: true },
    },
  },
  options,
);

export const selectLPActionSchema = new Schema(
  {
    ...baseActionSchema.obj,
    action: {
      flowId: { type: String, required: true },
    },
  },
  options,
);

export const removeLPSelectionActionSchema = new Schema(
  {
    ...baseActionSchema.obj,
    action: {
      flowId: { type: String, required: true },
    },
  },
  options,
);

export const logInToPolyGloTActionSchema = new Schema(
  {
    ...baseActionSchema.obj,
    action: {
      userRole: { type: String, required: true }, //Da rivedere se viene cambiato in enum
    },
  },
  options,
);

export const logOutToPolyGloTActionSchema = new Schema(
  {
    ...baseActionSchema.obj,
    action: {
      userRole: { type: String, required: true }, //Da rivedere se viene cambiato in enum
    },
  },
  options,
);

export const createLPActionSchema = new Schema(
  {
    ...baseActionSchema.obj,
    action: {
      flowId: { type: String, required: true },
    },
  },
  options,
);

export const modifyLPActionSchema = new Schema(
  {
    ...baseActionSchema.obj,
    action: {
      flowId: { type: String, required: true },
    },
  },
  options,
);

export const deleteLPActionSchema = new Schema(
  {
    ...baseActionSchema.obj,
    action: {
      flowId: { type: String, required: true },
    },
  },
  options,
);

export const openNodeActionSchema = new Schema(
  {
    ...baseActionSchema.obj,
    action: {
      flowId: { type: String, required: true },
      pageId: { type: String, required: true },
      //activity: { type: String, required: true },
    },
  },
  options,
);

export const closeNodeActionSchema = new Schema(
  {
    ...baseActionSchema.obj,
    action: {
      flowId: { type: String, required: true },
      pageId: { type: String, required: true },
      //activity: { type: String, required: true },
    },
  },
  options,
);

export const changeTabActionSchema = new Schema(
  {
    ...baseActionSchema.obj,
    action: {
      type: { type: String, required: true, enum: ["changed_tab"] },
      lpId: { type: String, required: true },
      pageId: { type: String, required: true },
    },
  },
  options,
);

export const changeNodeActionSchema = new Schema(
  {
    ...baseActionSchema.obj,
    action: {
      flowId: { type: String, required: true },
      oldNodeId: { type: String, required: true },
      newNodeId: { type: String, required: true },
    },
  },
  options,
);

export const submitAnswerActionSchema = new Schema(
  {
    ...baseActionSchema.obj,
    action: {
      flowId: { type: String, required: true },
      nodeId: { type: String, required: true },
      exerciseType: { type: Types.ExerciseType, required: true },
      answer: { type: [String], required: true },
      result: { type: Boolean, required: true },
    },
  },
  options,
);

// MODELLO BASE
export const BaseActionModel = model<BaseActionDocument>(
  "BaseAction",
  baseActionSchema,
);

// MODELLI SPECIFICI CON DISCRIMINATORE
export const OpenToolActionModel =
  BaseActionModel.discriminator<OpenToolActionDocument>(
    "OpenPageAction",
    openToolActionSchema,
  );

export const CloseToolActionModel =
  BaseActionModel.discriminator<CloseToolActionDocument>(
    "CloseToolAction",
    closeToolActionSchema,
  );

export const OpenLPSelectionActionModel =
  BaseActionModel.discriminator<OpenLPSelectionActionDocument>(
    "OpenLPSelectionAction",
    openLPSelectionActionSchema,
  );

export const CloseLPSelectionActionModel =
  BaseActionModel.discriminator<CloseLPSelectionActionDocument>(
    "CloseLPSelectionAction",
    closeLPSelectionActionSchema,
  );

export const SearchForLPActionModel =
  BaseActionModel.discriminator<SearchForLPActionDocument>(
    "SearchForLPAction",
    searchForLPActionSchema,
  );

export const ShowLPActionModel =
  BaseActionModel.discriminator<ShowLPActionDocument>(
    "ShowLPAction",
    showLPActionSchema,
  );

export const SelectLPActionModel =
  BaseActionModel.discriminator<SelectLPActionDocument>(
    "SelectLPAction",
    selectLPActionSchema,
  );

export const RemoveLPSelectionActionModel =
  BaseActionModel.discriminator<RemoveLPSelectionActionDocument>(
    "RemoveLPSelectionAction",
    removeLPSelectionActionSchema,
  );

export const LogInToPolyGloTActionModel =
  BaseActionModel.discriminator<LogInToPolyGloTActionDocument>(
    "LogInToPolyGloTAction",
    logInToPolyGloTActionSchema,
  );

export const LogOutToPolyGloTActionModel =
  BaseActionModel.discriminator<LogOutToPolyGloTActionDocument>(
    "LogOutToPolyGloTAction",
    logOutToPolyGloTActionSchema,
  );

export const CreateLPActionModel =
  BaseActionModel.discriminator<CreateLPActionDocument>(
    "CreateLPAction",
    createLPActionSchema,
  );

export const ModifyLPActionModel =
  BaseActionModel.discriminator<ModifyLPActionDocument>(
    "ModifyLPAction",
    modifyLPActionSchema,
  );

export const DeleteLPActionModel =
  BaseActionModel.discriminator<DeleteLPActionDocument>(
    "DeleteLPAction",
    deleteLPActionSchema,
  );

export const OpenNodeActionModel =
  BaseActionModel.discriminator<OpenNodeActionDocument>(
    "OpenNodeAction",
    openNodeActionSchema,
  );

export const CloseNodeActionModel =
  BaseActionModel.discriminator<CloseNodeActionDocument>(
    "CloseNodeAction",
    closeNodeActionSchema,
  );

export const ChangeNodeActionModel =
  BaseActionModel.discriminator<ChangeNodeActionDocument>(
    "ChangeNodeAction",
    changeNodeActionSchema,
  );

export const SubmitAnswerActionModel =
  BaseActionModel.discriminator<SubmitAnswerActionDocument>(
    "SubmitAnswerAction",
    submitAnswerActionSchema,
  );
