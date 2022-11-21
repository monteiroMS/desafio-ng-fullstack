import React, { useContext, useEffect, useState } from 'react';
import { FiltersContext } from '../../context/filtersProvider';
import { UserContext } from '../../context/userProvider';
import ITransaction from '../../interfaces/ITransactions';
import requestTransactions from '../../utils/api/requestTransactions';
import getDate from '../../utils/getDate';
import { getUserFromLS } from '../../utils/localStorage';
import Error from '../error';
import TableLine from '../tableLine';
import TransactionTypeSelector from '../transactionTypeSelector';

function TransactionHistory() {
  const { dateFilter, setDateFilter, typeFilter } = useContext(FiltersContext);
  const { user } = useContext(UserContext);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<ITransaction[]>([]);
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
        setFilteredTransactions([...data.cashIn, ...data.cashOut]);
      }
    };
    getTransactions();
  }, [reload]);

  const filter = () => {
    if (dateFilter) {
      setFilteredTransactions(transactions.filter((transaction) => (
        getDate(transaction.createdAt) === dateFilter
      )));
    } else if (typeFilter === 'cash-in') {
      setFilteredTransactions(transactions.filter((transaction) => (
        transaction.creditedAccountId === user.accountId
      )));
    } else if (typeFilter === 'cash-out') {
      setFilteredTransactions(transactions.filter((transaction) => (
        transaction.debitedAccountId === user.accountId
      )));
    } else {
      setFilteredTransactions([ ...transactions ]);
    }
  };

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
        <div>
          <TransactionTypeSelector />
          <input
            type="text"
            onChange={ ({ target: { value } }) => setDateFilter(value) }
            placeholder="DD/MM/AAAA"
          />
          <button
            type="button"
            onClick={ filter }
          >Aplicar filtros</button>
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
                filteredTransactions.map((transaction, index) => (
                  <TableLine
                    key={ index }
                    transaction={ transaction }
                  />
                ))
              }
            </tbody>
          </table>
        </div>
      ) }
    </div>
  );
}

export default TransactionHistory;
