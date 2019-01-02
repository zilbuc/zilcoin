const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const P2pServer = require('./p2p-server');

const HTTP_PORT = process.env.HTTP_PORT || 3001;
//another user may define process environment variable by $ HTTP_PORT=3002 npm run dev

// create express application:
const app = express();
const bc = new Blockchain;
const p2pServer = new P2pServer(bc);

//allows receiving JSON data in POST requests
app.use(bodyParser.json());

app.get('/blocks', (req, res) => {
  res.json(bc.chain);
})

app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body.data);
  console.log(`New block added: ${block.printBlock()}`); //message to the user

  //
  p2pServer.syncChains();

  res.redirect('/blocks'); //app responds with updated chain
});

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`) );
p2pServer.listen(); // starts Websocket server
