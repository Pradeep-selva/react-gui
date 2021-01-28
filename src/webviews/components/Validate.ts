import { propTypes } from "../../configs";

interface IPayload {
  fileName: string;
  componentName: string;
  fileType: "ts" | "js";
  location: "here" | "new";
  componentType: "rfc" | "rcc";
  props: Array<{ name: string; type: string } | null>;
  states: Array<{ name: string; type: string } | null>;
}

export default (payload: IPayload): string => {
  const {
    componentName,
    fileName,
    fileType,
    location,
    props,
    states
  } = payload;

  if (!componentName) {
    return "Enter a component name to create it.";
  }

  if (location === "new" && !fileName) {
    return "You must enter a file name to create component.";
  }

  if (
    fileType === "js" &&
    !props.every((prop) => propTypes.includes(prop?.type || ""))
  ) {
    return "Some of the entered prop types are not valid. Leave the type field empty to use default value.";
  }

  if (fileType === "ts") {
    const isPropValid = props.every((prop) => !!prop?.type);
    const isStateValid = states.every((state) => !!state?.type);

    if (!isPropValid || !isStateValid) {
      return "You must specify types for every prop/state for a TSX component";
    }
  }

  return "";
};
