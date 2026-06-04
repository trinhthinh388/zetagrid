import { Header, IGridModule, RowData } from '@models';
import { createLogger } from '../../utils';

declare module '@models' {
  interface GridApi<TData extends RowData = RowData> {
    getVisibleHeaders: () => Header[];
  }
}

export const VirtualizedModule = <TData extends RowData = RowData>() => {
  const logger = createLogger('VirtualizedModule');

  return {
    _name: 'Virtualized',
  } satisfies IGridModule<TData>;
};
