import * as React from 'react';
import styles from './Module16Demo1.module.scss';
import { IModule16Demo1Props } from './IModule16Demo1Props';
import { escape } from '@microsoft/sp-lodash-subset';
import { PrimaryButton, Stack, Spinner, autobind } from 'office-ui-fabric-react';
import { IModule16Demo1State } from './IModule16Demo1State';
import { AadHttpClient, HttpClient } from '@microsoft/sp-http';

export default class Module16Demo1 extends React.Component<IModule16Demo1Props, IModule16Demo1State> {
  constructor(props: IModule16Demo1Props) {
    super(props);
    this.state = {
      loading: false,
      jsonResult: undefined
    };
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

  public render(): React.ReactElement<IModule16Demo1Props> {
    return (
      <div className={styles.module16Demo1}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>MS Graph API Demo</span>
              <Stack horizontal disableShrink horizontalAlign="space-evenly">
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
