const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('./index');
const Blockchain = require('../blockchain');

describe('TransactionPool', () => {
  let tp, wallet, transaction, bc;

  beforeEach(() => {
    tp = new TransactionPool();
    wallet = new Wallet();
    bc = new Blockchain();
    // the same as wallet.createTransaction() :
    // transaction = Transaction.newTransaction(wallet, 'r4nd-4ddr355', 30);
    // tp.updateOrAddTransaction(transaction);
    transaction = wallet.createTransaction('r4nd-4ddr355', 30, bc, tp);
  });

  it('adds a transaction to the pool', () => {
    expect(tp.transactions.find(t => t.id === transaction.id)).toEqual(transaction);
  });

  it('updates a transaction in the pool', () => {
    const oldTransaction = JSON.stringify(transaction);
    const newTransaction = transaction.update(wallet, 'foo-4ddr355', 40);
    tp.updateOrAddTransaction(newTransaction);

    expect(JSON.stringify(tp.transactions.find(t => t.id === newTransaction.id))).not.toEqual(oldTransaction);
  });

  it('clears transactions', () => {
    tp.clear();
    expect(tp.transactions.length).toEqual(0);
    expect(tp.transactions).toEqual([]);
  });

  describe('mixing valid and corrupt transaction', () => {
    let validTransactions;

    beforeEach(() => {
      validTransactions = [...tp.transactions]; //spread operator :)))
      // 6 is arbitrary number, the goal is to create an array of transactions
      for (let i = 0; i < 6; i++) {
        wallet = new Wallet();
        transaction = wallet.createTransaction(`r4ndend-4ddr355`, 50, bc, tp);
        //corrupting 1/2 of transactions:
        if (i % 2 == 0) {
          transaction.input.amount = 99999;
        } else {
          validTransactions.push(transaction);
        }
      }
    });

    it('shows a difference between valid and corrupt transactions', () => {
      expect(JSON.stringify(tp.transactions)).not.toEqual(JSON.stringify(validTransactions));
    });

    it('grabs a valid transaction', () => {
      expect(tp.validTransactions()).toEqual(validTransactions);
    });
  });
});
