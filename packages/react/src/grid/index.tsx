import { ColumnDefinition, RowData, Grid as _Grid } from '@core';
import { useState } from 'react';
import { useSnapshot } from 'valtio';
import { Header } from '../header';
import { GridProvider } from './grid-context';

import '@styles';

export type GridProps<TData extends RowData = RowData> = {
  data: TData[];
  columns: ColumnDefinition<TData>[];
};

export const Grid = <TData extends RowData = RowData>({ data, columns }: GridProps<TData>) => {
  const [grid] = useState<_Grid<TData>>(new _Grid<TData>({ data, columnDefinitions: columns }));

  const { init } = useSnapshot(grid.state);

  return (
    <GridProvider grid={grid}>
      <div ref={grid.ref} {...grid.getElementAttributes()}>
        {!!init && <Header />}
      </div>
    </GridProvider>
  );
};
