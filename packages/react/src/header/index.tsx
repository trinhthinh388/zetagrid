import { contructElementAttributes } from '@core';
import { PropsWithChildren } from 'react';
import { useGrid } from '../hooks/use-grid';

export type GridHeaderProps = PropsWithChildren;

export const GridHeader = (props: GridHeaderProps) => {
  const { getHeaderGroups, getTotalHeaderHeight } = useGrid();
  const headerGroups = getHeaderGroups();
  const totalHeight = getTotalHeaderHeight();

  return (
    <div {...props} {...contructElementAttributes.header(totalHeight)}>
      {headerGroups.map((headerGroup) =>
        headerGroup.getHeaders().map((header) => {
          if (header.isPlaceholder) return null;
          return (
            <div key={header.id} {...contructElementAttributes.headerCell(header)}>
              <div {...contructElementAttributes.headerTitle()}>{header.title}</div>
            </div>
          );
        }),
      )}
    </div>
  );
};
