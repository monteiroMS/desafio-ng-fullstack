import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userProvider';
import { getUserFromLS } from '../../utils/localStorage';

function Home() {
  const { setUser } = useContext(UserContext);

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
