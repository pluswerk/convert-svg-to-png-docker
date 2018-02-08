FROM pluswerk/puppeteer

WORKDIR /app

#RUN yarn add convert-svg-to-png
RUN yarn global add convert-svg-to-png
#RUN echo 'alias convert-svg-to-png="/app/node_modules/.bin/convert-svg-to-png --puppeteer={\"args\": [\"--no-sandbox\", \"--disable-setuid-sandbox\"]}"' > ~/.bashrc

USER 1000:1000

WORKDIR /app/data

