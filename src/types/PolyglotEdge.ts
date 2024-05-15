// TODO: FIXME: share types between projects

export type PolyglotEdge = {
  _id: string;
  type: string;
  title: string;
  code: string;
  data: {};
  reactFlow: any;
};

export type PolyglotEdgeFailDebtData = {
  conditionKind: string;
  material: string;
  macroSubject: string;
  topic: string;
  learningObjective: string;
  title: string;
  language: string;
  level: number;
  temperature: number;
  typeOfExercise: number;
  assignmentType: number;
  bloomLevel: number;
};
