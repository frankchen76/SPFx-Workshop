import * as React from 'react';
import styles from './Footer.module.scss';

export interface IFooterProps {
    text: string;
}

export const Footer = (props: IFooterProps) => {
    return (
        <div className={styles.bottom}>{props.text}</div>

    );
}
