import { IGridModule, ZetaGridInstance } from '@models';
import { MIN_SCROLLBAR_THUMB_SIZE } from '../../constants';
import { createLogger } from '../../utils';

export const ScrollModule = <TData>() => {
  const logger = createLogger('ScrollModule');

  const cleanups: VoidFunction[] = [];

  const calculateScrollThumbSize = (grid: ZetaGridInstance<TData>) => {
    const { rect, scrollState } = grid.state;
    const verticalTrackSize = rect.containerHeight;
    const horizontalTrackSize = rect.containerWidth;
    const horizontalThumbSize = horizontalTrackSize * (rect.containerWidth / rect.headerWidth);
    const verticalThumbSize = verticalTrackSize * (rect.containerHeight / rect.bodyHeight);

    scrollState.thumb.horizontal.size = Math.max(horizontalThumbSize, MIN_SCROLLBAR_THUMB_SIZE);
    scrollState.thumb.vertical.size = Math.max(verticalThumbSize, MIN_SCROLLBAR_THUMB_SIZE);
  };

  const watchScroll = (grid: ZetaGridInstance<TData>) => {
    const { root, header, body } = grid.state.elements;
    if (!root || !header || !body) return;

    const onScroll = (e: Event) => {
      const source = e.target as HTMLElement;
      if (!source) {
        logger.debug('No scroll source found - skip scroll handling');
        return;
      }
      // Sync scroll position between Header and Body
      if (source === header) body.scroll({ top: source.scrollTop, left: source.scrollLeft });
      if (source === body) header.scroll({ top: source.scrollTop, left: source.scrollLeft });
    };
    root?.addEventListener('scroll', onScroll, {
      capture: true,
      passive: true,
    });
    cleanups.push(() => root?.removeEventListener('scroll', onScroll));
  };

  return {
    _name: 'Scroll',
    mount: (grid: ZetaGridInstance<TData>) => {
      calculateScrollThumbSize(grid);
      watchScroll(grid);
    },
    unmount: () => {
      cleanups.forEach((cleanup) => cleanup());
    },
  } satisfies IGridModule<TData>;
};
