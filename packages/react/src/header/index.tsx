import { Grid, RowData } from '@core';

export const Header = <TData extends RowData = RowData>({ grid }: { grid: Grid<TData> }) => {
  const headers = grid.getHeaders();
  return <div></div>;
};
