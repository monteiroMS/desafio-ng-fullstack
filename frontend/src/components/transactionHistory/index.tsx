import React, { useEffect, useState } from 'react';
import ITransaction from '../../interfaces/ITransactions';
import requestTransactions from '../../utils/api/requestTransactions';
import { getUserFromLS } from '../../utils/localStorage';
import Error from '../error';
import TableLine from '../tableLine';

function TransactionHistory() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setReload(false);
    const getTransactions = async () => {
      const user = getUserFromLS();
      const data = await requestTransactions(user.username, user.token);
      if (data.message) {
        setError(data.message);
      } else if (!data.cashIn.length && !data.cashOut.length) {
        setError('Você ainda não participou de nenhuma transação :c');
      } else {
        setTransactions([...data.cashIn, ...data.cashOut]);
      }
    };
    getTransactions();
  }, [reload]);

  return (
    <div>
      <h2>Minhas transações</h2>
      <button
        type="button"
        onClick={ () => setReload(true) }
      >
        Atualizar
      </button>
      { error && <Error message={ error } /> }
      { !error && (
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Usuário</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {
              transactions.map((transaction, index) => (
                <TableLine
                  key={ index }
                  transaction={ transaction }
                />
              ))
            }
          </tbody>
        </table>
      ) }
    </div>
  );
}

export default TransactionHistory;
