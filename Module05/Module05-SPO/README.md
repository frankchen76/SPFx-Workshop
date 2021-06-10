## module-05-demo-1

This is where you include your WebPart documentation.

## Demo: 
|Sample|Description|
|------------------- | :----------------------------- |
|Module05Demo1| demonstrate footer and header for page placeholder. Run ```gulp serve --config=module05AppCustomizer```|
|Module05Demo2|  demonstrate command set for Document library to show two button for both command set and context menu Run ```gulp serve --config=module05CommandSet```|
|MOdule05Demo3| demonstrate a percent field which you can show a d percent bar based on the value of "Percent" column. Run ```gulp serve --config=module05FieldCustomizer```|

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
