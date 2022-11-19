import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IUser from '../../interfaces/IUser';
import { getUserFromLS } from '../../utils/localStorage';

const INITIAL_USER = {
  token: '',
  username: '',
  balance: 0,
}

function Home() {
  const [user, setUser] = useState<IUser>(INITIAL_USER);

  const navigate = useNavigate();

  useEffect(() => {
    const lsUser = getUserFromLS();
    if (!lsUser) {
      navigate('/login');
    } else {
      setUser({
        ...lsUser,
        balance: Number(lsUser.balance),
      });
    }
  }, []);

  return (
    <p>this is the homepage</p>
  );
}

export default Home;
