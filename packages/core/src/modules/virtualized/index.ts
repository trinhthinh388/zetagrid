import { ZetaGridInstance } from '@models';
import { createLogger } from '../../utils';

const logger = createLogger('VirtualizedModule');

export const VirtualizedModule = {
  _name: 'virtualized',
  init: (grid: ZetaGridInstance) => {
    logger.info('VirtualizedModule initialized');
    if (!grid.state.root || !grid.state.root.element) return;
    const { width, height } = grid.state.root.element.getBoundingClientRect();
    grid.setState('width', width);
    grid.setState('height', height);
  },
};
