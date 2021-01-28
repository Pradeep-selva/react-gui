type IEntity = {
  name: string;
  type: string;
};

export type IEntities = Array<IEntity>;

export type FileType = "js" | "ts";
export type ComponentType = "rfc" | "rcc";
export type LocationType = "here" | "new";

export interface IPayload {
  fileName: string;
  componentName: string;
  fileType: FileType;
  location: LocationType;
  componentType: ComponentType;
  props: IEntities;
  states: IEntities;
}
