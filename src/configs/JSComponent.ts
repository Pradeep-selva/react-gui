interface IEntity {
  name: string;
  type: string;
}

export const rfcComponentContent = (
  componentName: string,
  props: Array<IEntity> = [],
  states: Array<IEntity> = []
) => {
  const propString = props.map((prop) => prop.name).join(",");
  const stateString = states
    .map((state) => `const [${state.name}, set${state.name}] = useState(null);`)
    .join("\n  ");
  const reactImport = "React" + !!states[0] ? ", {useState}" : "";

  return `import ${reactImport} from "react";

const ${componentName} = ({${propString}}) => {
  ${stateString}

  return (<div></div>);
};

export default ${componentName};
`;
};

export const rccComponentContent = (
  componentName: string,
  props: Array<IEntity> = [],
  states: Array<IEntity> = []
) => {
  const propString = props.map((prop) => prop.name).join(",");
  const stateString = states
    .map((state) => `${state.name}: null,`)
    .join("\n    ");
  const stateInit = `this.state = {
      ${stateString}
  };`;
  const stateDeconstruct = states.map((state) => state.name).join(", ");

  return `import React, {Component} from "react";

class ${componentName} extends Component {
  constructor(props) {
    super(props);

    ${!!states[0] ? stateInit : ""}
  }

  render() {
    const {${propString}} = this.props;
    const {${stateDeconstruct}} = this.state;

    return (<div></div>)
  }
}
  `;
};
