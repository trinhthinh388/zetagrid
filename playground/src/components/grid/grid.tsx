import { createColumn, createGrid } from '@core';
import { AutoSizer } from '@core/modules/autosizer';
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

grid.use(AutoSizer);

export const Grid = () => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    grid.render(ref.current);
  }, []);

  return <div ref={ref} id="grid-root" />;
};
