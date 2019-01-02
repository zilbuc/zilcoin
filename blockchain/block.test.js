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

  it('generates a hash that matches the DIFFICULTY', () => {
    expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty));
  });

  it('lowers the difficulty for slowly mined blocks', () => {
    expect(Block.adjustDifficulty(block, block.timestamp+360000)).toEqual(block.difficulty - 1);
  });

  it('raises the difficulty for too fast mined blocks', () => {
    expect(Block.adjustDifficulty(block, block.timestamp+1)).toEqual(block.difficulty + 1);
  });

});
