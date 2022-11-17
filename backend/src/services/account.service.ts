import { Transaction } from "sequelize";
import Account from "../database/models/account.model";

export default class AccountService {
  constructor(
    private _model = Account,
  ) {}

  public async getOneById(id: number) {
    const account = await this._model.findByPk(id);

    if (!account) throw new Error('Account not found');

    return account;
  }

  public async newDebit(accountId: number, value: number, sequelizeTransaction: Transaction) {
    const account = await this.getOneById(accountId);

    const newBalance = Number(account.balance) - value;

    await this.updateBalance(accountId, newBalance, sequelizeTransaction);

    return newBalance;
  }

  public async newCredit(accountId: number, value: number, sequelizeTransaction: Transaction) {
    const account = await this.getOneById(accountId);

    const newBalance = Number(account.balance) + value;

    await this.updateBalance(accountId, newBalance, sequelizeTransaction);

    return newBalance;
  }

  public async updateBalance(id: number, value: number, t: Transaction) {
    await this._model.update(
      { balance: value },
      { where: { id }, transaction: t },
    );
  }
}
