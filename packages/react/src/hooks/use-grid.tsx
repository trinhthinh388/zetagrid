import { createGrid, type CreateZetaGridParams } from '@core';
import { ZetaGridInstance } from '@models';
import { createContext, PropsWithChildren, useContext, useLayoutEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GridContext = createContext<ZetaGridInstance<any> | undefined>(undefined);

export type GridProviderProps<TData> = PropsWithChildren<CreateZetaGridParams<TData>>;

export const GridProvider = <TData,>({ children, root, ...params }: GridProviderProps<TData>) => {
  const [grid] = useState(() => createGrid<TData>(params));

  useLayoutEffect(() => {
    if (!root) return;
    grid.setContext({ root });
    grid.init();
    return () => grid.unmount();
  }, [grid, root]);

  return <GridContext.Provider value={grid}>{children}</GridContext.Provider>;
};

export const useGrid = () => {
  const grid = useContext(GridContext);

  if (!grid) {
    throw new Error('useGrid must be used within GridProvider');
  }

  return grid;
};
