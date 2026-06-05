import { ColumnDefinition, RowData, Grid as _Grid } from '@core';
import { useEffect, useState } from 'react';
import { Header } from '../header';
import { GridProvider } from './grid-context';

import '@styles';
import { useSnapshot } from 'valtio';

export type GridProps<TData extends RowData = RowData> = {
  data: TData[];
  columns: ColumnDefinition<TData>[];
};

export const Grid = <TData extends RowData = RowData>({ data, columns }: GridProps<TData>) => {
  const [grid] = useState<_Grid<TData>>(new _Grid<TData>({ data, columnDefinitions: columns }));

  const { init } = useSnapshot(grid.state);

  useEffect(() => {
    grid.init();
  }, [grid]);

  return (
    <GridProvider grid={grid}>
      <div
        {...grid.getElementAttributes()}
        ref={(el) => {
          grid.ref(el);
        }}
      >
        {!!init && <Header grid={grid} />}
      </div>
    </GridProvider>
  );
};
