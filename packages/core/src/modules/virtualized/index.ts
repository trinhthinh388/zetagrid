import { IGridModule, ZetaGridInstance } from '@models';
import { createLogger } from '../../utils';

export const VirtualizedModule = <TData>() => {
  const logger = createLogger('VirtualizedModule');

  return {
    _name: 'Virtualized',
    mount: (grid: ZetaGridInstance<TData>) => {},
  } satisfies IGridModule<TData>;
};
