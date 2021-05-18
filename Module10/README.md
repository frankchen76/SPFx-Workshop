## module-10-demo

This demonstrated the how to customize
* webpack 
* gulp

## Note
you need to install html-loader@1.3.2 for webpack v4. the latest html-loader@2.1.2 doesn't support webpack v4
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
