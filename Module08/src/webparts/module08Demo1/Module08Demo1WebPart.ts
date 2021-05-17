import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'Module08Demo1WebPartStrings';
import Module08Demo1 from './components/Module08Demo1';
import { IModule08Demo1Props } from './components/IModule08Demo1Props';

export interface IModule08Demo1WebPartProps {
  description: string;
  title: string;
}

export default class Module08Demo1WebPart extends BaseClientSideWebPart<IModule08Demo1WebPartProps> {

  public render(): void {

    const element: React.ReactElement<IModule08Demo1Props> = React.createElement(
      Module08Demo1,
      {
        description: this.properties.description,
        title: this.properties.title,
        context: this.context
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
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('title', {
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
