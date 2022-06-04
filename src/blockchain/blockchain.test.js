const Block = require("./block");
const Blockchain = require("./blockchain")

describe('Block chain', ()=>{
        let bc, bc2;

        beforeEach(()=>{

                bc = new Blockchain();
                bc2 = new Blockchain();
        });

        it(`starts with genesis block`, ()=> {
                expect(bc.chain[0]).toEqual(Block.genesis());
        });

        it(`add a new block`, ()=>{
                const data = 'naim for test 2';
                const newBlock = bc.addBlock(data);
                expect(bc.chain[bc.chain.length-1].data).toEqual(newBlock.data);
        })

        it(`validate a valid chain`, ()=>{
                // console.log({test:0, bc:bc.chain , bc2: bc2.chain})
                // bc2.addBlock('oishi');
                // console.log({test:1, bc:bc.chain , bc2: bc2.chain})
                // bc.addBlock('oishi2');
                // console.log({test:2, bc:bc.chain , bc2: bc2.chain})
                bc2.addBlock('oishi');
                expect(bc.isValidChain(bc2.chain)).toBe(true);
        })


        it(`replaces the chain with valid chain`, ()=>{
                bc2.addBlock('checkForNewChain');
                bc.replaceChain(bc2.chain)
                expect(bc.chain).toEqual(bc2.chain)
        })

        it(`does not replace the chain with shorter one`, ()=>{
                bc.addBlock('not replacing test');
                bc.replaceChain(bc2.chain);
                expect(bc.chain).not.toEqual(bc2.chain)
        })
})