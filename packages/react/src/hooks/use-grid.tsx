import { createGrid, type CreateZetaGridParams } from '@core';
import { ZetaGridInstance, ZetaGridState } from '@models';
import { createContext, PropsWithChildren, useContext, useLayoutEffect, useState } from 'react';
import { useSnapshot } from 'valtio';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GridContext = createContext<ZetaGridInstance<any> | undefined>(undefined);

export type GridProviderProps<TData> = PropsWithChildren<CreateZetaGridParams<TData>> & {
  root: HTMLDivElement | null;
};

export const GridProvider = <TData,>({ children, root, ...params }: GridProviderProps<TData>) => {
  const [grid] = useState(() => createGrid<TData>(params));
  const state = useSnapshot(grid.state);

  useLayoutEffect(() => {
    if (!root) return;

    grid.init(root);

    grid.mount();

    return () => grid.unmount();
  }, [grid, root]);

  return (
    <GridContext.Provider value={{ ...grid, state: state as ZetaGridState<TData> }}>
      {children}
    </GridContext.Provider>
  );
};

export const useGrid = <TData = unknown,>() => {
  const grid = useContext(GridContext) as ZetaGridInstance<TData>;

  if (!grid) {
    throw new Error('useGrid must be used within GridProvider');
  }

  return grid;
};
