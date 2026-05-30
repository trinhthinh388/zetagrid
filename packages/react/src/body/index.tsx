import { constructElementAttributes } from '@core';
import { PropsWithChildren } from 'react';
import { useGrid } from '../hooks/use-grid';
import { Scrollbar } from '../scrollbar/scrollbar';

export type GridBodyProps = PropsWithChildren;

export const GridBody = (props: GridBodyProps) => {
  const grid = useGrid();

  return (
    <div {...constructElementAttributes.body(grid)}>
      <Scrollbar orientation="vertical" />
      <Scrollbar orientation="horizontal" />
    </div>
  );
};
