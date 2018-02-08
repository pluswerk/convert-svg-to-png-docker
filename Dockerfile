FROM pluswerk/puppeteer

WORKDIR /app

RUN yarn global add convert-svg-to-png

#USER 1000:1000
