import { contructElementAttributes } from '@core';
import { PropsWithChildren } from 'react';
import { useGrid } from '../hooks/use-grid';

export type GridHeaderProps = PropsWithChildren;

export const GridHeader = (props: GridHeaderProps) => {
  const { getHeaderGroups } = useGrid();
  const headerGroups = getHeaderGroups();

  const lastGroup = headerGroups.at(-1);
  const leafCount = lastGroup?.getHeaders().reduce((sum, h) => sum + (h.colSpan ?? 1), 0) ?? 0;

  return (
    <div
      {...props}
      {...contructElementAttributes.header()}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${leafCount}, 1fr)`,
      }}
    >
      {headerGroups.map((headerGroup) => (
        <div key={headerGroup.id} {...contructElementAttributes.headerRow(headerGroup)}>
          {headerGroup.getHeaders().map((header) => {
            if (header.isPlaceholder) return null;
            return (
              <div key={header.id} {...contructElementAttributes.headerCell(header)}>
                <div {...contructElementAttributes.headerTitle()}>{header.title}</div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
