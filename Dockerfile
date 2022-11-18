FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /app

RUN yarn add convert-svg-to-png express body-parser axios

COPY index.mjs /app/

CMD ["node", "--experimental-modules", "index.mjs"]

EXPOSE 3000
