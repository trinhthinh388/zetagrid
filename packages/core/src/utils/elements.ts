import { Header, ZetaElementAttributes, ZetaGridInstance } from '@models';
import { DATA_SLOTS, DEFAULT_CELL_HEIGHT } from '../constants';

const headerConstructors = {
  header: (grid: ZetaGridInstance) =>
    ({
      className: 'zeta-grid__header zeta-grid-no-scrollbar',
      'data-slot': DATA_SLOTS.HEADER,
      role: 'presentation',
      style: { width: grid.state.rect.containerWidth, height: grid.state.rect.headerHeight },
    }) satisfies ZetaElementAttributes,
  headerContainer: (grid: ZetaGridInstance) =>
    ({
      className: 'zeta-grid__header-container',
      'data-slot': DATA_SLOTS.HEADER_CONTAINER,
      role: 'presentation',
      style: { width: grid.getTotalWidth(), height: grid.state.rect.headerHeight },
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
      'data-slot': DATA_SLOTS.BODY,
      role: 'presentation',
      style: {
        height: grid.state.rect.bodyHeight,
        width: grid.state.rect.containerWidth,
        minHeight: grid.state.rect.containerHeight - grid.state.rect.headerHeight,
      },
    }) satisfies ZetaElementAttributes,
  bodyContainer: (grid: ZetaGridInstance) =>
    ({
      className: 'zeta-grid__body-container',
      'data-slot': DATA_SLOTS.BODY_CONTAINER,
      role: 'presentation',
      style: {
        width: grid.getTotalWidth(),
        height: grid.state.rect.bodyHeight,
      },
    }) satisfies ZetaElementAttributes,
} as const;

const scrollbarConstructors = {
  scrollbarTrack: (grid: ZetaGridInstance, orientation: 'horizontal' | 'vertical') =>
    ({
      className: `zeta-grid__scrollbar-track zeta-grid__scrollbar-track--${orientation}`,
      'aria-orientation': orientation,
      'data-slot': 'scrollbar-track',
      role: 'scrollbar',
    }) satisfies ZetaElementAttributes,
  scrollbarThumb: (grid: ZetaGridInstance, orientation: 'horizontal' | 'vertical') =>
    ({
      className: 'zeta-grid__scrollbar-thumb',
      'data-slot': 'scrollbar-thumb',
      role: 'presentation',
      style: {
        [orientation === 'horizontal' ? 'width' : 'height']:
          grid.state.scrollState.thumb[orientation].size,
      },
    }) satisfies ZetaElementAttributes,
} as const;

export const constructElementAttributes = {
  ...gridConstructors,
  ...bodyConstructors,
  ...headerConstructors,
  ...scrollbarConstructors,
} as const;
