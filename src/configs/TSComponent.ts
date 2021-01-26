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
        `const [${state?.name}, set${state?.name}] = useState<${state.type}>(null);`
    )
    .join("\n    ");

  const reactImport = "React" + (!!states[0] ? ", {useState}" : "");

  return `import ${reactImport} from "react";
    ${!!props[0] && propInterface}

const ${componentName} = ({${propString}}: IProps) => {
  ${stateString}

  return (<div></div>);
};

export default ${componentName};
`;
};
