import { Model } from 'sequelize';
declare class User extends Model {
    id: number;
    username: string;
    password: string;
    accountId: number;
}
export default User;
