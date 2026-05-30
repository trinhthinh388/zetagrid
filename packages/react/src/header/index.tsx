import { constructElementAttributes } from '@core';
import { Header } from '@models';
import { PropsWithChildren, useCallback } from 'react';
import { useGrid } from '../hooks/use-grid';

export type GridHeaderProps = PropsWithChildren;

export const GridHeader = (props: GridHeaderProps) => {
  const grid = useGrid();

  const render = useCallback((header: Header) => {
    if (header.isGroup) {
      return (
        <div key={header.id} {...constructElementAttributes.headerGroup(header)}>
          <div key={header.id} {...constructElementAttributes.headerCell(header)}>
            <div {...constructElementAttributes.headerTitle()}>{header.title}</div>
          </div>
          <div {...constructElementAttributes.headerGroupContainer()}>
            {header.children.map(render)}
          </div>
        </div>
      );
    }

    return (
      <div key={header.id} {...constructElementAttributes.headerCell(header)}>
        <div {...constructElementAttributes.headerTitle()}>{header.title}</div>
      </div>
    );
  }, []);

  return (
    <div {...props} {...constructElementAttributes.header(grid)}>
      <div {...constructElementAttributes.headerContainer(grid)}>
        {grid.getHeaders().map(render)}
      </div>
    </div>
  );
};
