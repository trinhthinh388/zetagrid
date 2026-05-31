import { constructElementAttributes, CreateZetaGridParams } from '@core';
import '@zetagrid/styles';
import { useState } from 'react';
import { GridBody } from '../body';
import { GridHeader } from '../header';
import { GridProvider, useGrid } from '../hooks/use-grid';
import { Scrollbar } from '../scrollbar/scrollbar';

export type GridProps<TData> = CreateZetaGridParams<TData>;

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

export const Grid = <TData,>(props: CreateZetaGridParams<TData>) => {
  const [root, setRoot] = useState<HTMLDivElement | null>(null);
  return (
    <GridProvider {...props} root={root}>
      <div ref={setRoot} {...constructElementAttributes.root()}>
        <InnerGrid />
      </div>
    </GridProvider>
  );
};
