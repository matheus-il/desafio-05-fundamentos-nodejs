import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeSumReduce = (
      result: number,
      transaction: Transaction,
    ): number =>
      transaction.type === 'income' ? result + transaction.value : result;

    const outcomeSumReduce = (
      result: number,
      transaction: Transaction,
    ): number =>
      transaction.type === 'outcome' ? result + transaction.value : result;

    const income = this.transactions.reduce(incomeSumReduce, 0);
    const outcome = this.transactions.reduce(outcomeSumReduce, 0);
    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
