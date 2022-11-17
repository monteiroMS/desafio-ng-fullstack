export type IUser = {
  id?: number,
  username: string,
  password: string,
  accountId?: number,
  account?: {
    id: 1,
    balance: 100,
  },
};
