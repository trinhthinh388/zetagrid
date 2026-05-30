import { ZetaGridInstance } from '@models';
import { createLogger } from '../../utils';

const logger = createLogger('VirtualizedModule');

export const VirtualizedModule = {
  _name: 'virtualized',
  mount: (grid: ZetaGridInstance) => {
    if (!grid.state.root || !grid.state.root.element) return;
    const headers = grid.getHeaders();

    const { width, height } = grid.state.root.element.getBoundingClientRect();
    const totalHeaderHeight = Math.max(...headers.map((it) => it.height));
    const totalHeaderWidth = headers.reduce((sum, header) => sum + header.width, 0);

    grid.setState('width', width);
    grid.setState('height', height);
    grid.setState('totalHeaderHeight', totalHeaderHeight);
    grid.setState('totalHeaderWidth', totalHeaderWidth);
  },
};
