import { createGrid, type CreateZetaGridParams } from '@core';
import { ZetaGridInstance } from '@models';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

const GridContext = createContext<ZetaGridInstance | undefined>(undefined);

export const GridProvider = <TData,>({
  children,
  ...params
}: PropsWithChildren<CreateZetaGridParams<TData>>) => {
  const [grid] = useState(() => createGrid(params));

  return <GridContext.Provider value={grid}>{children}</GridContext.Provider>;
};

export const useGrid = () => {
  const grid = useContext(GridContext);

  if (!grid) {
    throw new Error('useGrid must be used within GridProvider');
  }

  return grid;
};
