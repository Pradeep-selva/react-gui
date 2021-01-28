export const initDefContent = (
  propList: string
) => `// replace 'Component' with the name of your component and add types to your props.
import React from "react";

interface ComponentProps {
  ${propList}
}

declare const Component: React.SFC<ComponentProps>;

export default Component;`;
