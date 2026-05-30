import { Header, ZetaGridInstance } from '@models';
import { PropsWithChildren } from 'react';

export type ZetaElementAttributes = PropsWithChildren<{
  [key: string]: string | undefined | Record<string, string | number>;
  className: string;
  'data-slot': string;
  role: string;
  style?: Record<string, string | number>;
}>;

export const contructElementAttributes = {
  root: () =>
    ({
      className: 'zeta-grid__root',
      'data-slot': 'zeta-grid-root',
      role: 'grid',
    }) satisfies ZetaElementAttributes,
  wrapper: ({ width, height }: ZetaGridInstance) =>
    ({
      className: 'zeta-grid__wrapper',
      'data-slot': 'zeta-grid-wrapper',
      role: 'grid',
      style: { width, height },
    }) satisfies ZetaElementAttributes,
  header: (totalHeight: number) =>
    ({
      className: 'zeta-grid__header',
      'data-slot': 'header',
      role: 'presentation',
      style: { height: totalHeight },
    }) satisfies ZetaElementAttributes,
  headerCell: ({ id = '', width, height, left, top }: Header) =>
    ({
      'data-header-cell-id': id,
      className: 'zeta-grid__header-cell',
      'data-slot': 'header-cell',
      role: 'presentation',
      style: {
        width,
        height,
        left,
        top,
      },
    }) satisfies ZetaElementAttributes,
  headerTitle: () =>
    ({
      className: 'zeta-grid__header-title',
      'data-slot': 'header-title',
      role: 'presentation',
    }) satisfies ZetaElementAttributes,
} as const;
