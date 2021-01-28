import * as vscode from "vscode";
import { SidebarProvider } from "./providers";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("react-gui.init-def", () => {
      const editor = vscode.window.activeTextEditor;
      var selection = editor?.selection;
      var text = editor?.document.getText(selection);
      vscode.window.showInformationMessage(text || "");
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
