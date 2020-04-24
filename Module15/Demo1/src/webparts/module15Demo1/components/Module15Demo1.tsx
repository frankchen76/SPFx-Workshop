import * as React from 'react';
import styles from './Module15Demo1.module.scss';
import { IModule15Demo1Props } from './IModule15Demo1Props';
import { escape } from '@microsoft/sp-lodash-subset';
import { PrimaryButton, Stack, Spinner, autobind } from 'office-ui-fabric-react';
import { IModule15Demo1State } from './IModule15Demo1State';
import { AadHttpClient, HttpClient } from '@microsoft/sp-http';

export default class Module15Demo1 extends React.Component<IModule15Demo1Props, IModule15Demo1State> {
  constructor(props: IModule15Demo1Props) {
    super(props);
    this.state = {
      loading: false,
      jsonResult: undefined
    };
  }

  @autobind
  private async _msGraphHttpClientTestHandler(): Promise<void> {
    try {
      this.setState({
        loading: true
      });
      const url = 'https://graph.microsoft.com/v1.0/me';
      const msGraphClient = await this.props.context.msGraphClientFactory.getClient();
      const result = await msGraphClient
        .api(url)
        .select(['userPrincipalName', 'id', 'displayName', 'jobTitle', 'mail'])
        .get();
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
  @autobind
  private async _customAPIHandler(): Promise<void> {
    try {
      this.setState({
        loading: true
      });
      const url = 'https://frankchenpfetest-testwebapi01.azurewebsites.net/weatherforecast';

      const aadHttpClient = await this.props.context
        .aadHttpClientFactory
        .getClient('https://M365x725618.onmicrosoft.com/TestDotNetCore.WebAPI');
      const response = await aadHttpClient.get(url, AadHttpClient.configurations.v1);
      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }

      const result = await response.json();
      this.setState({
        loading: false,
        jsonResult: JSON.stringify(result, null, 4)
      });
    } catch (error) {
      this.setState({
        loading: false,
        jsonResult: JSON.stringify(error, null, 4)
      });
    }
  }
  public render(): React.ReactElement<IModule15Demo1Props> {
    return (
      <div className={styles.module15Demo1}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>MS Graph API Demo</span>
              <Stack horizontal disableShrink horizontalAlign="space-evenly">
                <PrimaryButton text="MSGraphHttpClient Test" onClick={this._msGraphHttpClientTestHandler} />
                <PrimaryButton text="AadHttpClient Test" onClick={this._aadHttpClientTestHandler} />
                <PrimaryButton text="Customer API Test" onClick={this._customAPIHandler} />
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
