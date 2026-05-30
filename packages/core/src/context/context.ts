import { ZetaGridContext } from '@models';

export const createContext = <TData>({
  width = 500,
  height = 500,
  modules = [],
  columnDefs = [],
  ...initial
}: Partial<ZetaGridContext<TData>> = {}): ZetaGridContext<TData> => {
  return {
    ...initial,
    width,
    height,
    modules,
    columnDefs,
  };
};
