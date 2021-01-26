import * as vscode from "vscode";
import { rccComponentContent, rfcComponentContent } from "../configs";

declare var require: any;

interface IPayload {
  fileName: string;
  componentName: string;
  fileType: "ts" | "js";
  location: "here" | "new";
  componentType: "rfc" | "rcc";
  props: Array<{ name: string; type: string }>;
  states: Array<{ name: string; type: string }>;
}

export default (payload: IPayload) => {
  const fs = require("fs");
  const path = vscode.window.activeTextEditor?.document.uri.fsPath;
  const { componentName, props, states, componentType } = payload;

  fs.writeFile(
    path,
    componentType === "rfc"
      ? rfcComponentContent(componentName, props, states)
      : rccComponentContent(componentName, props, states),
    (err: any) => {
      if (err) {
        return vscode.window.showErrorMessage(
          "An error occurred. Unable to write file"
        );
      }
      vscode.window.showInformationMessage(
        `Component ${componentName} created successfully!`
      );
    }
  );
};
