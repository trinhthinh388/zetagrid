import { ColumnDefinition, RowData, Grid as _Grid } from '@core';
import { useEffect, useRef, useState } from 'react';

export type GridProps<TData extends RowData = RowData> = {
  data: TData[];
  columns: ColumnDefinition<TData>[];
};

export const Grid = <TData extends RowData = RowData>({ data, columns }: GridProps<TData>) => {
  const ref = useRef<HTMLDivElement>(null);
  const [grid] = useState<_Grid<TData>>(new _Grid<TData>({ data, columnDefinitions: columns }));

  useEffect(() => {
    if (!ref.current) return;
    grid.init(ref.current);
  }, [grid]);

  return <div ref={ref} />;
};
