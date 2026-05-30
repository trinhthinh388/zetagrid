import { contructElementAttributes, CreateZetaGridParams } from '@core';
import '@zetagrid/styles';
import { useState } from 'react';
import { GridHeader } from '../header';
import { GridProvider, useGrid } from '../hooks/use-grid';

export type GridProps<TData> = CreateZetaGridParams<TData>;

const InnerGrid = () => {
  const grid = useGrid();

  if (!grid.isReady) return null;

  return (
    <div {...contructElementAttributes.wrapper(grid)}>
      <GridHeader />
    </div>
  );
};

export const Grid = <TData,>(props: CreateZetaGridParams<TData>) => {
  const [root, setRoot] = useState<HTMLElement | null>(null);
  return (
    <GridProvider {...props} root={root}>
      <div ref={setRoot} {...contructElementAttributes.root()}>
        <InnerGrid />
      </div>
    </GridProvider>
  );
};
