import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
    IPropertyPaneConfiguration,
    PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import {
    IDynamicDataPropertyDefinition,
    IDynamicDataCallables
} from '@microsoft/sp-dynamic-data';

import * as strings from 'Module04PublisherDemoWebPartStrings';
import Module04PublisherDemo from './components/Module04PublisherDemo';
import { IModule04PublisherDemoProps } from './components/IModule04PublisherDemoProps';

export interface IModule04PublisherDemoWebPartProps {
    description: string;
}

export default class Module04PublisherDemoWebPart
    extends BaseClientSideWebPart<IModule04PublisherDemoWebPartProps>
    implements IDynamicDataCallables {
    private _location: string;
    private _isDarkTheme: boolean = false;

    protected onInit(): Promise<void> {
        // register this web part as dynamic data source
        this.context.dynamicDataSourceManager.initializeSource(this);

        return Promise.resolve();
    }

    public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
        return [{
            id: "location",
            title: "Location"
        }];
    }
    public getPropertyValue(propertyId: string): string {
        if (propertyId == "location") {
            return this._location;
        }
    }

    public _locationChanged = (location: string) => {
        this._location = location;
        this.context.dynamicDataSourceManager.notifyPropertyChanged("location");
    }

    public render(): void {
        const element: React.ReactElement<IModule04PublisherDemoProps> = React.createElement(
            Module04PublisherDemo,
            {
                description: this.properties.description,
                locationChanged: this._locationChanged
            }
        );

        ReactDom.render(element, this.domElement);
    }
    protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
        if (!currentTheme) {
            return;
        }

        this._isDarkTheme = !!currentTheme.isInverted;
        const {
            semanticColors
        } = currentTheme;

        if (semanticColors) {
            this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
            this.domElement.style.setProperty('--link', semanticColors.link || null);
            this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
        }

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
                        description: strings.PropertyPaneDescription
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
