import { IWebService } from "./IWebService";
import { sp } from "@pnp/sp/presets/all";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export class SPOWebService implements IWebService {
  public readonly context: WebPartContext;
  constructor(ctx: WebPartContext) {
    this.context = ctx;
  }

  public getWebByPnPJS(): Promise<any> {
    return sp.web.get();
  }

  public getWebBySPORest(): Promise<any> {
    const url = `${this.context.pageContext.web.absoluteUrl}/_api/web`;
    return this.context.spHttpClient.get(url, SPHttpClient.configurations.v1).then(result => {
      return result.json();
    });
  }

}
