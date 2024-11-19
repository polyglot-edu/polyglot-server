import axiosCreate, { AxiosResponse } from "axios";
import {
  AIExerciseType,
  AnalyseType,
  CorrectorType,
  LOType,
  MaterialType,
  SummarizeType,
} from "../types/AIGenerativeTypes";

export type aiAPIResponse = {
  Date: string;
  Question: string;
  CorrectAnswer: string;
};

const AIAPIGeneration = axiosCreate.create({
  baseURL: "https://skapi.polyglot-edu.com",
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
    Access: "*",
    ApiKey: process.env.APIKEY,
    SetupModel:
      '{"secretKey": "' +
      process.env.SECRETKEY +
      '","modelName": "GPT-4o-MINI","endpoint": "https://ai4edu.openai.azure.com/"}',
  },
});

export const API = {
  analyseMaterial: (body: AnalyseType): Promise<AxiosResponse> => {
    return AIAPIGeneration.post<{}, AxiosResponse, {}>(
      `/MaterialAnalyser/analyseMaterial`,
      body,
    );
  },

  generateLO: (body: LOType): Promise<AxiosResponse> => {
    return AIAPIGeneration.post<{}, AxiosResponse, {}>(
      `/LearningObjectiveGenerator/generateLearningObjective`,
      body,
    );
  },

  generateMaterial: (body: MaterialType): Promise<AxiosResponse> => {
    return AIAPIGeneration.post<{}, AxiosResponse, {}>(
      `/MaterialGenerator/generatematerial`,
      body,
    );
  },

  summarize: (body: SummarizeType): Promise<AxiosResponse> => {
    return AIAPIGeneration.post<{}, AxiosResponse, {}>(
      `/Summarizer/summarize`,
      body,
    );
  },

  generateNewExercise: (body: AIExerciseType): Promise<AxiosResponse> => {
    return AIAPIGeneration.post<{}, AxiosResponse, {}>(
      `/ActivityGenerator/generateActivity`,
      body,
    );
  },

  corrector: (body: CorrectorType): Promise<AxiosResponse> => {
    return AIAPIGeneration.post<{}, AxiosResponse, {}>(
      `/Corrector/evaluate`,
      body,
    );
  },
};
