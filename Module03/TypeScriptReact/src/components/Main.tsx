import * as React from "react";
import { Hello } from "./Hello";
import { MyTimer } from "./MyTimer";


export class Main extends React.Component<{}, {}> {
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
        console.log("test2OnClickHandler.");
    }
    render() {
        return (
            <div>
                <Hello compiler="TypeScript" framework="React" />
                <MyTimer label="Current time:" />
                <button onClick={this.test1OnClickHandler.bind(this, "Test")}>Test1</button>
                <button onClick={this.test2OnClickHandler}>Test2</button>
            </div>
        );
    }
}