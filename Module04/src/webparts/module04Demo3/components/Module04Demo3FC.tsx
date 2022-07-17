import * as React from 'react';
import styles from './Module04Demo3.module.scss';
import { IModule04Demo3Props } from './IModule04Demo3Props';
import { escape } from '@microsoft/sp-lodash-subset';
import { IModule04Demo3State } from './IModule04Demo3State';
import { PrimaryButton, Stack, Spinner } from 'office-ui-fabric-react';
import { ServiceContext } from '../../../services/ServiceContext';
import { WebInfoContainer } from './WebInfoContainer';
import { IWebService } from '../../../services/web/IWebService';
import { useState } from 'react';

export interface IModule04Demo3FCProps {
    description: string;
    iWebService: IWebService;
}

export const Module04Demo3FC = (props: IModule04Demo3FCProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [jsonResult, setJsonResult] = useState<string>();

    const _pnpjsTestHandler = async (): Promise<void> => {
        try {
            setLoading(true);
            const result = await props.iWebService.getWebByPnPJS();
            setLoading(false);
            setJsonResult(JSON.stringify(result, null, 4));
        } catch (error) {
            setLoading(false);
            setJsonResult(error);
        }
    };
    const _spoRestApiTestHandler = async (): Promise<void> => {
        try {
            setLoading(true);
            const result = await props.iWebService.getWebBySPORest();
            setLoading(false);
            setJsonResult(JSON.stringify(result, null, 4));
        } catch (error) {
            setLoading(false);
            setJsonResult(error);
        }
    };
    const _getCurrentUserProfileHandler = async (): Promise<void> => {
        try {
            setLoading(true);
            const result = await props.iWebService.getCurrentUserProfile();
            setLoading(false);
            setJsonResult(JSON.stringify(result, null, 4));
        } catch (error) {
            setLoading(false);
            setJsonResult(error);
        }
    };
    const _getLargeListHandler = async (): Promise<void> => {
        try {
            setLoading(true);
            const result = await props.iWebService.getLargeList();
            setLoading(false);
            setJsonResult(JSON.stringify(result, null, 4));
        } catch (error) {
            setLoading(false);
            setJsonResult(error);
        }
    };
    const _getCamlQueryHandler = async (): Promise<void> => {
        try {
            setLoading(true);
            const result = await props.iWebService.getListByCaml();
            setLoading(false);
            setJsonResult(JSON.stringify(result, null, 4));
        } catch (error) {
            setLoading(false);
            setJsonResult(error);
        }
    };

    return (
        <ServiceContext.Provider value={{ service: props.iWebService }}>
            <div className={styles.module04Demo3}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <span className={styles.title}>Demo3</span>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <WebInfoContainer />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <Stack horizontal disableShrink horizontalAlign="space-evenly">
                                <PrimaryButton text="PnPjs Test" onClick={_pnpjsTestHandler} />
                                <PrimaryButton text="SPO REST API Test" onClick={_spoRestApiTestHandler} />
                                <PrimaryButton text="PnPjs Get Current User Profile" onClick={_getCurrentUserProfileHandler} />
                                <PrimaryButton text="PnPjs Large list" onClick={_getLargeListHandler} />
                                <PrimaryButton text="PnPjs CamlQuery" onClick={_getCamlQueryHandler} />
                            </Stack>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            {
                                loading ?
                                    <Spinner label="loading..." />
                                    :
                                    <div className={styles.jsoncode}>{jsonResult}</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </ServiceContext.Provider>
    );
}