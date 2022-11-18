import TransactionModel from "../database/models/transaction.model";
import ITransaction from '../interfaces/ITransaction';
import { Transaction } from 'sequelize';

export default class TransactionService {
  constructor(
    private _model = TransactionModel,
  ) {}

  public async newTrasaction(transaction: ITransaction, sequelizeTransaction: Transaction) {
    const newTransaction = await this._model.create(
      { ...transaction },
      { transaction: sequelizeTransaction },
    );
    return newTransaction;
  }
}
