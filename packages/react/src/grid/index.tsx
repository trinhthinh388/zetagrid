import { createGrid, createColumn } from '@core';
import { useLayoutEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

export const Grid = () => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const grid = createGrid({
      columnDefs: [
        createColumn({
          id: 'name',
          title: 'Name',
          accessor: 'name',
        }),
        createColumn({
          id: 'age',
          title: 'Age',
          accessor: 'age',
        }),
      ],
      renderer: {
        cellRenderer: () => <div>HIHI</div>,
        headerRenderer: ({ id }) => (
          <div data-slot="header" key={id} data-row-id={id}>
            HIHI
          </div>
        ),
      },
    });
    const { headers } = grid.render(ref.current);
    const root = createRoot(ref.current);
    root.render(<div>{headers}</div>);
  }, []);

  return <div ref={ref} data-slot="zeta-grid-root" />;
};
