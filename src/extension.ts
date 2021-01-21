import * as vscode from "vscode";
import { SidebarProvider } from "./providers";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("react-gui.helloWorld", () => {
      vscode.window.showInformationMessage("Hello World from React-GUI!");
    })
  );

  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "react-gui-side-panel",
      sidebarProvider
    )
  );
}

export function deactivate() {}
