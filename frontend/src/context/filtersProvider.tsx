import React, { useMemo, useState, createContext } from 'react';
import IReactChildren from '../interfaces/IReactChildren';

type FiltersContextType = {
  dateFilter: string,
  setDateFilter: (newState: string) => void,
  typeFilter: string,
  setTypeFilter: (newState: string) => void,
}

const INITIAL_VALUE = {
  dateFilter: '',
  setDateFilter: () => {},
  typeFilter: '',
  setTypeFilter: () => {},
};

export const FiltersContext = createContext<FiltersContextType>(INITIAL_VALUE);

const FiltersProvider = ({ children }: IReactChildren) => {
  const [dateFilter, setDateFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
''
  const context = useMemo(() => ({
    dateFilter,
    setDateFilter,
    typeFilter,
    setTypeFilter,
  }), [dateFilter, typeFilter]);

  return (
    <FiltersContext.Provider value={ context }>
      { children }
    </FiltersContext.Provider>
  )
};

export default FiltersProvider;
