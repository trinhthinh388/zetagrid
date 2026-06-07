import { RowData } from '@core';
import { useGrid } from '../grid/grid-context';

export const useCell = <TData extends RowData = RowData>({ id }: { id: string }) => {
  const grid = useGrid<TData>();

  return grid.getCellById(id);
};
