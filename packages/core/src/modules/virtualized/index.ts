import { ZetaGridInstance } from '@models';
import { createLogger } from '../../utils';

const logger = createLogger('VirtualizedModule');

export const VirtualizedModule = {
  _name: 'virtualized',
  init: (grid: ZetaGridInstance) => {
    logger.info('VirtualizedModule initialized');
  },
};
