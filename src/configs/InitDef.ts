export const initDefContent = (
  propList: string,
  componentName: string | null
) => `${
  !componentName
    ? "// replace 'Component' with the name of your component and add types to your props."
    : ""
}
import React from "react";

interface ${componentName || "Component"}Props {
  ${propList}
}

declare const ${componentName || "Component"}: React.SFC<${
  componentName || "Component"
}Props>;

export default ${componentName || "Component"};`;
