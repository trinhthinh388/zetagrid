import { constructElementAttributes, CreateZetaGridParams } from '@core';
import '@zetagrid/styles';
import { useState } from 'react';
import { GridBody } from '../body';
import { GridHeader } from '../header';
import { GridProvider, useGrid } from '../hooks/use-grid';

export type GridProps<TData> = CreateZetaGridParams<TData>;

const InnerGrid = () => {
  const grid = useGrid();

  const isReady = grid.state.isReady;

  if (!isReady) return null;

  return (
    <div {...constructElementAttributes.container(grid)}>
      <GridHeader />
      <GridBody />
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
