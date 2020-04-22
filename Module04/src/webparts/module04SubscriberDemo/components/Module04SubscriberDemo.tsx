import * as React from 'react';
import styles from './Module04SubscriberDemo.module.scss';
import { IModule04SubscriberDemoProps } from './IModule04SubscriberDemoProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Module04SubscriberDemo extends React.Component<IModule04SubscriberDemoProps, {}> {
  public render(): React.ReactElement<IModule04SubscriberDemoProps> {
    return (
      <div className={styles.module04SubscriberDemo}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to Subscriber</span>
              <p className={styles.subTitle}>Location: {this.props.location}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
