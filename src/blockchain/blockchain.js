const Block = require("./block");

class Blockchain {
        constructor(){
                this.chain = [Block.genesis()];
        }

        /**
         * adds new block to the chain
         * @param {Any | Any[]} data 
         * @returns {Block} new Block
         */
        addBlock(data) {
                const lastblock = this.chain[this.chain.length-1];
                // create new block
                const newBlock = Block.mineBlock(lastblock, data);
                // add the newly created block to the existing chain
                this.chain.push(newBlock);
                return newBlock;
        }

        /**
         * validate the chain
         */
        isValidChain(chain){
                if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

                for(let i=1; i<chain.length; i++) {
                        const block = chain[i];
                        const lastBlock = chain[i-1];

                        if(lastBlock.hash !== block.lasthash || block.hash !== Block.blockHash(block)) return false;
                }

                return true;
        }


        replaceChain(newChain) {
                if(newChain.length <= this.chain.length) {
                        console.log('new change is not longer than the previous');
                        return;
                }
                else if(!this.isValidChain(newChain)){
                        console.log('not a valid chain');
                        return;
                }
                
                console.log('blockchain is replaced');
                this.chain = newChain;
        }
}


module.exports = Blockchain