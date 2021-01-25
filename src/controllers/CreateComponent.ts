import * as vscode from "vscode";
import { componentContent } from "../configs";

interface IPayload {
  fileName: string;
  fileType: string;
  location: string;
  props: Array<{ name: string; type: string }>;
  states: Array<{ name: string; type: string }>;
}

export default (payload: IPayload) => {
  const fs = require("fs");
  const path = vscode.window.activeTextEditor?.document.uri.fsPath;
  console.log(payload);

  fs.writeFile(
    path,
    componentContent(payload.props, payload.states),
    (err: any) => {
      if (err) {
        return console.log(err);
      }
      console.log("Component created");
    }
  );
};
