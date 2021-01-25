interface IEntity {
  name: string;
  type: string;
}

export const componentContent = (
  props: Array<IEntity>,
  states: Array<IEntity>
) =>
  `import React from "react";
`;
