import React, { useContext } from 'react';
import { UserContext } from '../../context/userProvider';
import ITransaction from '../../interfaces/ITransactions';
import formatToReal from '../../utils/formatToReal';
import getDate from '../../utils/getDate';
import styles from './styles.module.css';

function TableLine({ transaction }: { transaction: ITransaction }) {
  const { user } = useContext(UserContext);

  const type = transaction.creditedAccountId === user.accountId
    ? 'debitedFrom'
    : 'creditedIn';

  return (
    <tr className={ styles.container }>
      <td>{ getDate(transaction.createdAt) }</td>
      <td>{ transaction[type].user.username }</td>
      <td
        className={ styles[type === 'debitedFrom' ? 'cash-in' : 'cash-out'] }
      >
        {
          type === 'debitedFrom'
            ? `+ ${formatToReal(Number(transaction.value))}`
            : `- ${formatToReal(Number(transaction.value))}`
        }
      </td>
    </tr>
  );
}

export default TableLine;
