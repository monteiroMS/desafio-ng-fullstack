import { Model, INTEGER } from 'sequelize';
import db from '.';
import User from './user.model';
import Transaction from './transaction.model';

class Account extends Model {
  public id!: number;
  public balance!: string;
}

Account.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  balance: {
    allowNull: false,
    type: INTEGER,
  },
}, {
  sequelize: db,
  modelName: 'Accounts',
  timestamps: false,
});

Account.hasOne(User, { foreignKey: 'accountId', as: 'user' });
Account.hasMany(Transaction, { foreignKey: 'debitedAccountId', as: 'debitedAccount' });
Account.hasMany(Transaction, { foreignKey: 'creditedAccountId', as: 'creditedAccount' });

export default Account;
