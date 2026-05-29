import { PropsWithChildren } from 'react';

type ZetaElementAttributes = PropsWithChildren<{
  className: string;
  'data-slot': string;
  role: string;
}>;

export const contructElementAttributes: Record<string, () => ZetaElementAttributes> = {
  root: () => ({
    className: 'zeta-grid__root',
    'data-slot': 'zeta-grid-root',
    role: 'grid',
  }),
  header: () => ({
    className: 'zeta-grid__header',
    'data-slot': 'header',
    role: 'presentation',
  }),
};
