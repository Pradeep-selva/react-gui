import * as vscode from "vscode";
import type { IPayload } from "../types";
import {
  rccJsComponentContent,
  rfcJsComponentContent
} from "../configs/JSComponent";
import {
  rfcTsComponentContent,
  rccTsComponentContent
} from "../configs/TSComponent";

declare var require: any;

export default (payload: IPayload) => {
  const fs = require("fs");
  const path = vscode.window.activeTextEditor?.document.uri.fsPath;
  const {
    componentName,
    props,
    states,
    componentType,
    fileType,
    initDefFile,
    initPropTypes,
    location
  } = payload;

  fs.writeFile(
    path,
    fileType === "js"
      ? componentType === "rfc"
        ? rfcJsComponentContent(
            componentName,
            props,
            states,
            initPropTypes,
            initDefFile,
            location
          )
        : rccJsComponentContent(
            componentName,
            props,
            states,
            initPropTypes,
            initDefFile,
            location
          )
      : componentType === "rfc"
      ? rfcTsComponentContent(componentName, props, states)
      : rccTsComponentContent(componentName, props, states),
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
