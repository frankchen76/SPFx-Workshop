import * as React from 'react';
import styles from './Module04PublisherDemo.module.scss';
import { IModule04PublisherDemoProps } from './IModule04PublisherDemoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ChoiceGroup, autobind, IChoiceGroupOption } from 'office-ui-fabric-react';
import { IModule04PublisherDemoState } from './IModule04PublisherDemoState';

export default class Module04PublisherDemo extends React.Component<IModule04PublisherDemoProps, IModule04PublisherDemoState> {
  constructor(props: IModule04PublisherDemoProps) {
    super(props);
    this.state = {
      location: "Redmond"
    };
  }

  @autobind
  private _onOptionChanged(target: any, option: IChoiceGroupOption) {
    this.setState({
      location: option.text
    });
    this.props.locationChanged(option.text);
  }

  public render(): React.ReactElement<IModule04PublisherDemoProps> {
    return (
      <div className={styles.module04PublisherDemo}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Change Location</span>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <ChoiceGroup
                options={[
                  {
                    key: 'Redmond',
                    text: 'Redmond'
                  },
                  {
                    key: 'Seattle',
                    text: 'Seattle'
                    //checked: true
                  },
                  {
                    key: 'Sammamish',
                    text: 'Sammamish'
                    //disabled: true
                  }
                ]}
                className={styles.location}
                label="Pick one"
                required={true}
                onChange={this._onOptionChanged}
                defaultSelectedKey={this.state.location}
                selectedKey={this.state.location}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
