import React, { useContext } from 'react';
import { UserContext } from '../../context/userProvider';
import formatToReal from '../../utils/formatToReal';
import styles from './styles.module.css';

function Balance() {
  const { user } = useContext(UserContext);

  return (
    <div className={ styles.container }>
      <p>{ `Saldo atual: ${formatToReal(user.balance)}` }</p>
    </div>
  );
}

export default Balance;
