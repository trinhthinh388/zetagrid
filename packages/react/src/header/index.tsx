import { contructElementAttributes } from '@core';
import { PropsWithChildren } from 'react';
import { useGrid } from '../hooks/use-grid';

export type GridHeaderProps = PropsWithChildren;

export const GridHeader = (props: GridHeaderProps) => {
  const { getHeaderGroups } = useGrid();

  return (
    <div {...props} {...contructElementAttributes.header()}>
      {getHeaderGroups().map((headerGroup) => (
        <div key={headerGroup.id} {...contructElementAttributes.headerRow({ id: headerGroup.id })}>
          {headerGroup.getHeaders().map((header) => (
            <div key={header.id} {...contructElementAttributes.headerCell({ id: header.id })}>
              <div {...contructElementAttributes.headerTitle()}>{header.title}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
