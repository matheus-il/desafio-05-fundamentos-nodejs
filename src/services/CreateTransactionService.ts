import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title = '', value = 0, type }: Request): Transaction {
    if (type !== 'outcome' && type !== 'income')
      throw Error('Type is wrong. Should be income or outcome');

    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      if (balance.total - value < 0)
        throw Error('Transaction denied. Balance can not be negative.');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
