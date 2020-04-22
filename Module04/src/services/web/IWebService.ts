import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IWebService {
  readonly context: WebPartContext;
  getWebByPnPJS(): Promise<any>;
  getWebBySPORest(): Promise<any>;
}
