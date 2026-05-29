import { ZetaGridContext } from '@models';

export const createContext = <TData>(
  initial: Partial<ZetaGridContext<TData>> = {},
): ZetaGridContext<TData> => {
  return {
    height: 500,
    width: 500,
    modules: [],
    columnDefs: [],
    ...initial,
  };
};
