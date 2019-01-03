const ChainUtil = require('../chain-util');

class Transaction {
  constructor() {
    this.id = ChainUtil.id();
    this.input = null;
    this.outputs = [];
  }

  update(senderWallet, recipient, amount) {
    const senderOutput = this.outputs.find(output => output.address === senderWallet.publicKey);

    if (amount > senderOutput.amount) {
      console.log(`Transaction amount ${amount} exceeds balance!`);
      return;
    }

    senderOutput.amount = senderOutput.amount - amount; // update remaining balance
    this.outputs.push({ amount, address: recipient }) // add new transaction output
    Transaction.signTransaction(this, senderWallet);

    return this;
  }

  static newTransaction(senderWallet, recipient, amount) {
    const transaction = new this();

    if (amount > senderWallet.balance) {
      console.log(`Transaction amount ${amount} exceeds balance!`);
      return;
    }

    transaction.outputs.push(...[
      { amount: senderWallet.balance - amount, address: senderWallet.publicKey },
      { amount, address: recipient }
    ])
    Transaction.signTransaction(transaction, senderWallet);

    return transaction;
  }

  static signTransaction(transaction, senderWallet) {
    transaction.input = {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
    }
  }

  static verifyTransaction(transaction) {
    const { input, signature, outputs } = transaction;
    return ChainUtil.verifySignature(input.address, input.signature, ChainUtil.hash(outputs));
  }
}

module.exports = Transaction;
