import { contructElementAttributes, CreateZetaGridParams } from '@core';
import '@zetagrid/styles';
import { GridHeader } from '../header';
import { GridProvider, useGrid } from '../hooks/use-grid';

export type GridProps<TData> = CreateZetaGridParams<TData>;

const InnerGrid = () => {
  const grid = useGrid();

  return (
    <div {...contructElementAttributes.root()}>
      <div {...contructElementAttributes.wrapper(grid)}>
        <GridHeader />
      </div>
    </div>
  );
};

export const Grid = <TData,>(props: CreateZetaGridParams<TData>) => {
  return (
    <GridProvider {...props}>
      <InnerGrid />
    </GridProvider>
  );
};
