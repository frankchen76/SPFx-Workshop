import * as React from 'react';
import styles from './SPFxHeader.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';

export interface ISPFxHeaderProps {
  text: string;
}

export class SPFxHeader extends React.Component<ISPFxHeaderProps, {}> {
  private _selectedLocation: string;
  constructor(props: ISPFxHeaderProps) {
    super(props);
  }

  public render(): React.ReactElement<ISPFxHeaderProps> {
    return (
      <div className={styles.top}>{escape(this.props.text)}</div>

    );
  }
}
