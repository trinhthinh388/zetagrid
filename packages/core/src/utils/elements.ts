import { Header, ZetaElementAttributes, ZetaGridInstance } from '@models';
import { DEFAULT_CELL_HEIGHT } from '../constants';

const headerConstructors = {
  header: (grid: ZetaGridInstance) =>
    ({
      className: 'zeta-grid__header zeta-grid-no-scrollbar',
      'data-slot': 'header',
      role: 'presentation',
      style: { width: grid.state.rect.containerWidth, height: grid.state.rect.headerHeight },
    }) satisfies ZetaElementAttributes,
  headerContainer: (grid: ZetaGridInstance) =>
    ({
      className: 'zeta-grid__header-container',
      'data-slot': 'header-container',
      role: 'presentation',
      style: { width: grid.state.rect.headerWidth, height: grid.state.rect.headerHeight },
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
  headerGroupContainer: () =>
    ({
      className: 'zeta-grid__header-group-container',
      'data-slot': 'header-group-container',
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

const gridConstructors = {
  root: () =>
    ({
      className: 'zeta-grid__root',
      'data-slot': 'zeta-grid-root',
      role: 'grid',
    }) satisfies ZetaElementAttributes,
  container: (grid: ZetaGridInstance) =>
    ({
      className: 'zeta-grid__container',
      'data-slot': 'zeta-grid-container',
      role: 'grid',
      style: { width: grid.state.rect.containerWidth, height: grid.state.rect.containerHeight },
    }) satisfies ZetaElementAttributes,
};

const bodyConstructors = {
  body: (grid: ZetaGridInstance) =>
    ({
      className: 'zeta-grid__body zeta-grid-no-scrollbar',
      'data-slot': 'body',
      role: 'presentation',
      style: {
        height: grid.state.rect.bodyHeight,
        width: grid.state.rect.containerWidth,
      },
    }) satisfies ZetaElementAttributes,
  bodyContainer: (grid: ZetaGridInstance) =>
    ({
      className: 'zeta-grid__body-container',
      'data-slot': 'body-container',
      role: 'presentation',
      style: {
        height: grid.state.rect.bodyHeight,
        width: grid.state.rect.bodyWidth,
      },
    }) satisfies ZetaElementAttributes,
} as const;

export const contructElementAttributes = {
  ...gridConstructors,
  ...bodyConstructors,
  ...headerConstructors,
} as const;
