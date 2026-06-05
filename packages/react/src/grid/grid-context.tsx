import { Grid as _Grid, RowData } from '@core';
import { createContext, useContext } from 'react';

const GridContext = createContext<_Grid | null>(null);

export const GridProvider = <TData extends RowData = RowData>({
  grid,
  children,
}: {
  grid: _Grid<TData>;
  children: React.ReactNode;
}) => {
  return <GridContext.Provider value={grid as unknown as _Grid}>{children}</GridContext.Provider>;
};

export const useGrid = <TData extends RowData = RowData>(): _Grid<TData> => {
  const grid = useContext(GridContext);
  if (!grid) {
    throw new Error('useGrid must be used within a GridProvider');
  }
  return grid as unknown as _Grid<TData>;
};
