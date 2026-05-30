import { Header, ZetaElementAttributes, ZetaGridInstance } from '@models';

export const contructElementAttributes = {
  root: (grid: ZetaGridInstance) =>
    grid.applyElementAttributes('root', {
      className: 'zeta-grid__root',
      'data-slot': 'zeta-grid-root',
      role: 'grid',
    }) satisfies ZetaElementAttributes,
  wrapper: (grid: ZetaGridInstance) =>
    grid.applyElementAttributes('wrapper', {
      className: 'zeta-grid__wrapper',
      'data-slot': 'zeta-grid-wrapper',
      role: 'grid',
      style: { width: grid.width, height: grid.height },
    }) satisfies ZetaElementAttributes,
  header: (grid: ZetaGridInstance, totalHeight: number) =>
    grid.applyElementAttributes(
      'header',
      {
        className: 'zeta-grid__header',
        'data-slot': 'header',
        role: 'presentation',
        style: { height: totalHeight },
      },
      { totalHeight },
    ) satisfies ZetaElementAttributes,
  headerCell: (grid: ZetaGridInstance, header: Header) =>
    grid.applyElementAttributes(
      'headerCell',
      {
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
      },
      { header },
    ) satisfies ZetaElementAttributes,
  headerTitle: (grid: ZetaGridInstance) =>
    grid.applyElementAttributes('headerTitle', {
      className: 'zeta-grid__header-title',
      'data-slot': 'header-title',
      role: 'presentation',
    }) satisfies ZetaElementAttributes,
} as const;
