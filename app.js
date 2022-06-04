const express = require('express');
const BlockChain = require('./src/blockchain/blockchain');
const P2PServer = require('./p2p-server');

const app = express();
const bc = new BlockChain();
const p2pServer = new P2PServer(bc);

const HTTP_PORT = process.env.HTTP_PORT || 3001;

app.use(express.json());

app.get('/blocks', (req, res, next)=>{
        return res.json(bc.chain);
})

app.post('/blocks', (req, res, next)=>{
        const newBlock = bc.addBlock(req.body.data);
        console.log(`new block added ${newBlock.toString()}`)
        p2pServer.syncChain();
        return res.redirect('/blocks')
})

app.listen(HTTP_PORT, ()=> console.log(`listening to the port ${HTTP_PORT}...`));
p2pServer.listen()