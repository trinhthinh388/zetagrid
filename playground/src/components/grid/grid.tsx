import { createGrid } from '@core';
import { useLayoutEffect, useRef } from 'react';

const grid = createGrid({});

export const Grid = () => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    grid.render(ref.current);
  }, []);

  return <div ref={ref} id="grid-root" />;
};
