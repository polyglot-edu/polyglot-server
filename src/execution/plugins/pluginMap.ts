import { PolyglotNode } from "../../types";
import { vsCodeExecution, webAppExecution } from "./index";

export function nodeTypeExecution(node: PolyglotNode | null, ctx: string) {
  if (node?.platform == "VSCode") return vsCodeExecution(node);
  if (node?.platform == "WebApp" || node?.platform == "Eraser" || node?.platform == "PapyrusWeb")
    return webAppExecution(node, ctx);
  console.log("not execution run");
  return node;
}
