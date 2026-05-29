import { ZetaGridContext } from '@models';

export const createContext = <TData>(
  initial: Partial<ZetaGridContext<TData>> = {},
): ZetaGridContext<TData> => {
  return {
    height: 500,
    width: 500,
    modules: [],
    columnDefs: [],
    root: undefined,
    renderer: {
      cellRenderer: () => null,
      headerRenderer: () => null,
    },
    ...initial,
  };
};
