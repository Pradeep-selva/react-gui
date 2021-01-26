import { capitalize } from "../utils";

interface IEntity {
  name: string;
  type: string;
}

export const rfcTsComponentContent = (
  componentName: string,
  props: Array<IEntity> = [],
  states: Array<IEntity> = []
) => {
  const propTypes = props
    .map((prop) => `${prop.name}: ${prop.type};`)
    .join("\n  ");
  const propInterface = `interface IProps {
  ${propTypes}
}`;

  const propString = props.map((prop) => prop?.name).join(",");
  const stateString = states
    .map(
      (state) =>
        `const [${state?.name}, set${capitalize(state?.name)}] = useState<${
          state.type
        }>(null);`
    )
    .join("\n    ");

  const reactImport = "React" + (!!states[0] ? ", {useState}" : "");

  return `import ${reactImport} from "react";

${!!props[0] ? propInterface : ""}

const ${componentName} = ({${propString}}: IProps) => {
  ${stateString}

  return (<div></div>);
};

export default ${componentName};
`;
};

export const rccTsComponentContent = (
  componentName: string,
  props: Array<IEntity> = [],
  states: Array<IEntity> = []
) => {
  const propTypes = props
    .map((prop) => `${prop.name}: ${prop.type};`)
    .join("\n  ");
  const propInterface = `interface IProps {
  ${propTypes}
}`;

  const stateTypes = states
    .map((state) => `${state.name}: ${state.type};`)
    .join("\n");
  const stateInterface = `interface IState {
  ${stateTypes}
}`;

  const propString = props.map((prop) => prop?.name).join(",");
  const stateString = states
    .map((state) => `${state?.name}: null,`)
    .join("\n    ");

  const stateInit = `this.state = {
      ${stateString}
    };`;
  const stateDeconstruct = !!states[0]
    ? `const {${states.map((state) => state?.name).join(", ")}} = this.state;`
    : "";

  const componentTypeString =
    !!props[0] || !!states[0]
      ? `<${!!props[0] ? "IProps" : ""}${!!states[0] ? ", IState" : ""}>`
      : "";

  return `import React, {Component} from "react";

${!!props[0] ? propInterface : ""}
${!!states[0] ? stateInterface : ""}

class ${componentName} extends Component${componentTypeString} {
  constructor(props: IProps) {
    super(props);
    ${!!states[0] ? stateInit : ""}
  }

  render() {
    const {${propString}} = this.props;
    ${stateDeconstruct}

    return (<div></div>);
  }
};

export default ${componentName};`;
};
