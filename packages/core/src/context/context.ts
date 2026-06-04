import { GridContext, RowData } from '@models';
import { ScrollModule } from '../modules/scroll';
import { SizeWatcherModule } from '../modules/size-watcher';
import { VirtualizedModule } from '../modules/virtualized';

export const createContext = <TData extends RowData>({
  modules = [ScrollModule(), SizeWatcherModule(), VirtualizedModule()],
  columnDefs = [],
  ...initial
}: Partial<GridContext<TData>> = {}): GridContext<TData> => {
  return {
    ...initial,
    modules,
    columnDefs,
  };
};
