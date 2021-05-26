declare interface IModule05CommandSetCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'Module05CommandSetCommandSetStrings' {
  const strings: IModule05CommandSetCommandSetStrings;
  export = strings;
}
