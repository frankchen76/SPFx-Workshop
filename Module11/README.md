## module-11-demo-1

This is where you include your WebPart documentation.

## Demo
### Azure CDN
* Subscription: [your-azure-subscription]
* RG: [resource-group]
* CDN: [cdn-url]
* SA: [storage-account]
* Key: [storage-account-key]

### Demo1: explain package structure and content
* Run gulp bundle --ship && gulp package-solution --ship
* Showcase dist, lib and sharepoint/solution folders. 

### Demo2: explain the Azure CDN deployment
* Update package-solution.json
  *  Change includeClientSideAssets to false. This avoid to use the O365 CDN
* Update deploy-azure-storage.json
```JSON
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/deploy-azure-storage.schema.json",
  "workingDir": "./temp/deploy/",
  "account": "<!-- STORAGE ACCOUNT NAME -->",
  "container": "module-11-demo-1",
  "accessKey": "<!-- ACCESS KEY -->"
}
```
* Update write-manifests.json
```JSON
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/write-manifests.schema.json",
  "cdnBasePath": "[cdn-base-path]"
}
```
* Run ```gulp bundle --ship``` to create bundle files which you can find from releases/assets folder
* Run ```gulp deploy-azure-storage``` to deploy your file to azure storage
* Run ```gulp package-solution --ship``` to create .sppkg file. 
* Go to app catalog site and upload package. You will the file will be reference from Azure CDN

### Demo3: 
enable O365 CDN PowerShell

### Demo4: 
Access site collection appcatalog list

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
