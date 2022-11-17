import User from "../database/models/user.model";
import ICRUDService from "../interfaces/ICRUDService";
import { IUser } from "../interfaces/IUser";
import sequelize from '../database/models';
import Account from "../database/models/account.model";
import getHash from "../helpers/getHash";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

const jwtSecret = process.env.JWT_SECRET;

export default class UserService implements ICRUDService<IUser> {
  constructor(
    private _model = User,
  ) {}

  public async login({ username, password }: IUser): Promise<string> {
    const user = await this.getOneByUsername(username);

    if (!user) throw new Error('Username not found');

    const isValid = bcrypt.compareSync(password, user.password)
    if (!isValid) throw new Error('Wrong password');
    
    const token = jwt.sign({ username }, jwtSecret as string, { expiresIn: '24h' });
    return token;
  }

  public async create(newUser: IUser): Promise<string> {
    await sequelize.transaction(async (t) => {
      const { id } = await Account.create(
        { balance: 100 },
        { transaction: t },
      );

      const user = await User.create(
        {
          ...newUser,
          accountId: id,
          password: getHash(newUser.password),
        },
        { transaction: t },
      );
      return user;
    });

    const token = await this.login(newUser);
    return token;
  }

  public async getAll(): Promise<IUser[]> {
    const users = await this._model.findAll();
    return users;
  }

  public async getOneById(id: number): Promise<IUser | null> {
    const user = await this._model.findByPk(id);
    return user;
  }

  public async getOneByUsername(username: string): Promise<IUser | null> {
    const user = await this._model.findOne({
      where: { username },
      include: [{ model: Account, as: 'account' }],
    });
    return user;
  }

  public async update(id: number, obj: IUser): Promise<number> {
    const [affectedRows] = await this._model.update(
      { ...obj },
      { where: { id } },
    );
    return affectedRows;
  }

  public async delete(id: number): Promise<number> {
    const res = await this._model.destroy({
      where: { id },
    });
    return res;
  }
}
