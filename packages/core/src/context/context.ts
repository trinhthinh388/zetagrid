import { ZetaGridContext } from '@models';

export const createContext = <TData>({
  modules = [],
  columnDefs = [],
  ...initial
}: Partial<ZetaGridContext<TData>> = {}): ZetaGridContext<TData> => {
  return {
    ...initial,
    modules,
    columnDefs,
  };
};
