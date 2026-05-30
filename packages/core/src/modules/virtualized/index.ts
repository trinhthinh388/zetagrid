import { ZetaGridInstance } from '@models';
import { createLogger } from '../../utils';

const logger = createLogger('VirtualizedModule');

export const VirtualizedModule = {
  _name: 'virtualized',
  init: (grid: ZetaGridInstance) => {
    logger.info('VirtualizedModule initialized');
    if (!grid.context.root) return;
    const { width, height } = grid.context.root.getBoundingClientRect();
    grid.context.width = width;
    grid.context.height = height;
  },
};
