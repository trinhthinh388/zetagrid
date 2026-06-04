import { ElementAttributes, GridInstance, Header } from '@models';
import { DATA_SLOTS, DEFAULT_CELL_HEIGHT } from '../constants';

const headerConstructors = {
  header: (grid: GridInstance) =>
    ({
      className: 'zeta-grid__header zeta-grid-no-scrollbar',
      'data-slot': DATA_SLOTS.HEADER,
      role: 'presentation',
      style: { width: grid.state.rect.containerWidth, height: grid.state.rect.headerHeight },
    }) satisfies ElementAttributes,
  headerContainer: (grid: GridInstance) =>
    ({
      className: 'zeta-grid__header-container',
      'data-slot': DATA_SLOTS.HEADER_CONTAINER,
      role: 'presentation',
      style: { width: grid.api.getTotalWidth(), height: grid.state.rect.headerHeight },
    }) satisfies ElementAttributes,
  headerGroup: (header: Header) =>
    ({
      'data-cell-id': header.id,
      className: 'zeta-grid__header-group',
      'data-slot': 'header-group',
      role: 'presentation',
      style: {
        width: header.rect.width,
        height: header.height,
      },
    }) satisfies ElementAttributes,
  headerGroupContainer: () =>
    ({
      className: 'zeta-grid__header-group-container',
      'data-slot': 'header-group-container',
      role: 'presentation',
    }) satisfies ElementAttributes,
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
    }) satisfies ElementAttributes,
  headerTitle: () =>
    ({
      className: 'zeta-grid__header-title',
      'data-slot': 'header-title',
      role: 'presentation',
    }) satisfies ElementAttributes,
} as const;

const gridConstructors = {
  root: () =>
    ({
      className: 'zeta-grid__root',
      'data-slot': 'zeta-grid-root',
      role: 'grid',
    }) satisfies ElementAttributes,
  container: (grid: GridInstance) =>
    ({
      className: 'zeta-grid__container',
      'data-slot': 'zeta-grid-container',
      role: 'grid',
      style: { width: grid.state.rect.containerWidth, height: grid.state.rect.containerHeight },
    }) satisfies ElementAttributes,
};

const bodyConstructors = {
  body: (grid: GridInstance) =>
    ({
      className: 'zeta-grid__body zeta-grid-no-scrollbar',
      'data-slot': DATA_SLOTS.BODY,
      role: 'presentation',
      style: {
        height: grid.state.rect.bodyHeight,
        width: grid.state.rect.containerWidth,
        minHeight: grid.state.rect.containerHeight - grid.state.rect.headerHeight,
      },
    }) satisfies ElementAttributes,
  bodyContainer: (grid: GridInstance) =>
    ({
      className: 'zeta-grid__body-container',
      'data-slot': DATA_SLOTS.BODY_CONTAINER,
      role: 'presentation',
      style: {
        width: grid.getTotalWidth(),
        height: grid.state.rect.bodyHeight,
      },
    }) satisfies ElementAttributes,
} as const;

const scrollbarConstructors = {
  scrollbarTrack: (grid: GridInstance, orientation: 'horizontal' | 'vertical') =>
    ({
      className: `zeta-grid__scrollbar-track zeta-grid__scrollbar-track--${orientation}`,
      'aria-orientation': orientation,
      'data-slot': DATA_SLOTS.SCROLLBAR_TRACK,
      role: 'scrollbar',
      style: { display: grid.state.scrollState.thumb[orientation].size ? 'block' : 'none' },
    }) satisfies ElementAttributes,
  scrollbarThumb: (grid: GridInstance, orientation: 'horizontal' | 'vertical') =>
    ({
      className: 'zeta-grid__scrollbar-thumb',
      'data-slot': DATA_SLOTS.SCROLLBAR_THUMB,
      role: 'presentation',
      style: {
        [orientation === 'horizontal' ? 'width' : 'height']:
          grid.state.scrollState.thumb[orientation].size,
        transform:
          orientation === 'horizontal'
            ? `translate3d(${grid.state.scrollState.thumb.horizontal.offset}px, 0px, 0px)`
            : `translate3d(0px, ${grid.state.scrollState.thumb.vertical.offset}px, 0px)`,
      },
    }) satisfies ElementAttributes,
} as const;

export const constructElementAttributes = {
  ...gridConstructors,
  ...bodyConstructors,
  ...headerConstructors,
  ...scrollbarConstructors,
} as const;
