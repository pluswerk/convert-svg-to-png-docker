# convert-svg-to-png-docker
Opinionated puppeteer Headless Chrome

example docker-compose.yml:
````yaml
version: '3'

services:
  puppeteer:
    image: pluswerk/convert-svg-to-png
    container_name: puppeteer
    # volumes only needed if you want to use local file system
    volumes:
      - ./:/app/
    entrypoint: ["sh", "-c", "sleep infinity"]
````


To convert your svg you can pipe your svg string into the ``docker exec`` command and get the png to STDOUT.
````bash
cat svg.svg | docker exec -i puppeteer convert-svg-to-png --puppeteer="{\"args\": [\"--no-sandbox\", \"--disable-setuid-sandbox\"]}" --width=350 --background="#4f4" > svg.png
````

Or you copy your svg to your root dir. or rather where you run your ``docker-compose up -d``.
And than run this line:
````bash
docker-compose exec puppeteer convert-svg-to-png --puppeteer="{\"args\": [\"--no-sandbox\", \"--disable-setuid-sandbox\"]}" --width=350 --background="#4ff" svg.svg
````
