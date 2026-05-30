import { constructElementAttributes } from '@core';
import { useGrid } from '../hooks/use-grid';

export const Scrollbar = ({ orientation }: { orientation: 'vertical' | 'horizontal' }) => {
  const grid = useGrid();

  const { size } = grid.state.scrollState.thumb[orientation];

  if (size === Infinity) return null;

  return (
    <div {...constructElementAttributes.scrollbarTrack(grid, orientation)}>
      <div {...constructElementAttributes.scrollbarThumb(grid, orientation)} />
    </div>
  );
};
