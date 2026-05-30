import { contructElementAttributes } from '@core';
import { PropsWithChildren } from 'react';
import { useGrid } from '../hooks/use-grid';

export type GridHeaderProps = PropsWithChildren;

export const GridHeader = (props: GridHeaderProps) => {
  const grid = useGrid();
  const headerGroups = grid.getHeaderGroups();
  const totalHeight = grid.getTotalHeaderHeight();

  return (
    <div {...props} {...contructElementAttributes.header(grid, totalHeight)}>
      {headerGroups.map((headerGroup) =>
        headerGroup.getHeaders().map((header) => {
          if (header.isPlaceholder) return null;
          return (
            <div key={header.id} {...contructElementAttributes.headerCell(grid, header)}>
              <div {...contructElementAttributes.headerTitle(grid)}>{header.title}</div>
            </div>
          );
        }),
      )}
    </div>
  );
};
