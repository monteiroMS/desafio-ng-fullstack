import { Model } from 'sequelize';
declare class Account extends Model {
    id: number;
    balance: string;
}
export default Account;
