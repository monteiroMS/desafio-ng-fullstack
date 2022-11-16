import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Account from './account.model';

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public accountId!: number;
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  username: {
    allowNull: false,
    unique: true,
    type: STRING,
  },
  password: {
    allowNull: false,
    type: STRING,
  },
  accountId: {
    allowNull: false,
    type: INTEGER,
  },
}, {
  sequelize: db,
  modelName: 'User',
  tableName: 'Users',
  timestamps: false,
});

User.belongsTo(Account, { foreignKey: 'accountId', as: 'account' });
Account.hasOne(User, { foreignKey: 'accountId', as: 'user' });

export default User;
