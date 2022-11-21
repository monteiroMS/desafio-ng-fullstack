import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userProvider';
import requestUser from '../../utils/api/requestUser';
import formatToReal from '../../utils/formatToReal';
import { getUserFromLS } from '../../utils/localStorage';
import styles from './styles.module.css';

function Balance() {
  const { user, setUser } = useContext(UserContext);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setReload(false);
    const lsUser = getUserFromLS();
    const getUser = async () => {
      const updatedUser = await requestUser(lsUser.username, lsUser.token);
      setUser(updatedUser);
    };
    getUser();
  }, [reload]);

  return (
    <div className={ styles.container }>
      <p>{ `Saldo atual: ${formatToReal(Number(user.account.balance))}` }</p>
      <button
        type="button"
        onClick={ () => setReload(true) }
      >
        Atualizar
      </button>
    </div>
  );
}

export default Balance;
