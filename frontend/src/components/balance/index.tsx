import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userProvider';
import requestUser from '../../utils/api/requestUser';
import formatToReal from '../../utils/formatToReal';
import { getUserFromLS } from '../../utils/localStorage';
import ReloadButton from '../reloadImg';
import styles from './styles.module.css';

function Balance() {
  const { user, setUser } = useContext(UserContext);
  const [reload, setReload] = useState(false);

  const getUser = async () => {
    const { username, token } = getUserFromLS();
    const updatedUser = await requestUser(username, token);
    setUser(updatedUser);
  };

  useEffect(() => {
    getUser();
  }, [reload]);

  return (
    <div className={ styles.container }>
      <p>Saldo:</p>
      <p
        className={ styles.money }
      >
        { ` + ${formatToReal(Number(user.account.balance))}` }
      </p>
      <ReloadButton setReload={ setReload }/>
    </div>
  );
}

export default Balance;
