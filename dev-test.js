 // const Blockchain = require('./blockchain');
 //
 // const bc = new Blockchain();
 //
 // for (let i = 0; i < 10; i++) {
 //   console.log(bc.addBlock(`foo ${i}`).printBlock());
 // }
// *************************
//
// const Wallet = require('./wallet');
// const Transaction = require('./wallet/transaction');
//
// // const wallet = new Wallet();
//
// //console.log(wallet.printWallet());
//
// const wallet = new Wallet();
// const amount = 50;
// const recipient = 'r3c1p13nt';
// const transaction = Transaction.newTransaction(wallet, recipient, amount);
//
// console.log(transaction.input.amount);
//
// ******************************************

const TransactionPool = require('./wallet/transaction-pool');
const Transaction = require('./wallet/transaction');
const Wallet = require('./wallet');

let tp, wallet, transaction, transaction2;

tp = new TransactionPool();
console.log(tp.transactions);
wallet = new Wallet();
transaction = wallet.createTransaction('r4nd-4ddr355', 30, tp);
transaction = wallet.createTransaction('r4nd-4ddr355', 100, tp);
transaction = wallet.createTransaction('r4nd-4ddr355', 3000, tp);

wallet2 = new Wallet();
transaction2 = wallet2.createTransaction('r4nd-4ddr355', 70, tp);

console.log(tp.transactions);
