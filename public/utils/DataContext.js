// DataContext.js
import React, { createContext, useState } from 'react';

const DataContext = createContext();

export const DataContextProvider = ({ children, value }) => {
  const [dataSourceId, setDataSourceId] = useState(value.dataSourceId);

  return (
    <DataContext.Provider value={{ dataSourceId, setDataSourceId }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
