import { capitalize } from "../utils";
import type { IEntities } from "../types";

export const rfcJsComponentContent = (
  componentName: string,
  props: IEntities = [],
  states: IEntities = []
) => {
  const propString = props.map((prop) => prop?.name).join(",");
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

const ${componentName} = ({${propString}}) => {
  ${stateString}

  return (<div></div>);
};

export default ${componentName};
`;
};

export const rccJsComponentContent = (
  componentName: string,
  props: IEntities = [],
  states: IEntities = []
) => {
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

  return `import React, {Component} from "react";

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

export default ${componentName}`;
};
