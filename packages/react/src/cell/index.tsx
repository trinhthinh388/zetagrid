import { RowData } from '@core';
import { useGrid } from '../grid/grid-context';

export type CellProps<TData extends RowData = RowData> = {
  id: string;
  rowIndex: number;
  colIndex: number;
  type: 'header' | 'body';
};

export const Cell = <TData extends RowData = RowData>({
  id,
  type,
  rowIndex,
  colIndex,
  id: string,
}: CellProps<TData>) => {
  const grid = useGrid<TData>();
  const cell = grid.getCellById(id);

  if (!cell) return null;

  return (
    <div
      ref={cell.ref}
      style={{ width: cell.rect.width, height: cell.rect.height }}
      {...cell.getElementAttributes()}
    >
      {cell.render()}
    </div>
  );
};
