const SHA265 = require('crypto-js/sha256');

class Block {
        constructor(timestamp, lasthash, hash, data) {
                this.timestamp = timestamp;
                this.lasthash = lasthash;
                this.hash = hash;
                this.data = data;
        }

        toString() {
                return `Block 
                        timestamp = ${this.timestamp}
                        lasthash = ${this.lasthash}
                        hash = ${this.hash}
                        data = ${this.data}
                `
        }

        static genesis() {
                return new this('timestamp', 'naimlasthash', 'genesisCurrentHash', 'naim');
        }


        /**
         * create a new block
         * @param {{lasthash: String, timestamp: Number, data: Any | Any[], hash: String}} lastblock 
         * @param {Any | Any[]} data 
         * @returns {String} new block
         */
        static mineBlock( lastblock, data ) {
                const timestamp = Date.now();
                const lasthash = lastblock.hash;
                const hash = Block.hash(timestamp, lasthash, data);

                // create new block
                const mineBlock = new this(timestamp, lasthash, hash, data);
                console.log({lastblock, mineBlock});
                return mineBlock;
        }

        /**
         * create a new hash from the given params
         * @param {Number} timestamp 
         * @param {String} lasthash 
         * @param {Any | Any[]} data 
         * @returns {String} NewHash
         */
        static hash(timestamp, lasthash, data) {
                return SHA265(`${timestamp}${lasthash}${data}`).toString()
        }


        /**
         * Return the Hash of the given block
         * @param {Block} block 
         * @returns {String} hash of the given block
         */
        static blockHash(block){
                const { timestamp, lasthash, data } = block;
                return Block.hash(timestamp, lasthash, data);
        }


}

module.exports = Block;