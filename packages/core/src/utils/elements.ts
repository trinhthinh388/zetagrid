import { PropsWithChildren } from 'react';

export type ZetaElementAttributes = PropsWithChildren<{
  [key: string]: string;
  className: string;
  'data-slot': string;
  role: string;
}>;

export const contructElementAttributes = {
  root: () =>
    ({
      className: 'zeta-grid__root',
      'data-slot': 'zeta-grid-root',
      role: 'grid',
    }) satisfies ZetaElementAttributes,
  header: () =>
    ({
      className: 'zeta-grid__header',
      'data-slot': 'header',
      role: 'presentation',
    }) satisfies ZetaElementAttributes,
  headerRow: ({ id = '' }) =>
    ({
      role: 'presentation',
      'data-header-row-id': id,
      className: 'zeta-grid__header-row',
      'data-slot': 'header-row',
    }) satisfies ZetaElementAttributes,
  headerCell: ({ id = '' }) =>
    ({
      'data-header-cell-id': id,
      className: 'zeta-grid__header-cell',
      'data-slot': 'header-cell',
      role: 'presentation',
    }) satisfies ZetaElementAttributes,
  headerTitle: () =>
    ({
      className: 'zeta-grid__header-title',
      'data-slot': 'header-title',
      role: 'presentation',
    }) satisfies ZetaElementAttributes,
} as const;
