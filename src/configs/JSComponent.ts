import * as vscode from 'vscode';
import { capitalize } from '../utils';
import { InitDefinitionController } from '../controllers';
import type { IEntities, IPayload, LocationType } from '../types';

export const rfcJsComponentContent = (payload: IPayload) => {
  const {
    componentName,
    props,
    states,
    initPropTypes,
    initDefFile,
    location,
    fileName
  } = payload;

  const propString = props.map(prop => prop?.name).join(',');
  let propTypeString = '';

  if (initPropTypes) {
    propTypeString = `${componentName}.propTypes = {
      ${props
        .map(prop => `${prop?.name}: PropTypes.${prop?.type},`)
        .join('\n  ')}
    }`;
  }

  const stateString = states
    .map(
      state =>
        `const [${state?.name}, set${capitalize(
          state?.name
        )}] = useState(null);`
    )
    .join('\n    ');
  const reactImport = 'React' + (!!states[0] ? ', {useState}' : '');

  if (initDefFile) {
    initDefFileService(location, props, componentName, fileName);
  }

  return `import ${reactImport} from "react";
import PropTypes from 'prop-types';

const ${componentName} = ({${propString}}) => {
  ${stateString}

  return (<div></div>);
};

${propTypeString}
export default ${componentName};
`;
};

export const rccJsComponentContent = (payload: IPayload) => {
  const {
    componentName,
    props,
    states,
    initPropTypes,
    initDefFile,
    location,
    fileName
  } = payload;
  console.log(payload);

  const propString = props.map(prop => prop?.name).join(',');
  let propTypeString = '';

  if (initPropTypes) {
    propTypeString = `${componentName}.propTypes = {
      ${props
        .map(prop => `${prop?.name}: PropTypes.${prop?.type},`)
        .join('\n  ')}
    }`;
  }

  const stateString = states
    .map(state => `${state?.name}: null,`)
    .join('\n    ');
  const stateInit = `this.state = {
      ${stateString}
    };`;
  const stateDeconstruct = !!states[0]
    ? `const {${states.map(state => state?.name).join(', ')}} = this.state;`
    : '';

  if (initDefFile) {
    initDefFileService(location, props, componentName, fileName);
  }

  return `import React, {Component} from "react";
import PropTypes from 'prop-types';

class ${componentName} extends Component {
  constructor(props) {
    super(props);
    ${!!states[0] ? stateInit : ''}
  }

  render() {
    const {${propString}} = this.props;
    ${stateDeconstruct}

    return (<div></div>);
  }
};

${propTypeString}
export default ${componentName}`;
};

const initDefFileService = (
  location: LocationType,
  props: IEntities = [],
  componentName: string,
  fileName: string
) => {
  if (!props.length) {
    return;
  }
  let path = vscode.window.activeTextEditor?.document.uri.fsPath;

  if (location === 'new') {
    path = `${path?.slice(0, path?.lastIndexOf('/'))}/${fileName}`;
  }
  console.log(path);
  InitDefinitionController(path, props, componentName);
};
