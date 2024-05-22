import axiosCreate, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export type aiAPIResponse = {
  Date: string;
  Question: string;
  CorrectAnswer: string;
};

enum TypeOfExercise {
  fill_in_the_blanks,
  question,
  choice,
  conceptual,
  practical,
}

type AIExerciseType = {
  macroSubject: string;
  title: string;
  level: number; //0=primary_school, 1=middle_school, 2=high_school, 3=college, 4=academy
  typeOfActivity: TypeOfExercise; //0=fill_in_the_blanks, 1=question, 2=choice, 3=conceptual, 4=practical
  learningObjective: string;
  bloomLevel: number; //0=Remembering, 1=Understanding, 2=Applying, 3=Analyzing, 4=Evaluating, 5=Creating
  language: string;
  material: string;
  correctAnswersNumber: number;
  distractorsNumber: number;
  easilyDiscardableDistractorsNumber: number;
  assignmentType: number; //0=theoretical, 1=code, 2=problem_resolution,
  topic: string;
  temperature: number;
};

const AIAPIGeneration = axiosCreate.create({
  baseURL: "https://skapi.polyglot-edu.com",
  headers: {
    "Content-Type": "application/json",
    ApiKey: process.env.APIKEY,
    SetupModel:
      '{"secretKey": "72ad445a32ad4b899c9a90cb496aae20","modelName": "gpt35Turbo","endpoint": "https://ai4edu.openai.azure.com/"}',
  },
});

export const API = {
  generateNewExercise: (body: AIExerciseType): Promise<AxiosResponse> => {
    return AIAPIGeneration.post<{}, AxiosResponse, {}>(
      `/Exercises/GenerateExercise`,
      body,
    );
  },
};
