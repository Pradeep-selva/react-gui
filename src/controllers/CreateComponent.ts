import * as vscode from 'vscode';
import type { IPayload } from '../types';
import {
  rccJsComponentContent,
  rfcJsComponentContent
} from '../configs/JSComponent';
import {
  rfcTsComponentContent,
  rccTsComponentContent
} from '../configs/TSComponent';

declare var require: any;

export default (payload: IPayload) => {
  const fs = require('fs');
  const path = vscode.window.activeTextEditor?.document.uri.fsPath;
  const { componentName, props, states, componentType, fileType } = payload;

  console.log(path, fileType);

  if (fileType === 'js' && !['js', 'jsx'].some(ext => path?.endsWith(ext))) {
    vscode.window.showErrorMessage(
      "cannot create js component in a file that isn't js/jsx"
    );
    return;
  }

  if (
    fileType === 'ts' &&
    !['ts', 'tsx'].some(ext => path?.endsWith(ext)) &&
    path?.endsWith('.d.ts')
  ) {
    vscode.window.showErrorMessage(
      "cannot create ts component in a file that isn't ts/tsx"
    );
    return;
  }

  fs.writeFile(
    path,
    fileType === 'js'
      ? componentType === 'rfc'
        ? rfcJsComponentContent(payload)
        : rccJsComponentContent(payload)
      : componentType === 'rfc'
      ? rfcTsComponentContent(componentName, props, states)
      : rccTsComponentContent(componentName, props, states),
    (err: any) => {
      if (err) {
        return vscode.window.showErrorMessage(
          'An error occurred. Unable to write file'
        );
      }
      vscode.window.showInformationMessage(
        `Component ${componentName} created successfully!`
      );
    }
  );
};
