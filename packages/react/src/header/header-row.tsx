import { RowData } from '@core';
import { useSnapshot } from 'valtio';
import { Cell } from '../cell';
import { useGrid } from '../grid/grid-context';

export type HeaderRowProps<TData extends RowData = RowData> = { id: string };

export const HeaderRow = <TData extends RowData = RowData>({ id }: HeaderRowProps<TData>) => {
  const grid = useGrid<TData>();
  const row = grid.getHeader().getHeaderRowById(id);

  const { init } = useSnapshot(row.state);
  const { top, left, width, height } = useSnapshot(row.rect);

  return (
    <div style={{ top, left, width, height }} ref={row.ref} {...row.getElementAttributes()}>
      {!!init &&
        row.cells.map((cell) => (
          <Cell
            id={cell.id}
            type="header"
            key={cell.id}
            rowIndex={cell.rowIndex}
            colIndex={cell.colIndex}
          />
        ))}
    </div>
  );
};
