import { Header, HeaderGroup } from '@models';
import { PropsWithChildren } from 'react';

export type ZetaElementAttributes = PropsWithChildren<{
  [key: string]: string | undefined | Record<string, string>;
  className: string;
  'data-slot': string;
  role: string;
  style?: Record<string, string>;
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
  headerRow: ({ id }: HeaderGroup) =>
    ({
      role: 'presentation',
      'data-header-row-id': id,
      className: 'zeta-grid__header-row',
      'data-slot': 'header-row',
      style: { display: 'contents' },
    }) satisfies ZetaElementAttributes,
  headerCell: ({ id = '', colSpan = 1, rowSpan = 1 }: Header) =>
    ({
      'data-header-cell-id': id,
      className: 'zeta-grid__header-cell',
      'data-slot': 'header-cell',
      role: 'presentation',
      style: {
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
      },
    }) satisfies ZetaElementAttributes,
  headerTitle: () =>
    ({
      className: 'zeta-grid__header-title',
      'data-slot': 'header-title',
      role: 'presentation',
    }) satisfies ZetaElementAttributes,
} as const;
