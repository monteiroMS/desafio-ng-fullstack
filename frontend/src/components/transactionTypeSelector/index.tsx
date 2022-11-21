import React, { ChangeEvent, useContext } from 'react';
import { FiltersContext } from '../../context/filtersProvider';

function TransactionTypeSelector() {
  const { typeFilter, setTypeFilter } = useContext(FiltersContext);

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(value);
  }

  return (
    <select
      value={ typeFilter }
      onChange={ handleChange }
    >
      <option value="" ></option>
      <option value="cash-in" >Cash-in</option>
      <option value="cash-out" >Cash-out</option>
    </select>
  );
}

export default TransactionTypeSelector;
