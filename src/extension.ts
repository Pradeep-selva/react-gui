import * as vscode from 'vscode';
import { InitDefinitionController } from './controllers';
import { SidebarProvider, PanelProvider } from './providers';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('react-gui.init-def', () => {
      InitDefinitionController();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('react-gui.init-redux', () => {
      PanelProvider.createOrShow(context.extensionUri);
    })
  );

  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      'react-gui-side-panel',
      sidebarProvider
    )
  );
}

export function deactivate() {}
