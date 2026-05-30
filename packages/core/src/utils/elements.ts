import { Header, ZetaElementAttributes, ZetaGridInstance } from '@models';

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
  header: (totalHeight: number) =>
    ({
      className: 'zeta-grid__header',
      'data-slot': 'header',
      role: 'presentation',
      style: { height: totalHeight },
    }) satisfies ZetaElementAttributes,
  headerCell: (header: Header) =>
    ({
      'data-header-cell-id': header.id,
      className: 'zeta-grid__header-cell',
      'data-slot': 'header-cell',
      role: 'presentation',
      style: {
        width: header.width,
        height: header.height,
        left: header.left,
        top: header.top,
      },
    }) satisfies ZetaElementAttributes,
  headerTitle: () =>
    ({
      className: 'zeta-grid__header-title',
      'data-slot': 'header-title',
      role: 'presentation',
    }) satisfies ZetaElementAttributes,
} as const;
