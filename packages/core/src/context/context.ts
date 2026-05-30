import { ZetaGridContext } from '@models';

export const createContext = <TData>({
  root = null,
  width = 500,
  height = 500,
  modules = [],
  columnDefs = [],
  ...initial
}: Partial<ZetaGridContext<TData>> = {}): ZetaGridContext<TData> => {
  return {
    ...initial,
    root,
    width,
    height,
    modules,
    columnDefs,
  };
};
