import React, { useContext } from 'react';
import { UserContext } from '../../context/userProvider';
import ITransaction from '../../interfaces/ITransactions';
import formatToReal from '../../utils/formatToReal';
import getDate from '../../utils/getDate';

function TableLine({ transaction }: { transaction: ITransaction }) {
  const { user } = useContext(UserContext);

  // se a conta creditada é a mesma conta do usuario, entao foi um cash-in
  const type = transaction.creditedAccountId === user.accountId
    ? 'debitedFrom'
    : 'creditedIn';

  return (
    <tr>
      <td>{ getDate(transaction.createdAt) }</td>
      <td>{ transaction[type].user.username }</td>
      <td>
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
