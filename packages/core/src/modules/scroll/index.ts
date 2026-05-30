import { IGridModule, ZetaGridInstance } from '@models';
import { MIN_SCROLLBAR_THUMB_SIZE } from '../../constants';
import { createLogger } from '../../utils';

export const ScrollModule = <TData>() => {
  const logger = createLogger('ScrollModule');

  const calculateScrollThumbSize = (grid: ZetaGridInstance<TData>) => {
    const { rect, scrollState } = grid.state;
    const verticalTrackSize = rect.containerHeight;
    const horizontalTrackSize = rect.containerWidth;
    const horizontalThumbSize = horizontalTrackSize * (rect.containerWidth / rect.headerWidth);
    const verticalThumbSize = verticalTrackSize * (rect.containerHeight / rect.bodyHeight);

    scrollState.thumb.horizontal.size = Math.max(horizontalThumbSize, MIN_SCROLLBAR_THUMB_SIZE);
    scrollState.thumb.vertical.size = Math.max(verticalThumbSize, MIN_SCROLLBAR_THUMB_SIZE);
  };

  return {
    _name: 'Scroll',
    mount: (grid: ZetaGridInstance<TData>) => {
      calculateScrollThumbSize(grid);
    },
  } satisfies IGridModule<TData>;
};
