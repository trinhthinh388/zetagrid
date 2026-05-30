import { IGridModule, ZetaGridInstance } from '@models';
import { createLogger } from '../../utils';

export const VirtualizedModule = <TData>() => {
  const logger = createLogger('VirtualizedModule');

  const watchRootSize = (grid: ZetaGridInstance<TData>) => {
    if (!grid.state.root || !grid.state.root.element) return;
    const { width, height } = grid.state.root.element.getBoundingClientRect();
    grid.state.rect.containerWidth = width;
    grid.state.rect.containerHeight = height;
  };

  const watchHeaderSize = (grid: ZetaGridInstance<TData>) => {
    const headers = grid.getHeaders();
    const headerHeight = Math.max(...headers.map((it) => it.height));
    const headerWidth = headers.reduce((sum, header) => sum + header.width, 0);
    grid.state.rect.headerHeight = headerHeight;
    grid.state.rect.headerWidth = headerWidth;
  };

  return {
    _name: 'virtualized',
    mount: (grid: ZetaGridInstance<TData>) => {
      watchRootSize(grid);
      watchHeaderSize(grid);
    },
  } satisfies IGridModule<TData>;
};
