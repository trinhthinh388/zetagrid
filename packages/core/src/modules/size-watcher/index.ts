import { IGridModule, RowData, ZetaGridInstance } from '@models';
import { createLogger } from '../../utils';
import { pxToNumber } from '../../utils/px-to-number';

export const SizeWatcherModule = <TData extends RowData = RowData>() => {
  const logger = createLogger('SizeWatcherModule');

  const watchRootSize = (grid: ZetaGridInstance<TData>) => {
    if (!grid.state.elements.root) return;
    const { width, height, borderWidth } = window.getComputedStyle(grid.state.elements.root);
    grid.state.rect.containerWidth = pxToNumber(width) - 2 * pxToNumber(borderWidth);
    grid.state.rect.containerHeight = pxToNumber(height) - 2 * pxToNumber(borderWidth);
  };

  const watchHeaderSize = (grid: ZetaGridInstance<TData>) => {
    const headers = grid.getHeaders();
    const headerHeight = Math.max(...headers.map((it) => it.height));
    const headerWidth = headers.reduce((sum, header) => sum + header.width, 0);
    grid.state.rect.headerHeight = headerHeight;
    grid.state.rect.headerWidth = headerWidth;
  };

  return {
    _name: 'SizeWatcher',
    mount: (grid: ZetaGridInstance<TData>) => {
      watchRootSize(grid);
      watchHeaderSize(grid);
    },
  } satisfies IGridModule<TData>;
};
