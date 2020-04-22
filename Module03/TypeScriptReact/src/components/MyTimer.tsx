import * as React from "react";

export interface MyTimerProps {
    label: string;
}
export interface MyTimerState {
    timeLabel: string
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class MyTimer extends React.Component<MyTimerProps, MyTimerState> {
    private _timerId: NodeJS.Timeout = undefined;
    constructor(props: MyTimerProps) {
        super(props);
        this.state = {
            timeLabel: undefined
        };
    }
    componentDidMount() {
        this._timerId = setInterval(() => {
            this.setState({ timeLabel: Date().toString() })
        }, 1000);

    }
    componentDidUpdate(prevProps: MyTimerProps, prevState: MyTimerState) {

    }
    componentWillUnmount() {
        clearInterval(this._timerId);
    }
    render() {
        return <div><b>{this.props.label}</b>{this.state.timeLabel}</div>;
    }
}