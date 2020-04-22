import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'Module04SubscriberDemoWebPartStrings';
import Module04SubscriberDemo from './components/Module04SubscriberDemo';
import { IModule04SubscriberDemoProps } from './components/IModule04SubscriberDemoProps';

import { DynamicProperty } from '@microsoft/sp-component-base';
import {
  DynamicDataSharedDepth,
  IWebPartPropertiesMetadata,
  PropertyPaneDynamicFieldSet,
  PropertyPaneDynamicField
} from '@microsoft/sp-webpart-base';

export interface IModule04SubscriberDemoWebPartProps {
  description: string;
  location: DynamicProperty<string>;
}

export default class Module04SubscriberDemoWebPart extends BaseClientSideWebPart<IModule04SubscriberDemoWebPartProps> {

  public render(): void {
    const location: string | undefined = this.properties.location.tryGetValue();
    const element: React.ReactElement<IModule04SubscriberDemoProps> = React.createElement(
      Module04SubscriberDemo,
      {
        description: this.properties.description,
        location: location
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

  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
      // Specify the web part properties data type to allow the address
      // information to be serialized by the SharePoint Framework.
      'location': {
        dynamicPropertyType: 'string'
      }
    };
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
                PropertyPaneDynamicFieldSet({
                  label: 'Location',
                  fields: [
                    PropertyPaneDynamicField('location', {
                      label: "Location"
                    })
                  ],
                  sharedConfiguration: {
                    depth: DynamicDataSharedDepth.Property
                  }
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
