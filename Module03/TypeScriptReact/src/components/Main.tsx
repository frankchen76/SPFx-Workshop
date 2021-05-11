import * as React from "react";
import { Hello } from "./Hello";
import { MyTimer } from "./MyTimer";
import { MyTimerFunc } from "./MyTimerFunc";

interface IMainState {
    label: string;
}
export class Main extends React.Component<{}, IMainState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            label: "Original"
        };
    }
    private test1OnClickHandler(val?: string) {
        alert(val);
        let a = {
            id: 1,
            name: "test"
        };
        for (let key in a) {
            console.log(key);
        }
    }
    private test2OnClickHandler = (): void => {
        this.setState({ label: "New" });
        console.log("updated label.");
    }
    render() {
        return (
            <div>
                <Hello compiler="TypeScript" framework="React" />
                <MyTimer label="Current time:" />
                <MyTimerFunc label={this.state.label} />
                <button onClick={this.test1OnClickHandler.bind(this, "Test")}>Test1</button>
                <button onClick={this.test2OnClickHandler}>Test2</button>
            </div>
        );
    }
}