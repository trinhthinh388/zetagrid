import { contructElementAttributes } from '@core';
import { Header } from '@models';
import { PropsWithChildren, useCallback } from 'react';
import { useGrid } from '../hooks/use-grid';

export type GridHeaderProps = PropsWithChildren;

export const GridHeader = (props: GridHeaderProps) => {
  const grid = useGrid();

  const render = useCallback((header: Header) => {
    if (header.isGroup) {
      return (
        <div key={header.id} {...contructElementAttributes.headerGroup(header)}>
          <div key={header.id} {...contructElementAttributes.headerCell(header)}>
            <div {...contructElementAttributes.headerTitle()}>{header.title}</div>
          </div>
          <div {...contructElementAttributes.headerGroupContainer()}>
            {header.children.map(render)}
          </div>
        </div>
      );
    }

    return (
      <div key={header.id} {...contructElementAttributes.headerCell(header)}>
        <div {...contructElementAttributes.headerTitle()}>{header.title}</div>
      </div>
    );
  }, []);

  return (
    <div {...props} {...contructElementAttributes.header(grid)}>
      <div {...contructElementAttributes.headerContainer(grid)}>
        {grid.getHeaders().map(render)}
      </div>
    </div>
  );
};
