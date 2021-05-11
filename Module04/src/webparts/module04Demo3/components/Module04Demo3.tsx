import * as React from 'react';
import styles from './Module04Demo3.module.scss';
import { IModule04Demo3Props } from './IModule04Demo3Props';
import { escape } from '@microsoft/sp-lodash-subset';
import { IModule04Demo3State } from './IModule04Demo3State';
import { PrimaryButton, Stack, Spinner } from 'office-ui-fabric-react';

export default class Module04Demo3 extends React.Component<IModule04Demo3Props, IModule04Demo3State> {
  constructor(props: IModule04Demo3Props) {
    super(props);
    this.state = {
      loading: false,
      jsonResult: undefined
    };
  }

  private _pnpjsTestHandler = async (): Promise<void> => {
    try {
      this.setState({
        loading: true
      });
      const result = await this.props.iWebService.getWebByPnPJS();
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
  private _spoRestApiTestHandler = async (): Promise<void> => {
    try {
      this.setState({
        loading: true
      });
      const result = await this.props.iWebService.getWebBySPORest();
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
  public render(): React.ReactElement<IModule04Demo3Props> {
    return (
      <div className={styles.module04Demo3}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Demo3</span>
              <Stack horizontal disableShrink horizontalAlign="space-evenly">
                <PrimaryButton text="PnPjs Test" onClick={this._pnpjsTestHandler} />
                <PrimaryButton text="SPO REST API Test" onClick={this._spoRestApiTestHandler} />
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
