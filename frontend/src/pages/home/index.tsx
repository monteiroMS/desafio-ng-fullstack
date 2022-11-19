import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';
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
    <Header />
  );
}

export default Home;
