import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'Module04Demo1WebPartStrings';
import Module04Demo1 from './components/Module04Demo1';
import { IModule04Demo1Props } from './components/IModule04Demo1Props';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from '@microsoft/sp-property-pane';

export interface IModule04Demo1WebPartProps {
  description: string;
  title: string;
  timerLabel: string;
  listUrl: string;
}

export default class Module04Demo1WebPart extends BaseClientSideWebPart<IModule04Demo1WebPartProps> {
  public render(): void {
    const element: React.ReactElement<IModule04Demo1Props> = React.createElement(
      Module04Demo1,
      {
        description: this.properties.description,
        title: this.properties.title,
        timerLabel: this.properties.timerLabel
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
  // public get disableReactivePropertyChanges(): boolean {
  //   return true;
  // }
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
                  label: 'Title'
                }),
                PropertyPaneTextField('timerLabel', {
                  label: 'Timer Label'
                })

              ]
            }
          ]
        }
      ]
    };
  }
}
