import { Model, INTEGER } from 'sequelize';
import db from '.';

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
  modelName: 'Account',
  tableName: 'Accounts',
  timestamps: false,
});

export default Account;
