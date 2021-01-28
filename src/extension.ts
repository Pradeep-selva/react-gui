import * as vscode from "vscode";
import { InitDefinitionController } from "./controllers";
import { SidebarProvider } from "./providers";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("react-gui.init-def", () => {
      InitDefinitionController();
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
