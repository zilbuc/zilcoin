 // const Blockchain = require('./blockchain');
 //
 // const bc = new Blockchain();
 //
 // for (let i = 0; i < 10; i++) {
 //   console.log(bc.addBlock(`foo ${i}`).printBlock());
 // }
// *************************
//
const Wallet = require('./wallet');
const Transaction = require('./wallet/transaction');

// const wallet = new Wallet();

//console.log(wallet.printWallet());

const wallet = new Wallet();
const amount = 50;
const recipient = 'r3c1p13nt';
const transaction = Transaction.newTransaction(wallet, recipient, amount);

console.log(transaction.input.amount);
