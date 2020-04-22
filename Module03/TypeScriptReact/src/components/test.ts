// Array destructuring 
let input = [1, 2];
let [first, second] = input;
console.log(first); // outputs 1
console.log(second); // outputs 2

// Tuple destructuring
let tuple: [number, string, boolean] = [7, "hello", true];
let [a, b, c] = tuple; // a: number, b: string, c: boolean
let [a, b, c, d] = tuple; // Error, no element at index 3

// Object destructuring
let o = {
    a: "foo",
    b: 12,
    c: "bar"
};
let { a, b } = o;
console.log(a); // outputs "foo"
console.log(b); // outputs 12

// Spread
let first = [1, 2];
let second = [3, 4];
let bothPlus = [0, ...first, ...second, 5]; // bothPlus: [0,1,2,3,4]

let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
// search: { food: "rich", price:"$$", ambiance:"noisy" }
let search = { ...defaults, food: "rich" };

// simple interface
interface LabeledValue {
    label: string;
}

// optional properties
interface SquareConfig {
    color?: string;
    width?: number;
}

//readonly properties
interface Point {
    readonly x: number;
    readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error!

// function type
interface SearchFunc {
    (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}

// Indexable Types
interface StringArray {
    [index: number]: string;
}
let myArray: StringArray;
myArray = ["Bob", "Fred"];

// class
class Person {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
}
// Employee can extend Person
class Employee extends Person {
    static prefix = "EML";
    private _department: string;
    //property
    get department(): string {
        return this._department;
    }
    constructor(name: string, department: string) {
        super(name);
        this._department = department;
    }
    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this._department}.`;
    }
}
let howard = new Employee("Howard", "Sales");
let john = new Person("John"); // Error: The 'Person' constructor is protected

// parameter properteis
class Octopus {
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string) {
    }
}
let var1 = new Octopus("test");
console.log(var1.name); // Octopus automatically has "name" property
console.log(Employee.prefix); // print out the static variable

interface IPet {
    name: string;
}
class Dog implements IPet {
    name: string;
    constructor(n: string) {
        this.name = n;
    }
}
class ListPet<T extends IPet>{
    private _iPet: T;
    constructor(iPet: T) {
        this._iPet = iPet;
    }
    printName(): void {
        console.log(this._iPet.name);
    }
}

let dog = new Dog("dog1");
let listDog = new ListPet<Dog>(dog);
listDog.printName() // print dog's name property

//loop an array
let list = [4, 5, 6];
for (let i in list) {
    console.log(i); // "0", "1", "2",
}
for (let i of list) {
    console.log(i); // "4", "5", "6"
}

//loop an object
let obj = {
    id: 1,
    name: "test"
};
for (let key in obj) {
    console.log(key); // print out "id" and "name"
}

// StringValidator.ts
export interface StringValidator {
    isAcceptable(s: string): boolean;
}

//export
export * from "./StringValidator"

//ZipCodeValidator.ts
import { StringValidator } from "./StringValidator";
export const numberRegexp = /^[0-9]+$/;
export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}

// imports can also be renamed
import { ZipCodeValidator as ZCV } from "./ZipCodeValidator";
let myValidator = new ZCV();

// Import the entire module into a single variable
import * as validator from "./ZipCodeValidator";
let myValidator = new validator.ZipCodeValidator();

// basic type
let decimal: number = 6;
let color: string = "blue";
let list: number[] = [1, 2, 3];

// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
x = [10, "hello"]; // Error

// Enum type
enum Color { Red, Green, Blue }
let c: Color = Color.Green;

// Any
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

//void
function warnUser(): void {
    console.log("This is my warning message");
}

// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'Module04Demo1WebPartStrings';
import Module04Demo1 from './components/Module04Demo1';
import { IModule04Demo1Props } from './components/IModule04Demo1Props';
import {
    IPropertyPaneConfiguration,
    PropertyPaneTextField,
} from '@microsoft/sp-property-pane';

export interface IModule04Demo1WebPartProps {
    description: string;
    title: string;
}

export default class Module04Demo1WebPart extends BaseClientSideWebPart<IModule04Demo1WebPartProps> {
    public render(): void {
        const element: React.ReactElement<IModule04Demo1Props> = React.createElement(
            Module04Demo1,
            {
                description: this.properties.description,
                title: this.properties.title
            }
        );
        ReactDom.render(element, this.domElement);
    }
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                }),
                                PropertyPaneTextField('title', {
                                    label: 'Title'
                                })

                            ]
                        }
                    ]
                }
            ]
        };
    }
}


export default class Module05AppCustomizerApplicationCustomizer
    extends BaseApplicationCustomizer<IModule05AppCustomizerApplicationCustomizerProperties> {

    @override
    public onInit(): Promise<void> {
        this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

        return Promise.resolve();
    }

    private _renderPlaceHolders(): void {
        if (!this._topPlaceholder) {
            this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
                PlaceholderName.Top,
                { onDispose: this._onDispose }
            );
        }
        if (this._topPlaceholder) {
            const element = React.createElement(
                SPFxHeader,
                {
                    text: "(Top property was not defined.)"
                }
            );

            ReactDom.render(element, this._topPlaceholder.domElement);// as React.Component<IHeaderProps, React.ComponentState, any>;

        } else {
            console.error("The expected placeholder (Top) was not found.");
        }
    }
}
