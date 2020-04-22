import * as React from 'react';
import styles from './Module04Demo1.module.scss';
import { IModule04Demo1Props } from './IModule04Demo1Props';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Module04Demo1 extends React.Component<IModule04Demo1Props, {}> {

  public render(): React.ReactElement<IModule04Demo1Props> {
    return (
      <div className={styles.module04Demo1}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
              <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
              <p className={styles.description}>{escape(this.props.description)}</p>
              <p className={styles.description}>Title: {escape(this.props.title)}</p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
