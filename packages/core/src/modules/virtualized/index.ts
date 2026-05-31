import { IGridModule, RowData, ZetaGridInstance } from '@models';
import { createLogger } from '../../utils';

export const VirtualizedModule = <TData extends RowData = RowData>() => {
  const logger = createLogger('VirtualizedModule');

  return {
    _name: 'Virtualized',
    mount: (grid: ZetaGridInstance<TData>) => {},
  } satisfies IGridModule<TData>;
};
