import * as vscode from 'vscode';
import { initDefContent } from '../configs';
import type { IEntities } from '../types';
declare var require: any;

export default (
  customPath: string | null = null,
  props: IEntities = [],
  componentName: string | null = null
) => {
  const fs = require('fs');

  const editor = vscode.window.activeTextEditor;
  const selection = editor?.selection;
  const text = editor?.document.getText(selection);

  const path =
    customPath || vscode.window.activeTextEditor?.document.uri.fsPath;
  const pathToWrite = `${path?.slice(0, path?.lastIndexOf('.'))}.d.ts`;

  if (!['js', 'jsx'].some(ext => path?.endsWith(ext))) {
    vscode.window.showErrorMessage(
      'Command can only be used in js and jsx files.'
    );
    return;
  }

  let propList: string | undefined = '';

  if (!props.length) {
    propList = text
      ?.split(',')
      .map(prop => `${prop.replace(' ', '').replace('\n', '')}: ;`)
      .join('\n  ');
  } else {
    propList = props.map(prop => `${prop?.name}: ${prop?.type};`).join('\n  ');
  }

  fs.writeFile(
    pathToWrite,
    initDefContent(propList || '', componentName),
    (err: any) => {
      if (err) {
        return vscode.window.showErrorMessage(
          'An error occurred. Unable to write file'
        );
      }
      vscode.window.showInformationMessage(
        `Definition file created successfully!`
      );
    }
  );
};
