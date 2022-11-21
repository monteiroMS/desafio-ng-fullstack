import TransactionModel from "../database/models/transaction.model";
import ITransaction from '../interfaces/ITransaction';
import { Transaction } from 'sequelize';
import sequelize from '../database/models';
import { Op } from "sequelize";
import User from '../database/models/user.model';
import Account from '../database/models/account.model';

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

  public async getCashOut(accountId: number) {
    const cashOut = await this._model.findAll({
      where: { debitedAccountId: accountId },
      include: [{
        model: Account,
        as: 'debitedFrom',
        include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
      },
      {
        model: Account,
        as: 'creditedIn',
        include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
      }]
    });
    return cashOut;
  }

  public async getCashIn(accountId: number) {
    const cashIn = await this._model.findAll({
      where: { creditedAccountId: accountId },
      include: [{
        model: Account,
        as: 'debitedFrom',
        include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
      },
      {
        model: Account,
        as: 'creditedIn',
        include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
      }]
    });
    return cashIn;
  }

  public async getCashOutByDate(accountId: number, date: string) {
    const cashOut = await this._model.findAll(
      { 
        where: {
          debitedAccountId: accountId,
          [Op.and]: [
            sequelize.where(sequelize.fn('date', sequelize.col('createdAt')), '=', date)
          ],
        }, 
      },
    );
    return cashOut;

  }

  public async getCashInByDate(accountId: number, date: string) {
    const cashIn = await this._model.findAll(
      {
        where: {
          creditedAccountId: accountId,
          [Op.and]: [
            sequelize.where(sequelize.fn('date', sequelize.col('createdAt')), '=', date)
          ],
        },
      },
    );
    return cashIn;
  }
}
