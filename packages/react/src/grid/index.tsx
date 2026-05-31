import { constructElementAttributes, CreateZetaGridParams } from '@core';
import { RowData } from '@models';
import '@zetagrid/styles';
import { useState } from 'react';
import { GridBody } from '../body';
import { GridHeader } from '../header';
import { GridProvider, useGrid } from '../hooks/use-grid';
import { Scrollbar } from '../scrollbar/scrollbar';

export type GridProps<TData extends RowData> = CreateZetaGridParams<TData>;

const InnerGrid = () => {
  const grid = useGrid();

  return (
    <div {...constructElementAttributes.container(grid)}>
      <GridHeader />

      <GridBody />

      <Scrollbar orientation="vertical" />
      <Scrollbar orientation="horizontal" />
    </div>
  );
};

export const Grid = <TData extends RowData>(props: CreateZetaGridParams<TData>) => {
  const [root, setRoot] = useState<HTMLDivElement | null>(null);
  return (
    <GridProvider {...props} root={root}>
      <div ref={setRoot} {...constructElementAttributes.root()}>
        <InnerGrid />
      </div>
    </GridProvider>
  );
};
