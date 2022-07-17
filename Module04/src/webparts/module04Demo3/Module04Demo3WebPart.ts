import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
    IPropertyPaneConfiguration,
    PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'Module04Demo3WebPartStrings';
import Module04Demo3 from './components/Module04Demo3';
import { IModule04Demo3Props } from './components/IModule04Demo3Props';
import { IWebService } from '../../services/web/IWebService';
import { MockupWebService } from '../../services/web/MockupWebService';
import { SPOWebService } from '../../services/web/SPOWebService';
import { getSP } from '../../services/pnpjsconfig';
import { Module04Demo3FC } from './components/Module04Demo3FC';

export interface IModule04Demo3WebPartProps {
    description: string;
}

export default class Module04Demo3WebPart extends BaseClientSideWebPart<IModule04Demo3WebPartProps> {

    protected onInit(): Promise<void> {
        getSP(this.context);
        return super.onInit();
    }
    private _getIWebService(): IWebService {
        let ret: IWebService;
        switch (Environment.type) {
            case EnvironmentType.Local:
                ret = new MockupWebService();
                break;
            case EnvironmentType.SharePoint:
                ret = new SPOWebService(this.context);
                break;
        }
        return ret;
    }

    public render(): void {

        const element: React.ReactElement<IModule04Demo3Props> = React.createElement(
            Module04Demo3FC,
            {
                description: this.properties.description,
                iWebService: this._getIWebService()
            }
        );

        ReactDom.render(element, this.domElement);
    }

    protected onDispose(): void {
        ReactDom.unmountComponentAtNode(this.domElement);
    }

    protected get dataVersion(): Version {
        return Version.parse('1.0');
    }

    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription,
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    }
}
