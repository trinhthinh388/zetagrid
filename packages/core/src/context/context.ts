import { RowData, ZetaGridContext } from '@models';

export const createContext = <TData extends RowData>({
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
