import * as React from 'react';
import styles from './Module08Demo1.module.scss';
import { IModule08Demo1Props } from './IModule08Demo1Props';
import { escape } from '@microsoft/sp-lodash-subset';
import { IModule08Demo1State } from './IModule08Demo1State';

export default class Module08Demo1 extends React.Component<IModule08Demo1Props, IModule08Demo1State> {
  constructor(props: IModule08Demo1Props) {
    super(props);
    this.state = {
      result: JSON.stringify(this.props.context.sdks.microsoftTeams.context, null, 4),
      host: this.props.context.sdks.microsoftTeams ? "MS Teams" : "SPO"
    };
  }

  public render(): React.ReactElement<IModule08Demo1Props> {
    return (
      <div className={styles.module08Demo1}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to {this.state.host}</span>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.json}>
              {this.state.result}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
