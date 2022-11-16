import { Model } from 'sequelize';
declare class Transaction extends Model {
    id: number;
    debitedAccountId: string;
    creditedAccountId: string;
    value: number;
    createdAt: Date;
}
export default Transaction;
