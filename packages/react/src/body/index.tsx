import { constructElementAttributes } from '@core';
import { PropsWithChildren } from 'react';
import { useGrid } from '../hooks/use-grid';

export type GridBodyProps = PropsWithChildren;

export const GridBody = (props: GridBodyProps) => {
  const grid = useGrid();

  return (
    <div {...constructElementAttributes.body(grid)}>
      <div {...constructElementAttributes.bodyContainer(grid)} />
    </div>
  );
};
