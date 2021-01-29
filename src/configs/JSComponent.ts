import { capitalize } from "../utils";
import type { IEntities } from "../types";

export const rfcJsComponentContent = (
  componentName: string,
  props: IEntities = [],
  states: IEntities = [],
  isTypeChecked: boolean = false
) => {
  const propString = props.map((prop) => prop?.name).join(",");
  let propTypeString = "";

  if (isTypeChecked) {
    propTypeString = `${componentName}.propTypes = {
      ${props
        .map((prop) => `${prop?.name}: PropTypes.${prop?.type},`)
        .join("\n  ")}
    }`;
  }

  const stateString = states
    .map(
      (state) =>
        `const [${state?.name}, set${capitalize(
          state?.name
        )}] = useState(null);`
    )
    .join("\n    ");
  const reactImport = "React" + (!!states[0] ? ", {useState}" : "");

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

export const rccJsComponentContent = (
  componentName: string,
  props: IEntities = [],
  states: IEntities = [],
  isTypeChecked: boolean = false
) => {
  const propString = props.map((prop) => prop?.name).join(",");
  let propTypeString = "";

  if (isTypeChecked) {
    propTypeString = `${componentName}.propTypes = {
      ${props
        .map((prop) => `${prop?.name}: PropTypes.${prop?.type},`)
        .join("\n  ")}
    }`;
  }

  const stateString = states
    .map((state) => `${state?.name}: null,`)
    .join("\n    ");
  const stateInit = `this.state = {
      ${stateString}
    };`;
  const stateDeconstruct = !!states[0]
    ? `const {${states.map((state) => state?.name).join(", ")}} = this.state;`
    : "";

  return `import React, {Component} from "react";
import PropTypes from 'prop-types';

class ${componentName} extends Component {
  constructor(props) {
    super(props);
    ${!!states[0] ? stateInit : ""}
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
