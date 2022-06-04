const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;

const peers = process.env.Peers ? process.env.PEERS.split(',') : [];

class P2PServer {
        constructor(blockchain) {
                this.blockchain = blockchain;
                this.sockets = [];
        }


        listen(){
                const server = new Websocket.Server({port: P2P_PORT});
                server.on('connection', (socket)=> this.connectSocket(socket));

                this.connetPeers();

                console.log(`P2P Server is listening to port ${P2P_PORT}`)
        }

        connetPeers(){
                peers.map(peer => {
                        const socket = new Websocket(peer);
                        socket.on('open', ()=> this.connectSocket(socket))
                })
        }

        connectSocket(socket) {
                this.sockets.push(socket);
                console.log(`socket is connected`)

                this.messageHandler(socket);

                this.sendChain(socket);
        }

        messageHandler(socket) {
                socket.on('message', (message) => {
                        const data = JSON.parse(message);
                        
                        this.blockchain.replaceChain(data);
                })
        }

        sendChain(socket){
                socket.send(JSON.stringify(this.blockchain.chain));
        }

        syncChain(){
                this.sockets.map(socket => this.sendChain(socket));
        }


}


module.exports = P2PServer;
// HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev