const express = require('express');
const http = require('http');
const path = require('path');
const { ExpressPeerServer } = require('peer');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const peerServer = ExpressPeerServer(server, {
  path: '/',
  proxied: true,
  allow_discovery: false
});

app.use('/peerjs', peerServer);
app.use(express.static(path.join(__dirname, 'public')));
app.get('/health', (_req, res) => res.status(200).send('ok'));

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Game server listening on ${PORT}`);
});
