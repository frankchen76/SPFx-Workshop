import * as React from 'react';
import { FC, useState, useEffect } from 'react';

export interface IModule04Demo1FuncProps {
  label: string;
}

export const Module04Demo1Func: FC<IModule04Demo1FuncProps> = (props) => {
  const [timeLabel, setTimeLabel] = useState("");
  let _timerId: number;
  useEffect(() => {
    _timerId = setInterval(() => {
      setTimeLabel(Date().toString());
    }, 1000);
    console.log("Created timer;");
    return () => {
      clearInterval(_timerId);
      console.log("Clean up timer;");
    };
  }, [props.label]);

  return (
    <div><b>{props.label}</b>: {timeLabel}</div>
  );
};
