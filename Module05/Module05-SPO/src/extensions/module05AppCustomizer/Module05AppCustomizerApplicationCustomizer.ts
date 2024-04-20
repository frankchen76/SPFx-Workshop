import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Log, SPEventArgs } from '@microsoft/sp-core-library';
import {
    BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';

import * as strings from 'Module05AppCustomizerApplicationCustomizerStrings';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

const LOG_SOURCE: string = 'Module05AppCustomizerApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IModule05AppCustomizerApplicationCustomizerProperties {
    // This is an example; replace with your own property
    testMessage: string;
    // Top: string;
    // Bottom: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class Module05AppCustomizerApplicationCustomizer
    extends BaseApplicationCustomizer<IModule05AppCustomizerApplicationCustomizerProperties> {
    private _topPlaceholder: PlaceholderContent | undefined;
    private _bottomPlaceholder: PlaceholderContent | undefined;

    public onInit(): Promise<void> {
        console.log("HelloWorldApplicationCustomizer.onInit()");
        // Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

        // let message: string = this.properties.testMessage;
        // if (!message) {
        //     message = '(No properties were provided.)';
        // }

        //Dialog.alert(`Hello from ${strings.Title}:\n\n${message}`);
        this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);
        this.context.application.navigatedEvent.add(this, (args: SPEventArgs) => {
            console.log(`navigatedEvent was called. ${args}`);
        });

        return Promise.resolve();
    }

    private _onDispose(): void {
        console.log('[HelloWorldApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
    }

    private _renderPlaceHolders(): void {
        console.log("HelloWorldApplicationCustomizer._renderPlaceHolders()");
        console.log(
            "Available placeholders: ",
            this.context.placeholderProvider.placeholderNames
                .map(name => PlaceholderName[name])
                .join(", ")
        );

        if (!this._topPlaceholder) {
            this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
                PlaceholderName.Top,
                { onDispose: this._onDispose }
            );
        }
        if (this._topPlaceholder) {
            const element = React.createElement(
                Header,
                {
                    text: "Search: "
                }
            );

            ReactDom.render(element, this._topPlaceholder.domElement);// as React.Component<IHeaderProps, React.ComponentState, any>;

        } else {
            console.error("The expected placeholder (Top) was not found.");
        }

        if (!this._bottomPlaceholder) {
            this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
                PlaceholderName.Bottom,
                { onDispose: this._onDispose }
            );
        }
        if (this._bottomPlaceholder) {
            const element = React.createElement(
                Footer,
                {
                    text: "(Bottom property)"
                }
            );
            ReactDom.render(element, this._bottomPlaceholder.domElement);// as React.Component<IHeaderProps, React.ComponentState, any>;

        } else {
            console.error("The expected placeholder (Bottom) was not found.");
        }


    }
}
