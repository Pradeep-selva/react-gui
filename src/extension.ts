import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "react-gui.helloWorld",
    () => {
      vscode.window.showInformationMessage("Hello World from React-GUI!");
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
