import { BaseGridPlugin, ColumnDefinition, RowData, Grid as _Grid } from '@core';
import { VirtualizationPlugin } from '@core/plugins/virtualization';
import { useEffect, useState } from 'react';
import { useWatch } from '../hooks/use-watch';
import { GridProvider } from './grid-context';

import '@styles';
import { Body } from '../body';
import { Renderer } from '../common/renderer';
import { Header } from '../header';

export type GridProps<TData extends RowData = RowData> = {
  data: TData[];
  columns: ColumnDefinition<TData>[];
  plugins?: Array<typeof BaseGridPlugin<TData>>;
};

export const Grid = <TData extends RowData = RowData>({
  data,
  columns,
  plugins = [VirtualizationPlugin],
}: GridProps<TData>) => {
  const [grid] = useState<_Grid<TData>>(new _Grid<TData>({ data, columnDefinitions: columns }));

  const { init } = useWatch(grid.getState());
  useWatch(grid.getRect());

  useEffect(() => {
    grid.init();
    return () => grid.destroy();
  }, [grid]);
  useEffect(() => {
    if (!plugins.length) return;
    grid.register(...plugins);
  }, [grid, plugins]);

  return (
    <GridProvider grid={grid}>
      <Renderer render={grid.render()}>
        {!!init && (
          <>
            <Header />
            <Body />
          </>
        )}
      </Renderer>
    </GridProvider>
  );
};
