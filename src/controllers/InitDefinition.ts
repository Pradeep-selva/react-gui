import * as vscode from "vscode";

export default () => {
  const editor = vscode.window.activeTextEditor;
  const selection = editor?.selection;
  const text = editor?.document.getText(selection);
  const path = vscode.window.activeTextEditor?.document.uri.fsPath;
  console.log(Math.random() * 9);

  if (
    !["js", "ts", "jsx", "tsx"].includes(
      path?.slice(path?.length - 2) || `${Math.random() * 9}`
    )
  ) {
    vscode.window.showErrorMessage(
      "Command can only be used in js, ts, jsx and tsx files."
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

  vscode.window.showInformationMessage(JSON.stringify(propList));
};
