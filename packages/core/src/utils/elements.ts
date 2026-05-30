import { Header, ZetaElementAttributes, ZetaGridInstance } from '@models';
import { DEFAULT_CELL_HEIGHT } from '../constants';

export const contructElementAttributes = {
  root: () =>
    ({
      className: 'zeta-grid__root',
      'data-slot': 'zeta-grid-root',
      role: 'grid',
    }) satisfies ZetaElementAttributes,
  wrapper: (grid: ZetaGridInstance) =>
    ({
      className: 'zeta-grid__wrapper',
      'data-slot': 'zeta-grid-wrapper',
      role: 'grid',
      style: { width: grid.state.width, height: grid.state.height },
    }) satisfies ZetaElementAttributes,
  header: (grid: ZetaGridInstance) =>
    ({
      className: 'zeta-grid__header zeta-grid-no-scrollbar',
      'data-slot': 'header',
      role: 'presentation',
      style: { width: grid.state.width, height: grid.state.totalHeaderHeight },
    }) satisfies ZetaElementAttributes,
  headerWrapper: (grid: ZetaGridInstance) =>
    ({
      className: 'zeta-grid__header-wrapper',
      'data-slot': 'header-wrapper',
      role: 'presentation',
      style: { width: grid.state.totalHeaderWidth, height: grid.state.totalHeaderHeight },
    }) satisfies ZetaElementAttributes,
  headerGroup: (header: Header) =>
    ({
      'data-cell-id': header.id,
      className: 'zeta-grid__header-group',
      'data-slot': 'header-group',
      role: 'presentation',
      style: {
        width: header.width,
        height: header.height,
      },
    }) satisfies ZetaElementAttributes,
  headerGroupWrapper: () =>
    ({
      className: 'zeta-grid__header-group-wrapper',
      'data-slot': 'header-group-wrapper',
      role: 'presentation',
    }) satisfies ZetaElementAttributes,
  headerCell: (header: Header) =>
    ({
      'data-cell-id': header.id,
      className: 'zeta-grid__header-cell',
      'data-slot': 'header-cell',
      role: 'presentation',
      style: {
        width: header.width,
        height: header.isGroup ? DEFAULT_CELL_HEIGHT : header.height,
      },
    }) satisfies ZetaElementAttributes,
  headerTitle: () =>
    ({
      className: 'zeta-grid__header-title',
      'data-slot': 'header-title',
      role: 'presentation',
    }) satisfies ZetaElementAttributes,
} as const;
