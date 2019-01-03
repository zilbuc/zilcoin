const { INITIAL_BALANCE } = require('../config');
const ChainUtil = require('../chain-util');

class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ChainUtil.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  printWallet() {
    return `Wallet -
      Public Key: ${this.publicKey.toString()}
      Balance   : ${this.balance}`
  }

  sign(dataHash) {
    return this.keyPair.sign(dataHash);
  }
}

module.exports = Wallet;
