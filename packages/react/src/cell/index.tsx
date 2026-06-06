import { RowData } from '@core';
import { useSnapshot } from 'valtio';
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
  const { init } = useSnapshot(cell.state);
  const { top, left, width, height } = useSnapshot(cell.rect);

  return (
    <div ref={cell.ref} style={{ top, left, width, height }} {...cell.getElementAttributes()}>
      {!!init && <>{cell.render()}</>}
    </div>
  );
};
