import { Model, INTEGER } from 'sequelize';
import db from '.';
import Account from './account.model';

class Transaction extends Model {
  public id!: number;
  public debitedAccountId!: string;
  public creditedAccountId!: string;
  public value!: number;
  public createdAt!: Date;
}

Transaction.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  debitedAccountId: {
    allowNull: false,
    type: INTEGER,
  },
  creditedAccountId: {
    allowNull: false,
    type: INTEGER,
  },
  value: {
    allowNull: false,
    type: INTEGER,
  },
}, {
  sequelize: db,
  modelName: 'Transaction',
  tableName: 'Transactions',
  timestamps: true,
  updatedAt: false,
});

Transaction.belongsTo(Account, { foreignKey: 'debitedAccountId', as: 'debitedFrom' });
Transaction.belongsTo(Account, { foreignKey: 'creditedAccountId', as: 'creditedIn' });
Account.hasMany(Transaction, { foreignKey: 'debitedAccountId', as: 'debitedAccount' });
Account.hasMany(Transaction, { foreignKey: 'creditedAccountId', as: 'creditedAccount' });

export default Transaction;
