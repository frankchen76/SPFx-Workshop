import * as React from 'react';
import styles from './Module15Demo2.module.scss';
import { IModule15Demo2Props } from './IModule15Demo2Props';
import { escape } from '@microsoft/sp-lodash-subset';
import { PrimaryButton, Stack, Spinner, autobind } from 'office-ui-fabric-react';
import { IModule15Demo2State } from './IModule15Demo2State';
import { AadHttpClient, HttpClient } from '@microsoft/sp-http';

export default class Module15Demo2 extends React.Component<IModule15Demo2Props, IModule15Demo2State> {
  constructor(props: IModule15Demo2Props) {
    super(props);
    this.state = {
      loading: false,
      jsonResult: undefined
    };
  }

  @autobind
  private async _aadHttpClientTestHandler(): Promise<void> {
    try {
      this.setState({
        loading: true
      });
      const url = 'https://graph.microsoft.com/v1.0/me';
      const aadHttpClient = await this.props.context.aadHttpClientFactory.getClient('https://graph.microsoft.com');
      const response = await aadHttpClient.get(url, AadHttpClient.configurations.v1);
      const result = await response.json();
      this.setState({
        loading: false,
        jsonResult: JSON.stringify(result, null, 4)
      });
    } catch (error) {
      this.setState({
        loading: false,
        jsonResult: error
      });
    }
  }

  public render(): React.ReactElement<IModule15Demo2Props> {
    return (
      <div className={styles.module15Demo2}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>MS Graph API Demo</span>
              <Stack horizontal disableShrink horizontalAlign="space-evenly">
                <PrimaryButton text="AadHttpClient Test" onClick={this._aadHttpClientTestHandler} />
              </Stack>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              {
                this.state.loading ?
                  <Spinner label="loading..." />
                  :
                  <div className={styles.jsoncode}>{this.state.jsonResult}</div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
