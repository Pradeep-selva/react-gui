import * as vscode from "vscode";

export default () => {
  const editor = vscode.window.activeTextEditor;
  const selection = editor?.selection;
  const text = editor?.document.getText(selection);

  const propList = text
    ?.split(",")
    .map((prop) => prop.replace(" ", "").replace("\n", ""));

  vscode.window.showInformationMessage(JSON.stringify(propList));
};
