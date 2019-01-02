const Block = require('./block');

describe('block', () => {
  let data, lastBlock, block;

  beforeEach(() => {
    data = 'bar';
    lastBlock = Block.genesis();
    block = Block.mineBlock(lastBlock, data);
  });

  it('sets the `data` to match the input', () => {
    expect(block.data).toEqual(data);
  });

  it('sets `lastHash` to match the hash of last block', () => {
    expect(block.lastHash).toEqual(lastBlock.hash);
  });

});
