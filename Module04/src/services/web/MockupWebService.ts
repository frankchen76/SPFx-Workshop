import { IWebService } from "./IWebService";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export class MockupWebService implements IWebService {
  public readonly context: WebPartContext;
  public getWebByPnPJS(): Promise<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          Title: 'Mockup Web Title from PnP js'
        });
      }, 1000);
    });
  }
  public getWebBySPORest(): Promise<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          Title: 'Mockup Web Title from SPO REST API'
        });
      }, 1000);
    });
  }

}
