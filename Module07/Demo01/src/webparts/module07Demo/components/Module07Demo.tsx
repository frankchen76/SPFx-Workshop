import * as React from 'react';
import styles from './Module07Demo.module.scss';
import { IModule07DemoProps } from './IModule07DemoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { PrimaryButton } from 'office-ui-fabric-react';
import { sp, IFieldAddResult, IListAddResult } from "@pnp/sp/presets/all";
import { Log } from '@microsoft/sp-core-library';

export default class Module07Demo extends React.Component<IModule07DemoProps, {}> {

  private _testHandler = async (): Promise<void> => {
    Log.info('Module07Demo', `test log infomration`);
  }

  private _createArtifactsHandler = async (): Promise<void> => {
    // this will create a list with template 101 (Document library), content types enabled and show it on the quick launch (using additionalSettings)
    const listAddResult: IListAddResult = await sp.web.lists.add("TestList2",
      "This is a description of doc lib.",
      100,  //create a custom list
      true, //enable the content type
      { OnQuickLaunch: true }); //additional settings

    // get the Id of the newly added document library
    const list = await listAddResult.list.select("Id").get();

    // create a new field called 'My Field' in web.
    const fieldResult: IFieldAddResult = await sp.web.fields.add("SPFxTestTextField",
      "SP.FieldText",
      {
        FieldTypeKind: 3,
        Group: "My Group"
      });
    // add the site field 'My Field' to the list 'My List'
    const newField = await sp.web.lists.getByTitle("TestList2").fields
      .createFieldAsXml(fieldResult.data.SchemaXml);

    // log id to console
    alert(`List was created. List Id: ${list.Id} with Field Id: ${newField.data.Id}`);
  }

  public render(): React.ReactElement<IModule07DemoProps> {
    return (
      <div className={styles.module07Demo}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <PrimaryButton text='Create Artifacts' onClick={this._createArtifactsHandler} />
              <PrimaryButton text='Test' onClick={this._testHandler} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
