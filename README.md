# convert-svg-to-png-docker
Opinionated puppeteer Headless Chrome

example docker-compose.yml:
````yaml
version: '3'

services:
  puppeteer:
    image: pluswerk/convert-svg-to-png
    ports:
    - 8999:3000

````

to convert an svg to png send a Request with your svg in the body to ``/convert``
````bash
curl -X POST -d '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100"></svg>' http://localhost:8999/convert?background=black > svg.png
````
#### Options

| Option       | Type          | Default                 | Description                                                                                                                                                      |
| ------------ | ------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `background` | String        | N/A                     | Background color to be used to fill transparent regions within the SVG. Will remain transparent if omitted.                                                      |
| `baseFile`   | String        | N/A                     | Path of the file to be converted into a file URL to use for all relative URLs contained within the SVG. Cannot be used in conjunction with the `baseUrl` option. |
| `baseUrl`    | String        | `"file:///app"`         | Base URL to use for all relative URLs contained within the SVG. Cannot be used in conjunction with the `baseFile` option.                                        |
| `height`     | Number/String | N/A                     | Height of the output to be generated. Derived from SVG input if omitted.                                                                                         |
| `scale`      | Number        | `1`                     | Scale to be applied to the width and height (specified as options or derived).                                                                                   |
| `width`      | Number/String | N/A                     | Width of the output to be generated. Derived from SVG input if omitted.                                                                                          |
