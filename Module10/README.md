## module-10-demo

This demonstrated the how to customize
* webpack 
* gulp

## Note
you need to install html-loader@1.3.2 for webpack v4. the latest html-loader@2.1.2 doesn't support webpack v4

## Demo: 
|Sample|Description|
|------------------- | :----------------------------- |
|Showcase the custom gulp task| <ul><li>Type ```gulp --tasks``` to show all available gulp tasks</li><li>Check ./config/package-solution.json and make sure the version is "1.0.0.0". Type ```gulp update-version --version=2```, the version will change to 1.0.2</li></ul>|
|Module10Demo1 |  showcase the customer gulp which deploy a sppkg to app catalog directly<ul><li>Demonstrate the web part on https://m365x725618.sharepoint.com/sites/TestCommunication-AppCatalog/SitePages/Page1.aspx</li><li>Make update for the web part. </li><li>Run ```gulp update-version && gulp bundle --ship && gulp package-solution --ship && gulp deploy``` to deploy to https://m365x725618.sharepoint.com/sites/TestCommunication-AppCatalog which has site collection app catalog enabled. </li><li>go back to the demo site, the web part will be updated automatically</li><li>Showcase</li><li><ul><li>the code change</li><li>Package-solution.json version change</li><li>SPFx deployed to site collection app catalog</li><li>Version is updated</li><li>Web part is updated on page automatically. </li></ul></li></ul>|
|Module10Demo1| showcase the customer webpack<ul><li>Walk through how the webpack works. </li><li>Introduce customization for webpack</li></ul>|

## Building the code

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
