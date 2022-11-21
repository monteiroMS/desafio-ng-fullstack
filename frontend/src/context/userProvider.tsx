import React, { useMemo, useState, createContext } from 'react';
import IReactChildren from '../interfaces/IReactChildren';
import IUser from '../interfaces/IUser';

type UserContextType = {
  user: IUser,
  setUser: (newState: IUser) => void,
}

const INITIAL_USER = {
  id: 0,
  username: '',
  accountId: 0,
  account: { balance: '', id: 0 },
  balance: 0,
};

const INITIAL_VALUE = {
  user: INITIAL_USER,
  setUser: () => {},
};

export const UserContext = createContext<UserContextType>(INITIAL_VALUE);

const UserProvider = ({ children }: IReactChildren) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);

  const context = useMemo(() => ({
    user,
    setUser,
  }), [user, setUser]);

  return (
    <UserContext.Provider value={ context }>
      { children }
    </UserContext.Provider>
  )
};

export default UserProvider;
