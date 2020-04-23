import * as React from 'react';
import styles from './SPFxFooter.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';

export interface ISPFxFootererProps {
  text: string;
}

export class SPFxFooter extends React.Component<ISPFxFootererProps, {}> {
  private _selectedLocation: string;
  constructor(props: ISPFxFootererProps) {
    super(props);
  }

  public render(): React.ReactElement<ISPFxFootererProps> {
    return (
      <div className={styles.bottom}>{escape(this.props.text)}</div>

    );
  }
}
