import React, { ChangeEvent, useContext } from 'react';
import { FiltersContext } from '../../context/filtersProvider';
import styles from './styles.module.css';

function TransactionTypeSelector() {
  const { typeFilter, setTypeFilter } = useContext(FiltersContext);

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(value);
  }

  return (
    <label className={ styles.boxFilters }>
      Tipo
      <select
        value={ typeFilter }
        onChange={ handleChange }
        className={ styles.select }
      >
        <option value="" ></option>
        <option value="cash-in" >Cash-in</option>
        <option value="cash-out" >Cash-out</option>
      </select>
    </label>
  );
}

export default TransactionTypeSelector;
