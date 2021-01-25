interface IEntity {
  name: string;
  type: string;
}

export const componentContent = (
  props: Array<IEntity>,
  states: Array<IEntity>
) => {
  const propString = props.map((prop) => prop.name).join(",");
  const stateString = states
    .map(
      (state) =>
        `const [${state.name}, set${state.name}] = React.useState(null);\n`
    )
    .join(",");

  return `import React from "react";

  const Component = ({${propString}}) => {
    ${stateString}

    return (<div></div>);
  };

  export default Component
`;
};
