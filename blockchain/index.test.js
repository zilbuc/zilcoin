const Blockchain = require('./index');
const Block = require('./block');

describe('Blockchain', () => {
  let bc, bc2;

  beforeEach(() => {
    bc = new Blockchain();
    bc2 = new Blockchain();
  });

  it('starts with genesis block', () => {
    expect(bc.chain[0]).toEqual(Block.genesis());
  });

  it('adds a new block', () => {
    const data = 'foo';
    const newBlock = bc.addBlock(data);

    expect(bc.chain[bc.chain.length-1].data).toEqual(data);
  })

  it('validates a valid chain', () => {
    bc2.addBlock('foo');

    expect(bc.isValidChain(bc2.chain)).toBe(true);
  });

  it('does not validate corrupt genesis block', () => {
    bc2.chain[0].data = 'bad data';

    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it('invalidates a corrupt chain', () => {
    bc2.addBlock('foo');
    bc2.chain[1].data = 'not foo';

    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it('replaces the chain with a valid chain', () => {
    bc2.addBlock('foo');
    bc.replaceChain(bc2.chain);

    expect(bc.chain).toEqual(bc2.chain);
  });

  it('does not replace a chain with a shorter or equal chain', () => {
    bc.addBlock('poo');

    expect(bc.chain).not.toEqual(bc2.chain);
  });
});
