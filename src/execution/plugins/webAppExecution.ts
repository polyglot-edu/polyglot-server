import { PolyglotNode } from "../../types";
import { ChallengeContent, ChallengeSetup, LessonTextNodeData, MultipleChoiceQuestionNodeData, TrueFalseNodeData, WebAppContent, WebAppSetup, closeEndedQuestionNodeData, textLinkNodeData as TextLinkNodeData, zip } from "./Node";

type webAppSpecifics={webAppSetup: WebAppSetup[], webAppContent:WebAppContent[]};

//LessonTextNodeData Execution block

function lessonTextNodeExecution(node:PolyglotNode){
  const data = node.data as LessonTextNodeData;
  const webAppSetup: WebAppSetup[] = [];
  
  const webAppContent: WebAppContent[] = [{content: data, type: 'LessonText'}];    

  return {
    webAppSetup, 
    webAppContent,        
};
}

//readMaterialNode Execution block

function readMaterialNodeExecution(node:PolyglotNode){
  const data = node.data as TextLinkNodeData;

  const webAppSetup: WebAppSetup[] = [];
  
  const webAppContent: WebAppContent[] = [{content: data, type: 'ReadMaterial'}];    


  return {
    webAppSetup, 
    webAppContent,        
  };
}

//closeEndedQuestionNode Execution block 
function closeEndedQuestionNodeExecution(node:PolyglotNode){
  const data = node.data as closeEndedQuestionNodeData;

  const webAppSetup: WebAppSetup[] = [];
  
  const webAppContent: WebAppContent[] = [{content: data, type: 'CloseEndedQuestion'}];    

  return {
    webAppSetup, 
    webAppContent,        
  };
}

//MultipleChoiceQuestionNodeData Execution block  
function multipleChoiceQuestionNodeExecution(node:PolyglotNode){
  const data = node.data as MultipleChoiceQuestionNodeData;
  const webAppSetup: WebAppSetup[] = [];
  const webAppContent: WebAppContent[] = [{content: data, type: 'MultChoiceQuestion'}];    

  return {
    webAppSetup, 
    webAppContent,        
  };
}

//trueFalseNodeData Execution block  
function trueFalseNodeExecution(node:PolyglotNode){
  const data = node.data as TrueFalseNodeData;
  const webAppSetup: WebAppSetup[] = [];
  const webAppContent: WebAppContent[] = [{content: data, type: 'TrueFalse'}];    

  return {
    webAppSetup, 
    webAppContent,        
  };
}

//watchVideoNodeData Execution block  
function watchVideoNodeExecution(node:PolyglotNode){
  const data = node.data as TextLinkNodeData;
  const webAppSetup: WebAppSetup[] = [];
  const webAppContent: WebAppContent[] = [{content: data, type: 'WatchVideo'}];    

  return {
    webAppSetup, 
    webAppContent,        
  };
}

function summaryNodeExecution(node:PolyglotNode){
  const data = node.data as TextLinkNodeData;
  const webAppSetup: WebAppSetup[] = [];
  const webAppContent: WebAppContent[] = [{content: data, type: 'Summary'}];    

  return {
    webAppSetup, 
    webAppContent,        
  };
}

function notImplementedNodeExecution(node:PolyglotNode){

  const webAppSetup: WebAppSetup[] = [];
  const webAppContent: WebAppContent[] = [{content: "This node type is not implemented for WebApp execution, go to: "+node.platform, type: node.type}];    

  return {
    webAppSetup, 
    webAppContent,        
  };
}

export function webAppExecution(node:PolyglotNode,ctx:string){
  const challengeSetup: ChallengeSetup[] = [];
  console.log("uffa "+ctx);

  const challengeContent : ChallengeContent [] = [
      {
      type: 'markdown',
      content: 'https://polyglot-webapp.polyglot-edu.com/?&ctx='+ctx+'&rememberTipologyQuiz='+node.type+' !',
      },
  ];
  let webAppSpecifics:webAppSpecifics={webAppSetup:[],webAppContent:[]};
  if(node?.type=="multipleChoiceQuestionNode")  webAppSpecifics=multipleChoiceQuestionNodeExecution(node);
  if(node?.type=="lessonTextNode") webAppSpecifics=lessonTextNodeExecution(node);
  if(node?.type=="closeEndedQuestionNode") webAppSpecifics=closeEndedQuestionNodeExecution(node);
  if(node?.type=="ReadMaterialNode") webAppSpecifics=readMaterialNodeExecution(node);
  if(node?.type=="TrueFalseNode")  webAppSpecifics=trueFalseNodeExecution(node);  
  if(node?.type=="WatchVideoNode") webAppSpecifics=watchVideoNodeExecution(node);
  if(node?.type=="SummaryNode") webAppSpecifics=summaryNodeExecution(node);
  if(node?.type=="") webAppSpecifics = notImplementedNodeExecution(node); //default statement

  return {...node,
  runtimeData: {
    challengeSetup,
    challengeContent,
    webAppSpecifics
  },
  }
}
