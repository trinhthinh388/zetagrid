import { createColumn, createGrid } from '@core';
import { useLayoutEffect, useRef } from 'react';

const grid = createGrid({
  columnDefs: [
    createColumn({
      title: 'Name',
      accessor: 'name',
    }),
    createColumn({
      title: 'Age',
      accessor: 'age',
    }),
  ],
});

export const Grid = () => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    grid.render(ref.current);
  }, []);

  return <div ref={ref} id="grid-root" />;
};
