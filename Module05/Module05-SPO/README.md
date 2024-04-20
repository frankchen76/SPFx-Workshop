## module-05-demo-1

This is where you include your WebPart documentation.
NOTE: for SPFx 1.16.1, the react needs to install 17.0.1. after you run ```npm install``` at the first time, you might need to uninstall react and react-dom and specifically install 17.0.1 version for both. 

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO

### troubleshooting
If the application customizer cannot be loaded because "TypeError: Cannot read properties of undefined (reading 'id')", make sure your react and react-dom versions are exact 17.0.1 via running the following command: 
```
npm install react@17.0.1 react-dom@17.0.1 @types/react@17.0.45 @types/react-dom@17.0.17 --save-exact
npm install react@17.0.1 react-dom@17.0.1 @types/react@17.0.45 @types/react-dom@17.0.17 --save-exact
```
