import { ZetaGridContext } from '@models';

export const createContext = <TData>(
  initial: Partial<ZetaGridContext<TData>> = {},
): ZetaGridContext<TData> => {
  return {
    root: undefined,
    columnDefs: [],
    ...initial,
  };
};
