import { constructElementAttributes } from '@core';
import { useRef } from 'react';
import { useGrid } from '../hooks/use-grid';

export const Scrollbar = ({ orientation }: { orientation: 'vertical' | 'horizontal' }) => {
  const grid = useGrid();
  const trackRef = useRef<HTMLDivElement | null>(null);

  const { size } = grid.state.scrollState.thumb[orientation];

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const { body } = grid.state.elements;
    if (!body) return;

    const isHorizontal = orientation === 'horizontal';
    const startMousePos = isHorizontal ? e.clientX : e.clientY;
    const startScrollPos = isHorizontal ? body.scrollLeft : body.scrollTop;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const currentMousePos = isHorizontal ? moveEvent.clientX : moveEvent.clientY;
      const delta = currentMousePos - startMousePos;

      const trackSize = isHorizontal
        ? grid.state.rect.containerWidth
        : grid.state.rect.containerHeight;
      const scrollSize = isHorizontal ? body.scrollWidth : body.scrollHeight;
      const clientSize = isHorizontal ? body.clientWidth : body.clientHeight;

      const maxScroll = scrollSize - clientSize;
      const maxOffset = trackSize - size;

      if (maxOffset <= 0) return;

      const scrollDelta = delta * (maxScroll / maxOffset);
      const newScrollPos = Math.max(0, Math.min(startScrollPos + scrollDelta, maxScroll));

      if (isHorizontal) {
        body.scrollLeft = newScrollPos;
      } else {
        body.scrollTop = newScrollPos;
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('[data-slot="scrollbar-thumb"]')) {
      return;
    }

    const track = trackRef.current;
    const body = grid.state.elements.body;
    if (!track || !body) return;

    const rect = track.getBoundingClientRect();
    const isHorizontal = orientation === 'horizontal';

    const clickPos = isHorizontal ? e.clientX - rect.left : e.clientY - rect.top;
    const trackSize = isHorizontal ? rect.width : rect.height;
    const scrollSize = isHorizontal ? body.scrollWidth : body.scrollHeight;
    const clientSize = isHorizontal ? body.clientWidth : body.clientHeight;

    const maxScroll = scrollSize - clientSize;
    const maxOffset = trackSize - size;

    if (maxOffset <= 0) return;

    const targetOffset = Math.max(0, Math.min(clickPos - size / 2, maxOffset));
    const targetScroll = (targetOffset / maxOffset) * maxScroll;

    if (isHorizontal) {
      body.scrollLeft = targetScroll;
    } else {
      body.scrollTop = targetScroll;
    }
  };

  return (
    <div
      ref={trackRef}
      onMouseDown={handleTrackClick}
      {...constructElementAttributes.scrollbarTrack(grid, orientation)}
    >
      <div
        onMouseDown={handleMouseDown}
        {...constructElementAttributes.scrollbarThumb(grid, orientation)}
      />
    </div>
  );
};
