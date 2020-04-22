import * as React from "react";
import { Hello } from "./Hello";
import { MyTimer } from "./MyTimer";


export class Main extends React.Component<{}, {}> {
    private testOnClickHandler(val?: string) {
        alert(val);
        let a = {
            id: 1,
            name: "test"
        };
        for (let key in a) {
            console.log(key);
        }
    }
    render() {
        return (
            <div>
                <Hello compiler="TypeScript" framework="React" />
                <MyTimer label="Current time:" />
                <button onClick={this.testOnClickHandler.bind(this, "Test")}>Test</button>
            </div>
        );
    }
}