import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Balance from '../../components/balance';
import Header from '../../components/header';
import NewTransaction from '../../components/newTransaction';
import TransactionHistory from '../../components/transactionHistory';
import { UserContext } from '../../context/userProvider';
import requestUser from '../../utils/api/requestUser';
import { getUserFromLS } from '../../utils/localStorage';

function Home() {
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const reloadUser = async (username: string, token: string) => {
      const user = await requestUser(username, token);
      setUser({
        ...user,
        balance: Number(user.account.balance),
      });
    };
    const lsUser = getUserFromLS();
    if (!lsUser) {
      navigate('/login');
    } else {
      reloadUser(lsUser.username, lsUser.token);
    }
  }, []);

  return (
    <div>
      <Header />
      <Balance />
      <main>
        <NewTransaction />
        <TransactionHistory />
      </main>
    </div>
  );
}

export default Home;
