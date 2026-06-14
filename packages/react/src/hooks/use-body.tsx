import { RowData } from '@core';
import { useGrid } from '../grid/grid-context';

export const useBody = <TData extends RowData = RowData>() => {
  const grid = useGrid<TData>();

  return grid.getBody();
};
