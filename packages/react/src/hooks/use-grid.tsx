import { createGrid, type CreateZetaGridParams } from '@core';
import { ZetaGridInstance } from '@models';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GridContext = createContext<ZetaGridInstance<any> | undefined>(undefined);

export const GridProvider = <TData,>({
  children,
  ...params
}: PropsWithChildren<CreateZetaGridParams<TData>>) => {
  const [grid] = useState(() => createGrid<TData>(params));

  useEffect(() => {
    grid.init();
    return () => grid.destroy();
  }, [grid]);

  return <GridContext.Provider value={grid}>{children}</GridContext.Provider>;
};

export const useGrid = () => {
  const grid = useContext(GridContext);

  if (!grid) {
    throw new Error('useGrid must be used within GridProvider');
  }

  return grid;
};
