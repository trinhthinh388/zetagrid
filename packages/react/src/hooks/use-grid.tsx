import { createGrid, type CreateZetaGridParams } from '@core';
import { RowData, Zeta } from '@models';
import { createContext, PropsWithChildren, useContext, useLayoutEffect, useState } from 'react';
import { useSnapshot } from 'valtio';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GridContext = createContext<Zeta.GridInstance<any> | undefined>(undefined);

export type GridProviderProps<TData extends RowData> = PropsWithChildren<
  CreateZetaGridParams<TData>
> & {
  root: HTMLDivElement | null;
};

export const GridProvider = <TData extends RowData>({
  children,
  root,
  ...params
}: GridProviderProps<TData>) => {
  const [grid] = useState(() => createGrid<TData>(params));
  const state = useSnapshot(grid.state);

  useLayoutEffect(() => {
    if (!root) return;

    grid.api.init(root);

    grid.api.mount();

    return () => grid.api.unmount();
  }, [grid, root]);

  return (
    <GridContext.Provider value={{ ...grid, state: state as Zeta.GridState<TData> }}>
      {children}
    </GridContext.Provider>
  );
};

export const useGrid = <TData extends RowData = RowData>() => {
  const grid = useContext(GridContext) as Zeta.GridInstance<TData>;

  if (!grid) {
    throw new Error('useGrid must be used within GridProvider');
  }

  return grid;
};
