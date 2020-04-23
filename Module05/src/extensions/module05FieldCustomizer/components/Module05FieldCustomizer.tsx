import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import * as React from 'react';

import styles from './Module05FieldCustomizer.module.scss';

export interface IModule05FieldCustomizerProps {
  fieldValue: any;
}

const LOG_SOURCE: string = 'Module05FieldCustomizer';

export default class Module05FieldCustomizer extends React.Component<IModule05FieldCustomizerProps, {}> {
  @override
  public componentDidMount(): void {
    Log.info(LOG_SOURCE, 'React Element: Module05FieldCustomizer mounted');
  }

  @override
  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: Module05FieldCustomizer unmounted');
  }

  @override
  public render(): React.ReactElement<{}> {
    const style = {
      width: `${this.props.fieldValue}px`,
      background: '#0094ff',
      color: '#c0c0c0'
    };
    return (
      <div className={styles.Module05FieldCustomizer}>
        <div className={styles.full}>
          <div style={style}>
            {this.props.fieldValue}
          </div>
        </div>
      </div>
    );
  }
}
