# convert-svg-to-png-docker
Opinionated puppeteer Headless Chrome

example docker-compose.yml:
````yaml
version: '3'

services:
  puppeteer:
    image: pluswerk/convert-svg-to-png
    volumes:
      - ./:/app/data
    entrypoint: ["sh", "-c", "sleep infinity"]
````

To convert your svg copy to your root dir. or rather where you run your ``docker-compose up -d``.
Then run this line:
````bash
docker-compose exec puppeteer convert-svg-to-png --puppeteer="{\"args\": [\"--no-sandbox\", \"--disable-setuid-sandbox\"]}" --width=350 --background="#4ff" svg.svg
````

Or you can pipe your svg string into the ``docker exec`` command and get the png to STDOUT.
````bash
docker exec -i a_puppeteer_1 convert-svg-to-png --puppeteer="{\"args\": [\"--no-sandbox\", \"--disable-setuid-sandbox\"]}" --width=350 --background="#4f4" < svg.svg
````
