import { IGridModule, ZetaGridInstance } from '@models';
import { MIN_SCROLLBAR_THUMB_SIZE } from '../../constants';
import { createLogger } from '../../utils';

export const ScrollModule = <TData>() => {
  const logger = createLogger('ScrollModule');

  const cleanups: VoidFunction[] = [];

  const updateHorizontalScrollbar = (grid: ZetaGridInstance<TData>) => {
    const {
      scrollState,
      rect,
      elements: { header, body, root },
    } = grid.state;
    if (!root || !header || !body) return;

    const trackWidth = rect.containerWidth;
    const thumbSize = Math.max(
      trackWidth * (rect.containerWidth / grid.getTotalWidth()),
      MIN_SCROLLBAR_THUMB_SIZE,
    );
    const scrollWidth = body.scrollWidth;
    const clientWidth = body.clientWidth;
    const scrollLeft = body.scrollLeft;
    const maxScrollLeft = scrollWidth - clientWidth;
    const maxOffset = trackWidth - thumbSize;
    const offset = maxScrollLeft > 0 ? (scrollLeft / maxScrollLeft) * maxOffset : 0;

    scrollState.thumb.horizontal.size =
      rect.containerWidth === grid.getTotalWidth() ? 0 : thumbSize;
    scrollState.thumb.horizontal.offset = offset;
  };

  const updateVerticalScrollbar = (grid: ZetaGridInstance<TData>) => {
    const {
      scrollState,
      rect,
      elements: { header, body, root },
    } = grid.state;
    if (!root || !header || !body) return;

    const trackHeight = rect.containerHeight;
    const thumbSize = Math.max(
      trackHeight * (rect.containerHeight / grid.getTotalHeight()),
      MIN_SCROLLBAR_THUMB_SIZE,
    );
    const scrollHeight = body.scrollHeight;
    const clientHeight = body.clientHeight;
    const scrollTop = body.scrollTop;
    const maxScrollHeight = scrollHeight - clientHeight;
    const maxOffset = trackHeight - thumbSize;
    const offset = maxScrollHeight > 0 ? (scrollTop / maxScrollHeight) * maxOffset : 0;

    scrollState.thumb.vertical.size =
      rect.containerHeight === grid.getTotalHeight() ? 0 : thumbSize;
    scrollState.thumb.vertical.offset = offset;
  };

  const updateScrollbar = (grid: ZetaGridInstance<TData>) => {
    updateVerticalScrollbar(grid);
    updateHorizontalScrollbar(grid);
  };

  const trackScrollPosition = (grid: ZetaGridInstance<TData>) => {
    const { root, header, body } = grid.state.elements;
    if (!root || !header || !body) return;

    const onScroll = (e: Event) => {
      const source = e.target as HTMLElement;
      if (!source) {
        logger.debug('No scroll source found - skip scroll handling');
        return;
      }
      // Sync scroll position between Header and Body
      if (source === header) {
        body.scrollLeft = header.scrollLeft;
      } else if (source === body) {
        header.scrollLeft = body.scrollLeft;
      }
      updateScrollbar(grid);
    };

    root.addEventListener('scroll', onScroll, {
      capture: true,
      passive: true,
    });
    cleanups.push(() => root.removeEventListener('scroll', onScroll));
  };

  return {
    _name: 'Scroll',
    mount: (grid: ZetaGridInstance<TData>) => {
      updateScrollbar(grid);
      trackScrollPosition(grid);
    },
    unmount: () => {
      cleanups.forEach((cleanup) => cleanup());
    },
  } satisfies IGridModule<TData>;
};
