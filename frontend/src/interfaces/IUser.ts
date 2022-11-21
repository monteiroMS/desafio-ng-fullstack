export default interface IUser {
  id: number,
  username: string,
  accountId: number,
  account: { balance: string, id: number },
  balance: number,
}
