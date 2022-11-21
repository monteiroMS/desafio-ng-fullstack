import IUser from './IUser'

interface IOperation {
  id: number,
  balance: number,
  user: IUser,
}

export default interface ITransaction {
  createdAt: string,
  creditedAccountId: number,
  creditedIn: IOperation,
  debitedAccountId: number,
  debitedFrom: IOperation,
  id: number,
  value: number,
}
