import * as React from 'react';
import styles from './Module10Demo1.module.scss';
import { IModule10Demo1Props } from './IModule10Demo1Props';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Module10Demo1 extends React.Component<IModule10Demo1Props, {}> {
  public render(): React.ReactElement<IModule10Demo1Props> {
    const markdownString: string = require<string>('./sample.md');
    return (
      <div className={styles.module10Demo1}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>MarkdownLoader3</span>
            </div>
          </div>
          <div className={styles.row}>
            <span dangerouslySetInnerHTML={{ __html: markdownString }} />
          </div>
        </div>
      </div>
    );
  }
}
