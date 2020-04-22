import * as React from 'react';
import styles from './Module04Demo4.module.scss';
import { IModule04Demo4Props } from './IModule04Demo4Props';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Module04Demo4 extends React.Component<IModule04Demo4Props, {}> {
  public render(): React.ReactElement<IModule04Demo4Props> {
    return (
      <div className={ styles.module04Demo4 }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
