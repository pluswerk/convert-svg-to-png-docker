import convertSvgToPng from "convert-svg-to-png";
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const serverPort = 3000;
const app = express();
const converter = convertSvgToPng.createConverter({
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});
app.use(bodyParser.text({
  type: '*/*',
  limit: '10mb',
}));

app.get('/convert', async (req, res) => {
  try {
    const options = {};
    options.background = req.query.background || '#fff';
    options.baseUrl = req.query.baseUrl || 'file:///app';
    options.scale = req.query.scale || 1;
    if (req.query.baseFile) options.baseFile = req.query.baseFile;
    if (req.query.height) options.height = req.query.height;
    if (req.query.width) options.width = req.query.width;
    console.log('convert svg', options);
    console.log('convert url', req.query.url);
    var resp = await axios.get(req.query.url);
    var svg = resp.data;
    if (svg.trim().toLowerCase().startsWith("<svg")) {
      const png = await converter.convert(svg, options);
      res.set('Content-Type', 'image/png');
      res.send(png);
    } else {
      res.redirect(req.query.url);
    }
  } catch (e) {
    res.status(500).send(e.message);
    console.log('error', e);
  }
});

app.post('/convert', async (req, res) => {
  try {
    const options = {};
    options.background = req.query.background || '#fff';
    options.baseUrl = req.query.baseUrl || 'file:///app';
    options.scale = req.query.scale || 1;
    if (req.query.baseFile) options.baseFile = req.query.baseFile;
    if (req.query.height) options.height = req.query.height;
    if (req.query.width) options.width = req.query.width;
    console.log('convert svg', options);
    const png = await converter.convert(req.body, options);
    res.set('Content-Type', 'image/png');
    res.send(png);
  } catch (e) {
    res.status(500).send(e.message);
    console.log('error', e);
  }
});

const server = app.listen(serverPort);

// HTTP Keep-Alive to a short time to allow graceful shutdown
server.on('connection', function (socket) {
  socket.setTimeout(5 * 1000);
});

const shutdown = async () => {
  console.log('graceful shutdown puppeteer');
  await converter.destroy();
  console.log('graceful shutdown express');
  server.close(function () {
    console.log('closed express');
    process.exit();
  });
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

console.log('Running server: http://0.0.0.0:' + serverPort);
