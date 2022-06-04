const Block = require('./block');

describe('Block', ()=> {
        let data, lastblock, block;

        beforeEach(()=> {
                data = 'naimtest'
                lastblock = Block.genesis();
                block = Block.mineBlock(lastblock, data);
        });

        it('sets the `data` to be match of new block', ()=> {
                expect(block.data).toEqual(data);
        })

        it('sets the `lasthash` match to the lastest block `hash`', ()=>{
                expect(block.lasthash).toEqual(lastblock.hash)
        })
})