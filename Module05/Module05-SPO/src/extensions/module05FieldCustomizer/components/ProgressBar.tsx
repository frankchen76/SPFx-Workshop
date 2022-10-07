import { Log } from '@microsoft/sp-core-library';
import * as React from 'react';
import { CSSProperties, useEffect, useState } from 'react';

import styles from './ProgressBar.module.scss';

export interface IProgressBarProps {
    fieldValue: any;
}

const LOG_SOURCE: string = 'Module05FieldCustomizer';

export const ProgressBar = (props: IProgressBarProps) => {
    const [ctrlStyle, setCtrlStyle] = useState<CSSProperties>();
    useEffect(() => {
        setCtrlStyle({
            width: `${props.fieldValue}px`,
            background: '#0094ff',
            color: '#c0c0c0'
        });
    }, props.fieldValue);

    return (
        <div className={styles.Module05FieldCustomizer}>
            <div className={styles.full}>
                <div style={ctrlStyle}>
                    {props.fieldValue}
                </div>
            </div>
        </div>
    );

};
// export default class Module05FieldCustomizer extends React.Component<IModule05FieldCustomizerProps, {}> {
//   public componentDidMount(): void {
//     Log.info(LOG_SOURCE, 'React Element: Module05FieldCustomizer mounted');
//   }

//   public componentWillUnmount(): void {
//     Log.info(LOG_SOURCE, 'React Element: Module05FieldCustomizer unmounted');
//   }

//   public render(): React.ReactElement<{}> {
//     const style = {
//       width: `${this.props.fieldValue}px`,
//       background: '#0094ff',
//       color: '#c0c0c0'
//     };
//     return (
//       <div className={styles.Module05FieldCustomizer}>
//         <div className={styles.full}>
//           <div style={style}>
//             {this.props.fieldValue}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
