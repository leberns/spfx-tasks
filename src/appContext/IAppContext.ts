import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IAppContext {
  context: WebPartContext;
  listTitle: string;
}