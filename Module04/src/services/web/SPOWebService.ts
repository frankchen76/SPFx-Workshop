import { IWebService } from "./IWebService";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { getSP } from "../pnpjsconfig";
import { spfi } from "@pnp/sp";
import { AssignFrom } from "@pnp/core";
import { ClientsideWebpart, ColumnControl, IClientsidePage } from "@pnp/sp/clientside-pages/types";
import "@pnp/sp/profiles";
import "@pnp/sp/clientside-pages/web";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/items/get-all";

export class SPOWebService implements IWebService {
    public readonly context: WebPartContext;
    constructor(ctx: WebPartContext) {
        this.context = ctx;
    }

    public getWebByPnPJS(): Promise<any> {
        let sp = getSP();
        return sp.web.select('Title')();
    }

    public getWebBySPORest(): Promise<any> {
        const url = `${this.context.pageContext.web.absoluteUrl}/_api/web?$select=Title`;
        return this.context.spHttpClient.get(url, SPHttpClient.configurations.v1).then(result => {
            return result.json();
        });
    }

    public async getCurrentUserProfile(): Promise<any> {
        let sp = getSP();
        const profile = await sp.profiles.myProperties();
        console.log(profile.DisplayName);
        console.log(profile.Email);
        console.log(profile.Title);
        console.log(profile.UserProfileProperties.length);
        // Properties are stored in Key/Value pairs,
        // so parse into an object called userProperties
        var props = {};
        profile.UserProfileProperties.forEach((prop) => {
            props[prop.Key] = prop.Value;
        });
        profile.userProperties = props;
        console.log("Account Name: " + profile.userProperties.AccountName);

        return profile;
    }
    public async getLargeList(): Promise<any> {
        const currentSP = getSP();
        const largeListUrl = "https://m365x725618.sharepoint.com/sites/Flow-Dev";
        const sp = spfi(largeListUrl).using(AssignFrom(currentSP.web));
        const allItems = await sp.web.lists.getByTitle("Documents").items.getAll();
        return {
            totalLength: allItems.length
        };
    }
    public async getListByCaml(): Promise<any> {
        const currentSP = getSP();
        const largeListUrl = "https://m365x725618.sharepoint.com/sites/Flow-Dev";
        const sp = spfi(largeListUrl).using(AssignFrom(currentSP.web));
        //const camlQuery = `<View><Query><Where><Gt><FieldRef Name="ID"/><Value Type="Number">3000</Value></Gt></Where></Query></View>`;
        const camlQuery = `<View><Query><Where><Eq><FieldRef Name="Title"/><Value Type="Text">Test35</Value></Eq></Where></Query></View>`;
        const queryItems = await sp.web.lists.getByTitle("LargeList").getItemsByCAMLQuery({
            ViewXml: camlQuery,
        });
        return {
            totalLength: queryItems.length,
            result: queryItems
        };
    }
    public async getPageInfo(): Promise<any> {
        let sp = getSP();
        const result = await sp.web();
        const welcomePageUrl = `${result.Url}\\${result.WelcomePage}`;
        console.log("Welcome page:", welcomePageUrl);

        const pageItem = await sp.web.getFileByUrl(welcomePageUrl).getItem();
        const pageLikeInfo = await pageItem.getLikedByInformation();

        // Find File Viewer web part. 
        const page: IClientsidePage = await sp.web.loadClientsidePage(new URL(welcomePageUrl).pathname);
        const ctrlFileViewer = page.findControl<ClientsideWebpart>((c: ColumnControl<any>): boolean => {
            let ret = false;
            const json = c.data;
            return c.data.webPartId == "b7dd04e1-19ce-4b24-9132-b60a1c2b910d";
        });
        return {
            welcomePage: welcomePageUrl,
            pageLikeInfo: pageLikeInfo
        };
    }
}
