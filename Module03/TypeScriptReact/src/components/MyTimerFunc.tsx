import * as React from "react";
import { FC, useEffect, useState } from "react"

export interface MyTimerProps {
    label: string;
}
export const MyTimerFunc: FC<MyTimerProps> = (props: MyTimerProps) => {
    const [timeLabel, setTimeLabel] = useState("");
    let _timerId: NodeJS.Timeout;
    useEffect(() => {
        _timerId = setInterval(() => {
            setTimeLabel(Date().toString());
        }, 1000);
        console.log("Created timer;");
        return () => {
            clearInterval(_timerId);
            console.log("Clean up timer;");
        }
    }, [props.label]);

    return (
        <div><b>{props.label}</b>{timeLabel}</div>
    );
}
