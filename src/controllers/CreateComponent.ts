import * as vscode from "vscode";
import { rfcComponentContent } from "../configs";

declare var require: any;

interface IPayload {
  fileName: string;
  componentName: string;
  fileType: string;
  location: string;
  componentType: string;
  props: Array<{ name: string; type: string }>;
  states: Array<{ name: string; type: string }>;
}

export default (payload: IPayload) => {
  const fs = require("fs");
  const path = vscode.window.activeTextEditor?.document.uri.fsPath;
  console.log(payload);

  fs.writeFile(
    path,
    rfcComponentContent(payload.componentName, payload.props, payload.states),
    (err: any) => {
      if (err) {
        return console.log(err);
      }
      console.log("Component created");
    }
  );
};
