import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
    IPropertyPaneConfiguration,
    PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'Module04Demo2WebPartStrings';
import Module04Demo2 from './components/Module04Demo2';
import { IModule04Demo2Props } from './components/IModule04Demo2Props';

import { PropertyPaneAsyncDropdown } from '../../controls/PropertyPaneAsyncDropdown/PropertyPaneAsyncDropdown';
import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { update, get } from '@microsoft/sp-lodash-subset';

export interface IModule04Demo2WebPartProps {
    description: string;
    listName: string;
}

export default class Module04Demo2WebPart extends BaseClientSideWebPart<IModule04Demo2WebPartProps> {
    private _isDarkTheme: boolean = false;
    private _environmentMessage: string = '';

    private loadLists(): Promise<IDropdownOption[]> {
        return new Promise<IDropdownOption[]>((resolve: (options: IDropdownOption[]) => void, reject: (error: any) => void) => {
            setTimeout(() => {
                resolve([{
                    key: 'sharedDocuments',
                    text: 'Shared Documents'
                },
                {
                    key: 'myDocuments',
                    text: 'My Documents'
                }]);
            }, 2000);
        });
    }

    private onListChange(propertyPath: string, newValue: any): void {
        const oldValue: any = get(this.properties, propertyPath);
        // store new value in web part properties
        update(this.properties, propertyPath, (): any => { return newValue; });
        // refresh web part
        this.render();
    }

    public render(): void {
        const element: React.ReactElement<IModule04Demo2Props> = React.createElement(
            Module04Demo2,
            {
                description: this.properties.description
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
                                }),
                                new PropertyPaneAsyncDropdown('listName', {
                                    label: 'List name',
                                    loadOptions: this.loadLists.bind(this),
                                    onPropertyChange: this.onListChange.bind(this),
                                    selectedKey: this.properties.listName
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    }
}
