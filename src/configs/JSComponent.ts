interface IEntity {
  name: string;
  type: string;
}

export const rfcComponentContent = (
  componentName: string,
  props: Array<IEntity>,
  states: Array<IEntity>
) => {
  const propString = props.map((prop) => prop.name).join(",");
  const stateString = states
    .map(
      (state) =>
        `const [${state.name}, set${state.name}] = React.useState(null);`
    )
    .join("\n  ");

  return `import React from "react";

const ${componentName} = ({${propString}}) => {
  ${stateString}

  return (<div></div>);
};

export default ${componentName};
`;
};
