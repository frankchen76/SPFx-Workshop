import { Log } from '@microsoft/sp-core-library';
import {
    BaseListViewCommandSet,
    Command,
    IListViewCommandSetListViewUpdatedParameters,
    IListViewCommandSetExecuteEventParameters,
    ListViewStateChangedEventArgs
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'Module05CommandSetCommandSetStrings';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IModule05CommandSetCommandSetProperties {
    // This is an example; replace with your own properties
    sampleTextOne: string;
    sampleTextTwo: string;
}

const LOG_SOURCE: string = 'Module05CommandSetCommandSet';

export default class Module05CommandSetCommandSet
    extends BaseListViewCommandSet<IModule05CommandSetCommandSetProperties> {

    public onInit(): Promise<void> {
        Log.info(LOG_SOURCE, 'Initialized Module05CommandSetCommandSet');
        return Promise.resolve();
    }

    public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
        const compareOneCommand: Command = this.tryGetCommand('COMMAND_1');
        if (compareOneCommand) {
            // This command should be hidden unless exactly one row is selected.
            compareOneCommand.visible = event.selectedRows.length === 1;
        }
    }

    public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
        switch (event.itemId) {
            case 'COMMAND_1':
                Dialog.alert(`${this.properties.sampleTextOne}`);
                break;
            case 'COMMAND_2':
                Dialog.alert(`${this.properties.sampleTextTwo}`);
                break;
            default:
                throw new Error('Unknown command');
        }
    }
    private _onListViewStateChanged = (args: ListViewStateChangedEventArgs): void => {
        Log.info(LOG_SOURCE, 'List view state changed');

        const compareOneCommand: Command = this.tryGetCommand('COMMAND_1');
        if (compareOneCommand) {
            // This command should be hidden unless exactly one row is selected.
            compareOneCommand.visible = this.context.listView.selectedRows?.length === 1;
        }

        // TODO: Add your logic here

        // You should call this.raiseOnChage() to update the command bar
        this.raiseOnChange();
    }
}
