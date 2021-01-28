import * as vscode from "vscode";
declare var require: any;

export default () => {
  const fs = require("fs");

  const editor = vscode.window.activeTextEditor;
  const selection = editor?.selection;
  const text = editor?.document.getText(selection);

  const path = vscode.window.activeTextEditor?.document.uri.fsPath;
  const pathToWrite = `${path?.slice(0, path?.lastIndexOf("."))}.d.ts`;

  if (!["js", "jsx"].some((ext) => path?.endsWith(ext))) {
    vscode.window.showErrorMessage(
      "Command can only be used in js and jsx files."
    );
    return;
  }

  const propList = text
    ?.split(",")
    .map((prop) => `${prop.replace(" ", "").replace("\n", "")}: ;`)
    .join("\n  ");

  const content = `// replace 'Component' with the name of your component and add types to your props.
import React from "react";

interface ComponentProps {
  ${propList}
}

declare const Component: React.SFC<ComponentProps>;

export default Component;`;

  fs.writeFile(pathToWrite, content, (err: any) => {
    if (err) {
      return vscode.window.showErrorMessage(
        "An error occurred. Unable to write file"
      );
    }
    vscode.window.showInformationMessage(
      `Definition file created successfully!`
    );
  });
};
