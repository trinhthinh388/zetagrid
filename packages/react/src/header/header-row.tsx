import { RowData } from '@core';
import { useGrid } from '../grid/grid-context';

export type HeaderRowProps<TData extends RowData = RowData> = { id: string };

export const HeaderRow = <TData extends RowData = RowData>({ id }: HeaderRowProps<TData>) => {
  const grid = useGrid<TData>();

  const row = grid.getHeader().getHeaderRowById(id);

  if (!row) return null;

  return <div ref={row.ref} {...row.getElementAttributes()}></div>;
};
